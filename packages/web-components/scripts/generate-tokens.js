import fs from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

import tokensPackage from '@fluentui/tokens';

main();

function main() {
  console.log(tokensPackage);

  const fluentTokens = Object.keys(tokensPackage.tokens);
  const comment = '// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE\n';

  const generatedTokens = fluentTokens.reduce((acc, t) => {
    const token = `
/**
 * CSS custom property value for the {@link @fluentui/tokens#${t} | \`${t}\`} design token.
 * @public
 */
export const ${t} = 'var(--${t})';
`;
    return acc + token;
  }, '');

  const dir = path.join(import.meta.dirname, '../src', 'theme');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFile(path.join(dir, 'design-tokens.ts'), comment + generatedTokens, err => {
    if (err) throw err;
    console.log(chalk.greenBright(`Design token file has been successfully created!`));
  });
}
