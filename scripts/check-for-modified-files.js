const EOL = require('os').EOL;
const execSync = require('child_process').execSync;
const notEmpty = value => value.trim() !== '';

const gitStatusOutput = execSync('git status -s --untracked-files=no').toString('utf8');
const hasChangedFiles = gitStatusOutput.split(EOL).filter(notEmpty).length > 0;

if (hasChangedFiles) {
  console.log('This build has files that are tracked by git that resulted in changed files.');
  console.log('Check the following output and resolve the problem that caused these files to change');
  console.log('Most likely you committed your files with --no-verify');
  console.log(gitStatusOutput);

  console.log(execSync('git diff').toString('utf8'));

  process.exit(1);
} else {
  process.exit(0);
}
