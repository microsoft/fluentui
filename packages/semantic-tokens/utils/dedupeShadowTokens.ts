import type { Token } from '../scripts/token.types';
import { chopLastCamelCasePart } from './chopLastCamelCasePart';
import { removeLastDelimiter } from './removeLastDelimiter';

// const chopAfterShadow = (str: string): string => {
//   const match = str.match(/^(.*?Shadow)/i);
//   return match ? match[1] : str;
// };

export const dedupeShadowTokens = (_tokenJSON: Record<string, Token>) => {
  /* Our shadow tokens come exported from Figma in parts i.e. X, Y, Blur, Color & Ambient/Key variants.
   * To dedupe, we chop off the specific identifier (X, Y, Blur, Color) and combine them into a single token
   * If the separate shadow tokens are required, they can be re-added and formatted into a shadow token string
   * This is backwards compatible and valid with fallbacks (if a shadow part CSSVar is missing, it will fallback)
   */
  const tokenClone = { ..._tokenJSON };
  for (const token in _tokenJSON) {
    if (tokenClone.hasOwnProperty(token)) {
      const tokenData: Token = _tokenJSON[token];

      if (token.endsWith('Y2')) {
        // Special case, ignore, no Y2 tokens should be present
        delete tokenClone[token];
        continue;
      }

      // We have two different ways of naming shadow tokens, so we need to handle both
      if (tokenData.name.toLowerCase().includes('shadow')) {
        // If a token starts with 'shadow', we chop off the last two camel cased pieces
        let combinedShadowName = chopLastCamelCasePart(chopLastCamelCasePart(token));
        if (!combinedShadowName.toLowerCase().includes('shadow')) {
          console.log('Got one:', combinedShadowName);
          // Special case: Some shadow tokens don't have two modifiers, re-add Shadow to end.
          combinedShadowName = combinedShadowName + 'Shadow';
          console.log('Got one - 2:', combinedShadowName);
        }
        if (!tokenClone[combinedShadowName]) {
          // Handle shadow tokens by removing the last part (X,Y,Blur,Color + Ambient/Key)
          tokenData.cssName = removeLastDelimiter(removeLastDelimiter(tokenData.cssName, '-'), '-');
          tokenData.fst_reference = removeLastDelimiter(removeLastDelimiter(tokenData.fst_reference, '/'), '/');
          tokenData.name = removeLastDelimiter(removeLastDelimiter(tokenData.name, '/'), '/');
          // Add the new combined token
          tokenClone[combinedShadowName] = tokenData;
        }
        // Remove original token
        delete tokenClone[token];
      }
    }
  }

  return tokenClone;
};
