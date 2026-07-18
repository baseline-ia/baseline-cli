import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'

export type AITool = 'claude-code' | 'opencode' | 'antigravity' | 'kiro'

export interface DetectedTools {
  tools: AITool[]
  claudeCode: boolean
  opencode: boolean
  antigravity: boolean
  kiro: boolean
}

function isInstalled(command: string): boolean {
  try {
    execSync(`command -v ${command}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function dirExists(dirPath: string): boolean {
  return fs.pathExistsSync(dirPath)
}

export function detectTools(): DetectedTools {
  const claudeCode = isInstalled('claude')
  const opencode = isInstalled('opencode')
  const antigravity = isInstalled('antigravity')
  const kiro = isInstalled('kiro') || dirExists(path.join(os.homedir(), '.kiro'))

  const tools: AITool[] = []
  if (claudeCode) tools.push('claude-code')
  if (opencode) tools.push('opencode')
  if (antigravity) tools.push('antigravity')
  if (kiro) tools.push('kiro')

  return { tools, claudeCode, opencode, antigravity, kiro }
}
