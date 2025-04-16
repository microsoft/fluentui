import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line no-restricted-imports
import * as tokensPackage from '@fluentui/tokens';
import { fluentOverrides } from './fluentOverrides';
import { format } from 'prettier';

const generateLegacyTokens = () => {
  console.log('Importing required fluent legacy tokens as flat export');

  const semanticTokenFallbacks = Object.keys(fluentOverrides);
  const exportedTokens: string[] = [];
  const comment = '// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE\n';

  const generatedTokens = semanticTokenFallbacks.reduce((acc, t) => {
    const tokenOverride = fluentOverrides[t];
    if (!tokenOverride) {
      // Token has inline variants, skip
      return acc;
    }
    const fluent2Fallback = tokenOverride.f2Token;
    if (!fluent2Fallback || exportedTokens.includes(fluent2Fallback)) {
      return acc;
    }
    // Add it to our list of exported tokens
    exportedTokens.push(fluent2Fallback);
    if (!Object.keys(tokensPackage.tokens).includes(fluent2Fallback)) {
      // Token does not exist in F2 tokens
      // This should never occur, but let's flag if a mistake was made in fallback token names
      throw new Error(`Fluent token ${tokenOverride.f2Token} not found in fluent tokens`);
    }
    const tokenValue = tokensPackage.tokens[fluent2Fallback as keyof typeof tokensPackage.tokens];
    const token = `/**
     * CSS custom property value for the {@link @fluentui/tokens#${fluent2Fallback} | \`${fluent2Fallback}\`} design token.
     * @public
     */
    export const ${fluent2Fallback} = '${tokenValue}';\n`;

    return acc + token;
  }, '');

  const dir = path.join(__dirname, '../src/legacy');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Run prettier to format the generated tokens
  const formattedText = format(comment + generatedTokens, {
    parser: 'typescript',
    singleQuote: true,
    printWidth: 120,
  });

  fs.writeFile(path.join(dir, 'tokens.ts'), formattedText, err => {
    if (err) {
      throw err;
    }
    console.log('Legacy tokens reference created');
  });
};

generateLegacyTokens();
