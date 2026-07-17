import { execSync } from 'child_process'

export type AITool = 'claude-code' | 'opencode' | 'antigravity'

export interface DetectedTools {
  tools: AITool[]
  claudeCode: boolean
  opencode: boolean
  antigravity: boolean
}

function isInstalled(command: string): boolean {
  try {
    execSync(`command -v ${command}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export function detectTools(): DetectedTools {
  const claudeCode = isInstalled('claude')
  const opencode = isInstalled('opencode')
  const antigravity = isInstalled('antigravity')

  const tools: AITool[] = []
  if (claudeCode) tools.push('claude-code')
  if (opencode) tools.push('opencode')
  if (antigravity) tools.push('antigravity')

  return { tools, claudeCode, opencode, antigravity }
}
