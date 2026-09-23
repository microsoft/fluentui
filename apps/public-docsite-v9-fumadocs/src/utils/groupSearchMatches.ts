import type { SearchMatch, SearchScope } from './search.types';

export function groupSearchMatches(
  matches: SearchMatch[],
  scope: SearchScope,
): { label: string; items: SearchMatch[] }[] {
  const groups = new Map<string, SearchMatch[]>();

  for (const match of matches) {
    const label = `${scope === 'all' ? `${match.page.collection === 'react' ? 'React v9' : 'Headless'} › ` : ''}${
      match.page.category
    }`;

    const items = groups.get(label) ?? [];
    items.push(match);
    groups.set(label, items);
  }

  return [...groups].map(([label, items]) => ({ label, items }));
}
