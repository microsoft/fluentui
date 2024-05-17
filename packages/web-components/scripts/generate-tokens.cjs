const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pkg = require('@fluentui/tokens');

const { tokens } = pkg;

const fluentTokens = Object.keys(tokens);
const comment = '// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE\n';

const generatedTokens = fluentTokens.reduce((acc, t) => {
  const token = `export const ${t} = 'var(--${t})';\n`;
  return acc + token;
}, '');

const dir = path.join(__dirname, '../src', 'theme');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFile(path.join(dir, 'design-tokens.ts'), comment + generatedTokens, err => {
  if (err) throw err;
  console.log(chalk.greenBright(`Design token file has been successfully created!`));
});
