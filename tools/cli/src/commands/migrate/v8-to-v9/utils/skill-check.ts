import { execFileSync } from 'child_process';

const SKILL_NAME = 'fluentui-migrate-v8-to-v9';

/**
 * Check whether the `fluentui-migrate-v8-to-v9` skill is installed
 * by delegating to `npx skills list`.
 */
export function isSkillInstalled(): boolean {
  try {
    const output = execFileSync('npx', ['--no-install', 'skills', 'list'], {
      timeout: 15_000,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return output.includes(SKILL_NAME);
  } catch {
    return false;
  }
}

export function printSkillHint(): void {
  console.log('\nNext step — install the migration skill for your coding agent:');
  console.log('  npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9');
  console.log('\nThe skill guides AI agents through the annotation-driven migration process.');
}
