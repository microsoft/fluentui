import { logger } from 'just-scripts';
import { EOL } from 'os';
import { execSync } from 'child_process';

export function checkForModifiedFiles() {
  const notEmpty = (value: string) => value.trim() !== '';

  const gitStatusOutput = execSync('git status -s --untracked-files=no').toString('utf8');
  const hasChangedFiles = gitStatusOutput.split(EOL).filter(notEmpty).length > 0;

  if (hasChangedFiles) {
    logger.error('This build has files that are tracked by git that resulted in modified files.');
    logger.error('Check the following output and resolve the problem that caused these files to change.');
    logger.error('Most likely you committed your files with --no-verify.');
    logger.error(gitStatusOutput);

    execSync('git --no-pager diff', { stdio: 'inherit' });

    throw new Error('Found modified files');
  }
}
