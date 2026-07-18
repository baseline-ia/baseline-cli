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

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets')

export async function install(): Promise<void> {
  console.log(chalk.bold.magenta('\n  baseline — install\n'))

  const detected = detectTools()

  if (detected.tools.length === 0) {
    logger.error('No AI tools detected.')
    logger.dim('Install claude, opencode, kiro or antigravity first.')
    process.exit(1)
  }

  logger.info(`Detected: ${detected.tools.join(', ')}`)

  await ensureGentleAiEcosystem(detected.tools)
  await setupOpenSpec()

  if (detected.claudeCode) await safeApply('Claude Code', () => applyClaudeCode(ASSETS_DIR))
  if (detected.opencode) await safeApply('OpenCode', () => applyOpenCode(ASSETS_DIR))
  if (detected.antigravity) await safeApply('Antigravity', () => applyAntigravity(ASSETS_DIR))
  if (detected.kiro) await safeApply('Kiro', () => applyKiro(ASSETS_DIR))

  console.log(chalk.bold.green('\n  ✓ Team standards installed successfully\n'))
}

async function ensureGentleAiEcosystem(agents: string[]): Promise<void> {
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
    await runGentleAiInstall(agents)
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
