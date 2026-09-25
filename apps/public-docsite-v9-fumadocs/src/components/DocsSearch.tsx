'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useLocation } from 'react-router';
import { useDocsSearch } from 'fumadocs-core/search/client';
import type { SearchClient } from 'fumadocs-core/search/client';
import { staticClient } from 'fumadocs-core/search/client/orama-static';
import {
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogFooter,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogClose,
  SearchDialogList,
  SearchDialogListItem,
} from 'fumadocs-ui/components/dialog/search';
import type { SharedProps, SearchItemType } from 'fumadocs-ui/components/dialog/search';
import { DocsButton } from './DocsControls';
import { rankSearchResults } from '../utils/rankSearchResults';
import { groupSearchMatches } from '../utils/groupSearchMatches';
import { highlightSearchText } from '../utils/highlightSearchText';
import type { SearchMatch } from '../utils/search.types';
import { docsBasename } from '../utils/paths';

type RankedResult = Awaited<ReturnType<SearchClient['search']>>[number] & { match: SearchMatch; secondary: boolean };

const Highlight: ForwardRefComponent<{ text: string; query: string }> = React.forwardRef(({ text, query }, ref) => (
  <span ref={ref}>
    {highlightSearchText(text, query).map((part, index) =>
      part.match ? (
        <mark key={index} className="bg-transparent text-inherit underline font-semibold">
          {part.text}
        </mark>
      ) : (
        <React.Fragment key={index}>{part.text}</React.Fragment>
      ),
    )}
  </span>
));

Highlight.displayName = 'Highlight';

export const DocsSearch: ForwardRefComponent<SharedProps> = React.forwardRef(({ open, onOpenChange }, ref) => {
  const { pathname } = useLocation();
  const resultsId = React.useId();
  const scope = pathname === '/headless' || pathname.startsWith('/headless/') ? 'headless' : 'react';
  const [attempt, setAttempt] = React.useState(0);
  const [directLimit, setDirectLimit] = React.useState(8);
  const [secondaryLimit, setSecondaryLimit] = React.useState(5);
  const [expanded, setExpanded] = React.useState(false);

  const client = React.useMemo<SearchClient>(() => {
    const native = staticClient({
      from: `${docsBasename}/search-index.json${attempt ? `?retry=${attempt}` : ''}`,
      tag: scope,
      search: { limit: 10000 },
    });

    return {
      deps: [scope, attempt, open],
      async search(term) {
        if (!open || !term.trim()) {
          return [];
        }
        const matches = rankSearchResults(await native.search(term), term, scope);
        return [false, true].flatMap(secondary =>
          (secondary ? matches.secondary : matches.direct).map(match => ({
            id: match.page.url,
            url: match.url,
            type: 'page' as const,
            content: match.page.title,
            match,
            secondary,
          })),
        );
      },
    };
  }, [scope, attempt, open]);

  const { search, setSearch, query } = useDocsSearch({ client });

  const resetResults = React.useCallback(() => {
    setDirectLimit(8);
    setSecondaryLimit(5);
    setExpanded(false);
  }, []);

  const changeSearch = React.useCallback(
    (value: string) => {
      setSearch(value);
      resetResults();
    },
    [resetResults, setSearch],
  );

  const changeOpen = React.useCallback(
    (value: boolean) => {
      onOpenChange(value);
      if (!value) {
        changeSearch('');
      }
    },
    [onOpenChange, changeSearch],
  );

  const retry = React.useCallback(() => {
    setAttempt(value => value + 1);
  }, []);

  const matches = React.useMemo(() => {
    const results = (query.data === 'empty' ? [] : query.data ?? []) as RankedResult[];
    return {
      direct: results.filter(result => !result.secondary).map(result => result.match),
      secondary: results.filter(result => result.secondary).map(result => result.match),
    };
  }, [query.data]);

  const showSecondary = expanded || matches.direct.length === 0;

  const { items: resultItems, labels: groupLabels } = React.useMemo(() => {
    const items: SearchItemType[] = [];
    const labels = new Map<string, string>();

    const addGroups = (secondary: boolean) => {
      const matchesToShow = secondary
        ? matches.secondary.slice(0, secondaryLimit)
        : matches.direct.slice(0, directLimit);

      for (const group of groupSearchMatches(matchesToShow, scope)) {
        for (const [index, match] of group.items.entries()) {
          if (index === 0) {
            labels.set(match.page.url, `${secondary ? 'Within pages · ' : ''}${group.label}`);
          }

          items.push({
            id: match.page.url,
            url: match.url,
            type: 'page',
            content: (
              <>
                <span className="block wrap-anywhere font-semibold">
                  <Highlight text={match.page.title} query={search} />
                </span>
                <span className="block wrap-anywhere mt-sm text-small text-fd-muted-foreground font-normal">
                  {[...match.page.breadcrumbs, match.page.kind].join(' › ')}
                </span>
                {match.excerpt && (
                  <span className="block wrap-anywhere mt-sm text-small text-fd-muted-foreground font-normal">
                    <Highlight text={match.excerpt} query={search} />
                  </span>
                )}
              </>
            ),
          });
        }
      }
    };

    addGroups(false);

    if (showSecondary) {
      addGroups(true);
    }

    return { items, labels };
  }, [matches, directLimit, secondaryLimit, scope, search, showSecondary]);

  const renderItem = React.useCallback(
    ({ item, onClick }: { item: SearchItemType; onClick: () => void }) => {
      return (
        <React.Fragment key={item.id}>
          {groupLabels.has(item.id) && (
            <div className="pt-lg px-md pb-sm text-fd-muted-foreground text-small font-semibold">
              {groupLabels.get(item.id)}
            </div>
          )}
          <SearchDialogListItem item={item} onClick={onClick} className="w-full text-start" />
        </React.Fragment>
      );
    },
    [groupLabels],
  );

  const morePages = React.useCallback(() => {
    setDirectLimit(value => value + 8);
  }, []);

  const moreContent = React.useCallback(() => {
    setSecondaryLimit(value => value + 5);
  }, []);

  const toggleSecondary = React.useCallback(() => {
    setExpanded(value => !value);
  }, []);

  return (
    <SearchDialog
      open={open}
      onOpenChange={changeOpen}
      search={search}
      onSearchChange={changeSearch}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput aria-label="Search documentation" ref={ref} />
          <SearchDialogClose />
        </SearchDialogHeader>
        {query.error ? (
          <SearchDialogFooter className="py-lg px-md" role="alert">
            Search could not be loaded. <DocsButton onClick={retry}>Retry</DocsButton>
          </SearchDialogFooter>
        ) : !search.trim() ? (
          <p className="py-lg px-md">Search for a component, guide, or topic.</p>
        ) : query.isLoading && query.data === 'empty' ? (
          <p className="py-lg px-md" role="status">
            Loading search…
          </p>
        ) : (
          <>
            <SearchDialogList id={resultsId} items={resultItems} Item={renderItem} aria-busy={query.isLoading} />
            <SearchDialogFooter className="flex flex-wrap items-center gap-sm p-md empty:hidden">
              {matches.direct.length > directLimit && <DocsButton onClick={morePages}>Show more pages</DocsButton>}
              {matches.secondary.length > 0 && matches.direct.length > 0 && (
                <DocsButton aria-expanded={showSecondary} aria-controls={resultsId} onClick={toggleSecondary}>
                  {showSecondary ? 'Hide matches within pages' : `Matches within pages (${matches.secondary.length})`}
                </DocsButton>
              )}
              {showSecondary && matches.secondary.length > secondaryLimit && (
                <DocsButton onClick={moreContent}>Show more content matches</DocsButton>
              )}
            </SearchDialogFooter>
          </>
        )}
      </SearchDialogContent>
    </SearchDialog>
  );
});
DocsSearch.displayName = 'DocsSearch';
