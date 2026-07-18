import path from 'path'
import chalk from 'chalk'
import { detectTools } from '../detector'
import { apply as applyClaudeCode } from '../adapters/claude-code'
import { apply as applyOpenCode } from '../adapters/opencode'
import { apply as applyAntigravity } from '../adapters/antigravity'
import { apply as applyKiro } from '../adapters/kiro'
import { setup as setupOpenSpec } from '../utils/openspec'
import { isInstalled as isGentleAiInstalled, installCli as installGentleAi, runInstall as runGentleAiInstall } from '../utils/gentle-ai'
import { logger } from '../utils/logger'
import type { AITool } from '../detector'

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets')

const VALID_TOOLS = ['claude', 'claude-code', 'opencode', 'kiro-ide', 'kiro-cli', 'kiro', 'codex', 'antigravity'] as const
type ToolArg = typeof VALID_TOOLS[number]

// Normalize user-facing aliases to internal AITool names
function normalizeTool(tool: string): AITool | null {
  switch (tool.toLowerCase()) {
    case 'claude':
    case 'claude-code': return 'claude-code'
    case 'opencode':    return 'opencode'
    case 'kiro':
    case 'kiro-ide':    return 'kiro-ide'
    case 'kiro-cli':    return 'kiro-cli'
    case 'codex':       return 'codex'
    case 'antigravity': return 'antigravity'
    default:            return null
  }
}

export async function install(tool?: string): Promise<void> {
  console.log(chalk.bold.magenta('\n  baseline — install\n'))

  if (tool && !VALID_TOOLS.includes(tool as ToolArg)) {
    logger.error(`Unknown tool: "${tool}"`)
    logger.dim(`Valid options: ${VALID_TOOLS.join(', ')}`)
    process.exit(1)
  }

  const detected = detectTools()
  const targetTool = tool ? normalizeTool(tool) : null

  if (!targetTool && detected.tools.length === 0) {
    logger.error('No AI tools detected.')
    logger.dim('Install claude, opencode, kiro-ide, kiro-cli, codex or antigravity first.')
    process.exit(1)
  }

  if (targetTool) {
    logger.info(`Target: ${targetTool}`)
  } else {
    logger.info(`Detected: ${detected.tools.join(', ')}`)
  }

  // Determine which adapters to run
  const run = (t: AITool) => !targetTool || targetTool === t

  // Collect tools for gentle-ai (only detected tools, or forced target if not detected)
  const agentsForGentleAi: AITool[] = targetTool
    ? [targetTool]
    : detected.tools

  await ensureGentleAiEcosystem(agentsForGentleAi)
  await setupOpenSpec()

  if (run('claude-code') && (targetTool || detected.claudeCode))
    await safeApply('Claude Code', () => applyClaudeCode(ASSETS_DIR))

  if (run('opencode') && (targetTool || detected.opencode))
    await safeApply('OpenCode', () => applyOpenCode(ASSETS_DIR))

  if ((run('kiro-ide') || run('kiro-cli')) && (targetTool || detected.kiroIde || detected.kiroCli))
    await safeApply('Kiro', () => applyKiro(ASSETS_DIR))

  if (run('antigravity') && (targetTool || detected.antigravity))
    await safeApply('Antigravity', () => applyAntigravity(ASSETS_DIR))

  console.log(chalk.bold.green('\n  ✓ Team standards installed successfully\n'))
}

async function ensureGentleAiEcosystem(tools: AITool[]): Promise<void> {
  logger.title('Gentle-AI ecosystem')

  if (!isGentleAiInstalled()) {
    try {
      await installGentleAi()
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      logger.warn(`Gentle-AI installer failed: ${message}`)
      logger.dim('Continuing with baseline curated subset only...')
      return
    }
  }

  if (!isGentleAiInstalled()) {
    logger.warn('Gentle-AI still unavailable — skipping full ecosystem install')
    return
  }

  try {
    await runGentleAiInstall(tools)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logger.warn(`gentle-ai install failed: ${message}`)
    logger.dim('Continuing with baseline curated subset only...')
  }
}

async function safeApply(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn()
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logger.warn(`${name} adapter failed: ${message}`)
    logger.dim('Continuing with the remaining adapters...')
  }
}
