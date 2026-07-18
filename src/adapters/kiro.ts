import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { logger } from '../utils/logger'

const KIRO_DIR = path.join(os.homedir(), '.kiro')
const SKILLS_DIR = path.join(KIRO_DIR, 'skills')
const STEERING_DIR = path.join(KIRO_DIR, 'steering')
const STEERING_FILE = path.join(STEERING_DIR, 'baseline.md')

export async function apply(assetsDir: string): Promise<void> {
  logger.title('Kiro')

  if (!await fs.pathExists(KIRO_DIR)) {
    logger.warn('~/.kiro not found — skipping Kiro configuration')
    return
  }

  await applySkills(assetsDir)
  await applySteering(assetsDir)
}

async function applySkills(assetsDir: string): Promise<void> {
  const skillsSource = path.join(assetsDir, 'skills')

  if (!await fs.pathExists(skillsSource)) {
    logger.warn('No skills found in package assets')
    return
  }

  await fs.ensureDir(SKILLS_DIR)

  const skills = await fs.readdir(skillsSource)
  let installed = 0
  let updated = 0
  for (const skill of skills) {
    const src = path.join(skillsSource, skill)
    const dest = path.join(SKILLS_DIR, skill)
    const existed = await fs.pathExists(dest)
    await fs.copy(src, dest, { overwrite: true })
    if (existed) updated++
    else installed++
  }
  if (installed > 0) logger.success(`${installed} skill${installed === 1 ? '' : 's'} installed`)
  if (updated > 0) logger.success(`${updated} skill${updated === 1 ? '' : 's'} up to date`)
}

async function applySteering(assetsDir: string): Promise<void> {
  const appendSource = path.join(assetsDir, 'CLAUDE-append.md')
  if (!await fs.pathExists(appendSource)) return

  await fs.ensureDir(STEERING_DIR)
  await fs.copy(appendSource, STEERING_FILE, { overwrite: true })

  logger.success('steering/baseline.md updated')
}
