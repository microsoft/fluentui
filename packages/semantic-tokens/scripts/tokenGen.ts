/*
 * Token generation script
 * Takes in a Figma token export file and generates token raw strings and CSS Var files
 */
import tokensJSONRaw from './tokens.json';
import fs from 'fs';

const tokensJSON: Record<string, any> = tokensJSONRaw;

interface Token {
  no: number;
  name: string;
  fst_reference: string;
  optional: boolean;
  nullable: boolean;
  description: string;
  components: string[];
  contrast: string;
  fallback: string;
  exceptions: string[];
  cssName: string;
}

interface ComponentTokenMap {
  [component: string]: string;
}

// ToDo, make this dynamic to handle all needed variables imported after/during files generation
function generateImportHeaders() {
  const esLintDisable = '// eslint-disable-next-line no-restricted-imports\n';
  const importFluent = "import { tokens } from '@fluentui/tokens';\n\n";
  return esLintDisable + importFluent;
}

function generateTokens() {
  console.log('Generating tokens...');
  // Simple for now, just generate the raw strings and variables
  generateTokenRawStrings();
  generateTokenVariables();
}

function escapeInlineToken(token: string) {
  return `\$\{${token}\}`;
}

function cleanFSTTokenName(originalTokenName: string) {
  // Handle any name housekeeping or small token name fixes

  const newtokenName = originalTokenName.replace('-', '/');

  return newtokenName;
}

function generateTokenRawStrings() {
  let optionalRawTokens = '';
  let controlRawTokens = '';
  let nullableRawTokens = '';
  const componentTokens: ComponentTokenMap = {};
  for (const token in tokensJSON) {
    const tokenData: Token = tokensJSON[token];
    const tokenName = '--smtc-' + tokenData.name.split('/').join('-').toLowerCase();
    const tokenRawString = `export const ${token}Raw = '${tokenName}';\n`;

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = '';
      }
      componentTokens[component] += tokenRawString;
    } else {
      if (tokenData.optional) {
        optionalRawTokens += tokenRawString;
      } else if (tokenData.nullable) {
        nullableRawTokens += tokenRawString;
      } else {
        controlRawTokens += tokenRawString;
      }
    }
  }

  fs.writeFileSync('./src/optional/variables.ts', optionalRawTokens);
  fs.writeFileSync('./src/control/variables.ts', controlRawTokens);
  fs.writeFileSync('./src/nullable/variables.ts', nullableRawTokens);

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`./src/components/${component}/variables.ts`, componentTokens[component]);
  }
}

function toCamelCase(str: string) {
  return str
    .split('/')
    .map(function (word: string, index: number) {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

function handleTokenTransforms(tokenString: string) {
  // Base case
  let formattedToken: string = toCamelCase(tokenString) + 'Raw';
  // Token fallback may be a fluent 2 token or new FST, let's check known fluent 2 tokens
  if (tokenString.length > 0) {
    if (tokenString === 'Thin') {
      formattedToken = `tokens.strokeWidthThin`;
    } else if (tokenString.startsWith('Line-height')) {
      const tokenFallbackArr = tokenString.split('/');
      const tokenFallbackVal = tokenFallbackArr[tokenFallbackArr.length - 1];
      formattedToken = `tokens.lineHeightBase${tokenFallbackVal}`;
    } else if (tokenString.startsWith('Font-size')) {
      const tokenFallbackArr = tokenString.split('/');
      const tokenFallbackVal = tokenFallbackArr[tokenFallbackArr.length - 1];
      formattedToken = `tokens.fontSizeBase${tokenFallbackVal}`;
    } else if (tokenString.startsWith('Neutral/Stroke/Transparent')) {
      formattedToken = `tokens.strokeNeutralTransparent`;
    } else if (tokenString.startsWith('Neutral/Stroke/Disabled')) {
      formattedToken = `tokens.strokeNeutralDisabled`;
    } else if (tokenString.startsWith('Neutral/Stroke/')) {
      const tokenFallbackArr = tokenString.split('/');
      const tokenFallbackVal = tokenFallbackArr[2];
      formattedToken = `tokens.colorNeutralStroke${tokenFallbackVal}`;
    } else if (tokenString.startsWith('Neutral/Background/') || tokenString.startsWith('Neutral/Foreground/')) {
      const tokenFallbackArr = tokenString.split('/');
      const tokenFallbackArea = tokenFallbackArr[1];
      const tokenFallbackVal = tokenFallbackArr[2];
      const tokenFallbackType = tokenFallbackArr[tokenFallbackArr.length - 1];
      if (tokenFallbackType === 'Rest') {
        // Rest tokens don't have a qualifier
        formattedToken = `tokens.colorNeutral${tokenFallbackArea}${tokenFallbackVal}`;
      } else {
        formattedToken = `tokens.colorNeutral${tokenFallbackArea}${tokenFallbackVal}${tokenFallbackType}`;
      }
    }
  }

  return formattedToken;
}

function generateTokenVariables() {
  const foundTokens: { [tokenName: string]: string } = {};
  // Default our files to token imports
  // TODO: Add raw token imports
  let optionalTokens = generateImportHeaders();
  let controlTokens = generateImportHeaders();
  let nullableTokens = generateImportHeaders();
  const componentTokens: ComponentTokenMap = {};
  for (const token in tokensJSON) {
    const tokenData: Token = tokensJSON[token];
    const tokenNameRaw = token + 'Raw';

    let tokenFallback: null | string = null;
    let tokenFallbackName: null | string = null;
    let tokenSemanticRef: null | string = null;
    let tokenSemanticName: null | string = null;

    if (tokenData.fst_reference.length > 0) {
      tokenSemanticName = toCamelCase(cleanFSTTokenName(tokenData.fst_reference));
      tokenSemanticRef = tokenSemanticName + 'Raw';
    }

    // Token fallback may be a fluent 2, we format these fallbacks manually
    if (tokenData.fallback.length > 0) {
      tokenFallbackName = toCamelCase(cleanFSTTokenName(tokenData.fallback));
      tokenFallback = handleTokenTransforms(tokenData.fallback);
    }

    let resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)})`;

    // The semantic token was processed already, use the full semantic token CSS var.
    if (tokenFallbackName && foundTokens[tokenFallbackName]) {
      tokenFallback = foundTokens[tokenFallbackName];
    } else if (tokenFallback) {
      tokenFallback = escapeInlineToken(tokenFallback);
    }

    // The fallback token was processed already, use the full fallback CSS var.
    if (tokenSemanticName && foundTokens[tokenSemanticName]) {
      tokenSemanticRef = foundTokens[tokenSemanticName];
    } else if (tokenSemanticRef) {
      tokenSemanticRef = escapeInlineToken(tokenSemanticRef);
    }

    // TODO: Check if a token has a FST reference that falls back to another FST/fluent fallback?
    if (
      tokenFallback &&
      tokenSemanticRef &&
      tokenFallback !== tokenSemanticRef &&
      !tokenSemanticRef.includes(tokenFallback)
    ) {
      // Token has both a FST fallback and a Fluent fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, var(${tokenSemanticRef}, ${tokenFallback}))`;
    } else if (tokenSemanticRef) {
      // Token just has a FST reference fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${tokenSemanticRef})`;
    } else if (tokenFallback) {
      // Just in case a token falls back directly to a Fluent fallback
      resolvedTokenFallback = `var(${escapeInlineToken(tokenNameRaw)}, ${tokenFallback})`;
    }

    if (token === 'ctrlLinkForegroundNeutralHover') {
      console.log('Found ctrl link token:', tokenData);
      console.log('Token fallback:', tokenFallback);
      console.log('Token semantic ref:', tokenSemanticRef);
      console.log('Resolved token fallback:', resolvedTokenFallback);
    }

    if (tokenData.name.startsWith('CTRL/')) {
      // We have a component level control token
      const component = tokenData.name.split('/')[1];
      if (!componentTokens[component]) {
        componentTokens[component] = generateImportHeaders();
      }
      componentTokens[component] += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
    } else {
      // We have a global token
      if (tokenData.optional) {
        optionalTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
      } else if (tokenData.nullable) {
        nullableTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
      } else {
        controlTokens += `export const ${token} = \`${resolvedTokenFallback}\`;\n`;
      }
    }

    // Track our tokens - we will use these to do fallback replacement for complex tokens as we find them.
    foundTokens[token] = resolvedTokenFallback;
  }

  fs.writeFileSync('./src/optional/tokens.ts', optionalTokens);
  fs.writeFileSync('./src/control/tokens.ts', controlTokens);
  fs.writeFileSync('./src/nullable/tokens.ts', nullableTokens);

  for (const component in componentTokens) {
    var dir = `./src/components/${component}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`./src/components/${component}/tokens.ts`, componentTokens[component]);
  }
}

// Run script
generateTokens();
