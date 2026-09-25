export function markdownCode(value: string): string {
  const text = value.replace(/\r\n?|\n/g, ' ');
  // GFM code spans cannot preserve an odd number of literal backslashes before a table pipe.
  if (Array.from(text.matchAll(/(\\+)\|/g)).some(match => match[1].length % 2 !== 0)) {
    return `<code>${text.replace(/[^a-zA-Z0-9 ]/gu, character => `&#${character.codePointAt(0)};`)}</code>`;
  }
  const delimiter = '`'.repeat(longestBacktickRun(text) + 1);
  const padding = text.startsWith('`') || text.endsWith('`') || (text.startsWith(' ') && text.endsWith(' ')) ? ' ' : '';
  return `${delimiter}${padding}${text}${padding}${delimiter}`;
}

export function markdownCodeBlock(value: string, language = 'ts'): string {
  const delimiter = '`'.repeat(Math.max(2, longestBacktickRun(value)) + 1);
  return `${delimiter}${language}\n${value}\n${delimiter}`;
}

export function escapeMarkdownTableCell(value: string): string {
  return value
    .replace(/\r\n?|\n/g, ' ')
    .replace(/(\\*)\|/g, (_, slashes: string) => `${slashes}${slashes.length % 2 === 0 ? '\\' : ''}|`);
}

export function markdownTable(headers: readonly string[], rows: readonly (readonly string[])[]): string[] {
  const row = (cells: readonly string[]) => `| ${cells.map(escapeMarkdownTableCell).join(' | ')} |`;
  return [row(headers), row(headers.map(() => '---')), ...rows.map(row)];
}

function longestBacktickRun(value: string): number {
  return value.match(/`+/g)?.reduce((longest, run) => Math.max(longest, run.length), 0) ?? 0;
}
