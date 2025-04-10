import type { Token } from '../scripts/token.types';
import { chopLastCamelCasePart } from './chopLastCamelCasePart';
import { removeLastDelimiter } from './removeLastDelimiter';

export const dedupeShadowTokens = (_tokenJSON: Record<string, Token>) => {
  /* Our shadow tokens come exported from Figma in parts i.e. X, Y, Blur, Color
   * To dedupe, we chop off the specific identifier (X, Y, Blur, Color) and combine them into a single token
   * If the separate shadow tokens are required, they can be re-added and formatted into a shadow token string
   * This is backwards compatible and valid with fallbacks (if a shadow part CSSVar is missing, it will fallback)
   */
  for (const token in _tokenJSON) {
    if (_tokenJSON.hasOwnProperty(token)) {
      const tokenData: Token = _tokenJSON[token];
      const combinedShadowName = chopLastCamelCasePart(token);
      if (tokenData.name.toLowerCase().includes('shadow/')) {
        if (!_tokenJSON[combinedShadowName]) {
          // Handle shadow tokens by removing the last part (X,Y,Blur,Color)
          tokenData.cssName = removeLastDelimiter(tokenData.cssName, '-');
          tokenData.fst_reference = removeLastDelimiter(tokenData.fst_reference, '/');
          tokenData.name = removeLastDelimiter(tokenData.name, '/');
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
