import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line no-restricted-imports
import * as tokensPackage from '@fluentui/tokens';
import { fluentOverrides } from '../src/fluentOverrides';
import { legacyFluentVariantsValues } from '../src/fluentLegacyVariants';
import { format } from 'prettier';

const formatLegacyTokens = (legacyToken: string) => {
  if (!Object.keys(tokensPackage.tokens).includes(legacyToken)) {
    // Token does not exist in F2 tokens
    // This should never occur, but let's flag if a mistake was made in fallback token names
    throw new Error(`Fluent token ${legacyToken} not found in fluent tokens`);
  }
  const tokenValue = tokensPackage.tokens[legacyToken as keyof typeof tokensPackage.tokens];
  const token = `/**
     * CSS custom property value for the {@link @fluentui/tokens#${legacyToken} | \`${legacyToken}\`} design token.
     * @public
     */
    export const ${legacyToken} = '${tokenValue}';\n`;

  return token;
};

const generateLegacyTokens = () => {
  console.log('Importing required fluent legacy tokens as flat export');

  const semanticTokenFallbacks = Object.keys(fluentOverrides);
  const exportedTokens: string[] = [];
  const comment = '// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE\n';

  const generatedTokens = semanticTokenFallbacks.reduce((acc, t) => {
    const tokenOverride = fluentOverrides[t];
    const fluent2Fallback = tokenOverride?.f2Token;
    if (!tokenOverride || !fluent2Fallback || exportedTokens.includes(fluent2Fallback)) {
      return acc;
    }
    // Add it to our list of exported tokens
    exportedTokens.push(fluent2Fallback);

    // Format exported token
    const token = formatLegacyTokens(fluent2Fallback);

    return acc + token;
  }, '');

  const legacyVariantTokens = Object.keys(legacyFluentVariantsValues).reduce((acc, t) => {
    const tokenVariant = legacyFluentVariantsValues[t];
    const fluent2Fallback = tokenVariant?.f2Token;
    if (!tokenVariant || !fluent2Fallback || exportedTokens.includes(fluent2Fallback)) {
      return acc;
    }
    // Add it to our list of exported tokens
    exportedTokens.push(fluent2Fallback);

    // Format exported token
    const token = formatLegacyTokens(fluent2Fallback);

    return acc + token;
  }, '');

  const dir = path.join(__dirname, '../src/legacy');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Run prettier to format the generated tokens
  const formattedText = format(comment + generatedTokens + legacyVariantTokens, {
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
