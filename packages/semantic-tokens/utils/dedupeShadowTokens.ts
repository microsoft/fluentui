import type { Token } from '../scripts/token.types';
import { chopLastCamelCasePart } from './chopLastCamelCasePart';
import { removeLastDelimiter } from './removeLastDelimiter';

const chopShadowJSON = (token: Token): Token => {
  // Handle shadow tokens by removing the last part (X,Y,Blur,Color + Ambient/Key)
  token.cssName = removeLastDelimiter(token.cssName, '-');
  token.fst_reference = removeLastDelimiter(token.fst_reference, '/');
  token.name = removeLastDelimiter(token.name, '/');

  return token;
};

export const dedupeShadowTokens = (_tokenJSON: Record<string, Token>) => {
  /* Our shadow tokens come exported from Figma in parts i.e. X, Y, Blur, Color & Ambient/Key variants.
   * To dedupe, we chop off the specific identifier (X, Y, Blur, Color) and combine them into a single token
   * If the separate shadow tokens are required, they can be re-added and formatted into a shadow token string
   * This is backwards compatible and valid with fallbacks (if a shadow part CSSVar is missing, it will fallback)
   */
  for (const token in _tokenJSON) {
    if (_tokenJSON.hasOwnProperty(token)) {
      let tokenData: Token = _tokenJSON[token];

      if (token.endsWith('Y2')) {
        // Special case, ignore, no Y2 tokens should be present
        delete _tokenJSON[token];
        continue;
      }

      // We have two different ways of naming shadow tokens, so we need to handle both
      if (tokenData.name.toLowerCase().includes('shadow')) {
        // If a token contains 'shadow', we chop off the last two camel cased pieces
        let combinedShadowName = chopLastCamelCasePart(chopLastCamelCasePart(token));
        let isSpecialCase = false;
        if (!combinedShadowName.toLowerCase().includes('shadow')) {
          // Special case: Some shadow tokens don't have two modifiers, re-add Shadow to end.
          combinedShadowName = combinedShadowName + 'Shadow';
          isSpecialCase = true;
        }

        // Check if shadow token was already combined
        if (!_tokenJSON[combinedShadowName]) {
          // Handle shadow tokens by removing the last part (X,Y,Blur,Color + Ambient/Key)
          tokenData = chopShadowJSON(tokenData);
          if (!isSpecialCase) {
            // For regular shadow tokens, we chop them twice.
            tokenData = chopShadowJSON(tokenData);
          }
          // Add the new combined token
          _tokenJSON[combinedShadowName] = tokenData;
        }
        // Remove original token
        delete _tokenJSON[token];
      }
    }
  }

  return _tokenJSON;
};
