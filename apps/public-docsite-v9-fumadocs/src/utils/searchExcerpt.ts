export function searchExcerpt(text: string, queryWords: string[]): string {
  const lower = text.toLocaleLowerCase('en');
  const first = Math.min(...queryWords.map(word => lower.indexOf(word)).filter(index => index >= 0));
  const start = Number.isFinite(first) ? Math.max(0, first - 60) : 0;
  const snippet = text.slice(start, start + 180).trim();
  return `${start ? '…' : ''}${snippet}${start + 180 < text.length ? '…' : ''}`;
}
