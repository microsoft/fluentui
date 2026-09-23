import { searchWords } from './searchWords';

export function searchMatchRank(text: string, queryWords: string[]): number | undefined {
  const tokens = searchWords(text);

  if (tokens.join(' ') === queryWords.join(' ')) {
    return 0;
  }

  if (tokens.slice(0, queryWords.length).join(' ') === queryWords.join(' ')) {
    return 1;
  }

  if (queryWords.every(word => tokens.includes(word))) {
    return 2;
  }

  if (
    queryWords.every((word, index) =>
      tokens.some(token => (index === queryWords.length - 1 ? token.startsWith(word) : token === word)),
    )
  ) {
    return 3;
  }

  return undefined;
}
