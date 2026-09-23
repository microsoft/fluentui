'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { clsx } from 'clsx';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

import { sources } from '../source';
import type { DocsTree } from '../source';
import { createDocsTree } from '../utils/createDocsTree';
import { getOverviewLinks } from '../utils/getOverviewLinks';

export const SectionOverview: ForwardRefComponent<{ tree: DocsTree; path: string; catalog?: boolean }> =
  React.forwardRef(({ tree, path, catalog = false }, ref) => {
    const source = sources[tree];
    const id = React.useId();
    const pages = getOverviewLinks(createDocsTree(source.pageTree), `/${tree}/${path}`, source.getPages(), catalog);
    const descriptions = new Map(source.getPages().map(page => [page.url, page.data.description]));
    const card = clsx(
      'grid grid-cols-[minmax(0,1fr)_auto] content-start items-start gap-lg w-full border-thin border-fd-border rounded-panel bg-fd-card text-fd-foreground no-underline transition-[background-color,border-color] duration-fast ease-standard hover:bg-fd-accent hover:border-fd-muted-foreground focus-visible:outline focus-visible:outline-focus focus-visible:outline-fd-ring focus-visible:outline-offset-focus active:bg-fd-secondary motion-reduce:transition-none',
      catalog ? 'p-lg' : 'p-2xl',
    );

    return (
      <ul
        ref={ref}
        data-section-overview=""
        className="not-prose grid grid-cols-2 max-[640px]:grid-cols-1 gap-lg p-0 list-none"
      >
        {pages.map((page, index) => {
          const description = descriptions.get(page.url);
          const titleId = `${id}-${index}-title`;
          const descriptionId = description ? `${id}-${index}-description` : undefined;
          const content = (
            <>
              <span
                id={titleId}
                className={clsx('font-semibold text-balance wrap-anywhere', catalog ? 'text-control' : 'text-lead')}
              >
                {page.name}
              </span>
              <ArrowUpRight aria-hidden="true" className="size-icon text-fd-muted-foreground" />
              {description ? (
                <span id={descriptionId} className="col-span-full text-fd-muted-foreground text-control">
                  {description}
                </span>
              ) : null}
            </>
          );
          return (
            <li key={page.url} className="flex min-w-0">
              {page.external ? (
                <a href={page.url} className={card} aria-labelledby={titleId} aria-describedby={descriptionId}>
                  {content}
                </a>
              ) : (
                <Link to={page.url} className={card} aria-labelledby={titleId} aria-describedby={descriptionId}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  });

SectionOverview.displayName = 'SectionOverview';
