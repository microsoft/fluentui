import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';

import tokensPackage from '@fluentui/tokens';

main();

function main() {
  console.log(tokensPackage);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fluentTokens = Object.keys(tokensPackage.tokens);
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
}
