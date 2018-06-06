const execSync = require('child_process').execSync;
const path = require('path');
const { EOL } = require('os');

const projectPath = path.resolve(path.join(__dirname, '..'));
const cmd = 'git --no-pager diff cfa7a19ec --diff-filter=AM --name-only --stat-name-width=0';

const gitDiffOutput = execSync(cmd, { cwd: projectPath });
const filesChangedSinceLastRun = gitDiffOutput
  .toString('utf8')
  .split(EOL)
  .filter(fileName => /\.ts$/.test(fileName));

const sourcePath = path.join(__dirname, '**', '*.{ts,tsx,json,js}');
const prettierPath = path.resolve(__dirname, './node_modules/prettier/bin-prettier.js');
const prettierIgnorePath = path.resolve(path.join(__dirname, '..', '.prettierignore'));
const prettierConfigPath = path.join(
  __dirname,
  '..',
  'packages',
  'office-ui-fabric-react-tslint',
  'prettier.config.js'
);

console.log([sourcePath, prettierPath, prettierIgnorePath]);

const filesToRun = execSync(
  `node ${prettierPath} --config ${prettierConfigPath} --ignore-path ${prettierIgnorePath} ${sourcePath} --write`,
  {
    cmd: projectPath
  }
);
console.log(filesToRun.toString('utf8'));
