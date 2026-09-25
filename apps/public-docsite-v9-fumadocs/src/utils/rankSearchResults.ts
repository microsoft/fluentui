import type { SortedResult } from 'fumadocs-core/search';
import type { SearchMatch, SearchPage, SearchScope } from './search.types';
import { searchWords } from './searchWords';
import { searchMatchRank } from './searchMatchRank';
import { searchExcerpt } from './searchExcerpt';

export function rankSearchResults(
  results: SortedResult[],
  query: string,
  scope: Exclude<SearchScope, 'all'>,
): { direct: SearchMatch[]; secondary: SearchMatch[] } {
  const queryWords = searchWords(query);
  const direct: SearchMatch[] = [];
  const secondary: SearchMatch[] = [];

  if (queryWords.length === 0) {
    return { direct, secondary };
  }

  const plain = (text: string) => text.replace(/<\/?mark>/g, '');
  const pages = new Map<string, SortedResult[]>();

  for (const result of results) {
    const url = result.url.split('#')[0];
    const hits = pages.get(url) ?? [];
    hits.push(result);
    pages.set(url, hits);
  }

  for (const [url, hits] of pages) {
    const title = hits.find(hit => hit.type === 'page');

    if (!title) {
      continue;
    }

    const breadcrumbs = (title.breadcrumbs ?? []).map(plain);
    const kind = breadcrumbs.pop() ?? 'Guide';

    const page: SearchPage = {
      url,
      title: plain(title.content),
      collection: scope,
      breadcrumbs,
      kind,
      category:
        url.startsWith(`/${scope}/components/`) || url === `/${scope}/components`
          ? 'Components'
          : breadcrumbs.join(' › ') || 'Getting Started',
    };

    const rank = searchMatchRank(page.title, queryWords);

    if (rank !== undefined) {
      direct.push({ page, rank, url: page.url, excerpt: '' });
      continue;
    }

    const heading = hits
      .filter(hit => hit.type === 'heading')
      .map(item => ({ ...item, rank: searchMatchRank(plain(item.content), queryWords) ?? 4 }))
      .sort((a, b) => a.rank - b.rank)[0];

    if (heading) {
      direct.push({ page, rank: 4 + heading.rank, url: heading.url, excerpt: plain(heading.content) });
      continue;
    }

    const paragraph = hits.find(hit => hit.type === 'text');

    if (paragraph) {
      secondary.push({
        page,
        rank: 9,
        url: paragraph.url,
        excerpt: searchExcerpt(plain(paragraph.content), queryWords),
      });
    } else {
      // Native fuzzy title matches remain direct, after literal title and heading matches.
      direct.push({ page, rank: 8, url: page.url, excerpt: '' });
    }
  }

  const compare = (a: SearchMatch, b: SearchMatch) =>
    a.rank - b.rank ||
    Number(a.page.kind !== 'Component reference') - Number(b.page.kind !== 'Component reference') ||
    a.page.title.localeCompare(b.page.title) ||
    a.page.url.localeCompare(b.page.url);
  return { direct: direct.sort(compare), secondary: secondary.sort(compare) };
}
