export type SearchScope = 'react' | 'headless' | 'all';

export interface SearchPage {
  url: string;
  title: string;
  description?: string;
  collection: Exclude<SearchScope, 'all'>;
  category: string;
  breadcrumbs: string[];
  kind: string;
}

export interface SearchMatch {
  page: SearchPage;
  url: string;
  excerpt: string;
  rank: number;
}
