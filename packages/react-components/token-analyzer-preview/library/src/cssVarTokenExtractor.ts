// cssVarTokenExtractor.ts
import { log } from './debugUtils.js';
import { TokenReference } from './types.js';
import { extractTokensFromText } from './tokenUtils.js';

/**
 * Extracts token references from CSS variable syntax including nested fallback chains
 * Example: var(--some-token, var(--fallback, var(${tokens.someToken})))
 *
 * @param value The CSS variable string to process
 * @param propertyName The CSS property name this value is assigned to
 * @param path The path in the style object
 * @param TOKEN_REGEX The regex pattern to match token references
 * @returns Array of token references found in the string
 */
export function extractTokensFromCssVars(
  value: string,
  propertyName: string,
  path: string[] = [],
  TOKEN_REGEX: RegExp,
): TokenReference[] {
  const tokens: TokenReference[] = [];

  let testValue = value;

  // Direct token matches in the string
  const directMatches = extractTokensFromText(testValue);
  if (directMatches.length > 0) {
    directMatches.forEach(match => {
      testValue = testValue.replace(match, ''); // Remove direct matches from the string
      tokens.push({
        property: propertyName,
        token: match,
        path,
      });
    });
  }

  // we have an issue with duplicated calls. A direct match will match the whole string as would a token within a var part
  // found by the regex, so we need to remove the direct matches from the string

  // Look for CSS var() patterns
  const varPattern = /var\s*\(\s*([^,)]*),?\s*(.*?)\s*\)/g;
  let match: RegExpExecArray | null;

  while ((match = varPattern.exec(testValue)) !== null) {
    const fullMatch = match[0]; // The entire var(...) expression
    const varName = match[1]; // The CSS variable name
    const fallback = match[2]; // The fallback value, which might contain nested var() calls

    log(`Processing CSS var: ${fullMatch}`);
    log(`  - Variable name: ${varName}`);
    log(`  - Fallback: ${fallback}`);

    // Check if the variable name contains a token reference
    const varNameTokens = extractTokensFromText(varName);
    if (varNameTokens.length > 0) {
      varNameTokens.forEach(token => {
        tokens.push({
          property: propertyName,
          token,
          path,
        });
      });
    }

    // If there's a fallback value, it might contain tokens or nested var() calls
    if (fallback) {
      // Recursively process the fallback
      if (fallback.includes('var(')) {
        const fallbackTokens = extractTokensFromCssVars(fallback, propertyName, path, TOKEN_REGEX);
        tokens.push(...fallbackTokens);
      } else {
        // Check for direct token references in the fallback
        const fallbackTokens = extractTokensFromText(fallback);
        if (fallbackTokens.length > 0) {
          fallbackTokens.forEach(token => {
            tokens.push({
              property: propertyName,
              token,
              path,
            });
          });
        }
      }
    }
  }

  return tokens;
}
