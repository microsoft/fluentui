const { logger } = require('just-scripts');

module.exports = function checkForModifiedFiles() {
  const EOL = require('os').EOL;
  const execSync = require('child_process').execSync;
  const notEmpty = value => value.trim() !== '';

  const gitStatusOutput = execSync('git status -s --untracked-files=no').toString('utf8');
  const hasChangedFiles = gitStatusOutput.split(EOL).filter(notEmpty).length > 0;

  if (hasChangedFiles) {
    logger.error('This build has files that are tracked by git that resulted in changed files.');
    logger.error('Check the following output and resolve the problem that caused these files to change');
    logger.error('Most likely you committed your files with --no-verify');
    logger.error(gitStatusOutput);

    logger.error(execSync('git diff').toString('utf8'));

    throw new Error('change file is required');
  }
};
