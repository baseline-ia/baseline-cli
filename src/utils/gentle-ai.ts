import { execSync } from 'child_process'
import { logger } from './logger'

const INSTALL_URL = 'https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh'

const DEFAULT_PERSONA = 'neutral' as const
type Persona = 'neutral' | 'gentleman' | 'custom'
const PERSONA: Persona = DEFAULT_PERSONA

export function isInstalled(): boolean {
  try {
    execSync('command -v gentle-ai', { stdio: 'ignore' })
    execSync('gentle-ai --version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export async function installCli(): Promise<void> {
  logger.info('Gentle-AI not found — running official installer')
  execSync(`curl -fsSL ${INSTALL_URL} | bash`, {
    stdio: 'inherit',
    env: { ...process.env, GENTLE_AI_YES: '1' },
  })
}

export async function runInstall(agents: string[]): Promise<void> {
  if (agents.length === 0) return

  const agentList = agents.join(',')
  logger.info(`Running gentle-ai install --agent ${agentList}`)

  execSync(
    `gentle-ai install --agent ${agentList} ` +
    `--preset full-gentleman --persona ${PERSONA}`,
    {
      stdio: 'inherit',
      env: { ...process.env, GENTLE_AI_YES: '1' },
    }
  )
}
