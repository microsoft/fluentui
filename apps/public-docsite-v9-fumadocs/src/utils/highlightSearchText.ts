import { searchWords } from './searchWords';

export function highlightSearchText(text: string, query: string): { text: string; match: boolean }[] {
  const terms = searchWords(query).sort((a, b) => b.length - a.length);

  if (!terms.length) {
    return [{ text, match: false }];
  }

  const pattern = new RegExp(`(${terms.join('|')})`, 'giu');

  return text
    .split(pattern)
    .filter(Boolean)
    .map(part => ({ text: part, match: terms.includes(part.toLocaleLowerCase('en')) }));
}
