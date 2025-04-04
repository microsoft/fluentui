import { Token } from './token.types';

export const chopLastCamelCasePart = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .slice(0, -1)
    .join('');

export function removeLastDelimiter(str: string, delimiter: string) {
  const lastIndex = str.lastIndexOf(delimiter);
  if (lastIndex === -1) {
    // Delimiter not found
    return str;
  }
  return str.substring(0, lastIndex);
}

export function dedupeShadowTokens(_tokenJSON: Record<string, Token>) {
  /* Our shadow tokens come exported from Figma in parts i.e. X, Y, Blur, Color
    This is not compatible with our token fallback structure, as V9 shadows are combined strings
    By deduping the shadows into a single string, we reduce tokens by ~25% and simplify fallbacks

    To dedupe, we chop off the specific identifier (X, Y, Blur, Color) and combine them into a single token

    This enables the script to work the same for all tokens once processed.
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
}
