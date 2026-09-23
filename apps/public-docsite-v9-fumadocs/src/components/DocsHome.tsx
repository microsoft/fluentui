'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { clsx } from 'clsx';
import { version } from '@fluentui/react-components/package.json';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { DocsBody } from 'fumadocs-ui/page';
import reactHero from '../../../public-docsite-v9/public/fluentui-wide-banner.webp';
import headlessHero from '../../../public-docsite-v9-headless/src/assets/images/hero.svg';

const homeAction =
  'inline-flex items-center justify-center gap-md py-md text-body font-semibold no-underline rounded-control hover:underline underline-offset-inset focus-visible:outline focus-visible:outline-focus focus-visible:outline-foreground focus-visible:outline-offset-focus [&_svg]:size-lg [&_svg]:shrink-0';

export const DocsHome: ForwardRefComponent<{
  title: string;
  description?: string;
  tree: 'react' | 'headless';
  children: React.ReactNode;
}> = React.forwardRef(({ title, description, tree, children }, ref) => (
  <article ref={ref} className="w-full max-w-[1040px] min-w-0 mx-auto py-3xl px-xl" data-docs-home={tree}>
    <header className="grid grid-cols-1 items-start gap-md mb-3xl">
      <h1 className="m-0 text-title font-bold text-balance max-[800px]:max-w-[18ch] max-[800px]:text-title-mobile">
        {title}
      </h1>
      {tree === 'react' ? <p className="m-0 text-muted text-lead font-semibold">v{version}</p> : null}
      <p className="mt-md mb-0 mx-0 text-muted text-lead max-w-[65ch] text-pretty">{description}</p>
    </header>
    <img
      className="block w-full h-auto rounded-panel mx-auto mb-md"
      src={tree === 'react' ? reactHero : headlessHero}
      alt={tree === 'react' ? 'An image of many user interface component designs.' : 'Fluent headless hero'}
      width={960}
      height={400}
      fetchPriority="high"
    />
    <nav
      className={clsx(
        'flex flex-wrap items-center gap-y-md gap-x-2xl mb-section-double',
        tree === 'react' && 'relative -mt-section-triple max-[1040px]:-mt-3xl max-[800px]:-mt-md',
      )}
      aria-label={`${title} resources`}
    >
      <Link
        to={`/${tree}/getting-started`}
        className={clsx(homeAction, 'px-xl border-thin border-foreground bg-foreground text-surface')}
      >
        Get started <ArrowRight aria-hidden="true" />
      </Link>
      <Link to={`/${tree}/components`} className={clsx(homeAction, 'text-foreground')}>
        Browse components <ArrowRight aria-hidden="true" />
      </Link>
    </nav>
    <DocsBody className="min-w-0 [&>h2]:text-heading [&>h2]:font-semibold [&>h2]:mt-section-double [&>h2]:mb-2xl [&>h2]:text-balance [&>div>h2]:text-heading [&>div>h2]:font-semibold [&>div>h2]:mt-section-double [&>div>h2]:mb-2xl [&>div>h2]:text-balance [&>h2:first-child]:mt-0 [&>p]:max-w-[72ch] [&>ul]:max-w-[72ch] [&>div>p]:max-w-[72ch] [&>div>ul]:max-w-[72ch] max-[800px]:[&>h2]:text-lead max-[800px]:[&>div>h2]:text-lead">
      {children}
    </DocsBody>
  </article>
));

DocsHome.displayName = 'DocsHome';

export const HomeFeatures: ForwardRefComponent<{ children: React.ReactNode; compact?: boolean }> = React.forwardRef(
  ({ children, compact = false }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'not-prose grid gap-3xl max-[800px]:grid-cols-1 max-[800px]:gap-2xl',
        compact
          ? 'grid-cols-2 my-3xl [&>div]:grid [&>div]:grid-cols-[1fr_3fr] [&>div]:items-start [&>div]:gap-xl [&>div]:pt-2xl'
          : 'grid-cols-3 mt-2xl mb-3xl max-[800px]:[&>div]:grid max-[800px]:[&>div]:grid-cols-[1fr_2fr] max-[800px]:[&>div]:items-center max-[800px]:[&>div]:gap-xl max-[800px]:[&>div>img]:m-0',
      )}
    >
      {children}
    </div>
  ),
);

HomeFeatures.displayName = 'HomeFeatures';

export const HomeFeature: ForwardRefComponent<{
  src: string;
  alt: string;
  title?: string;
  children: React.ReactNode;
}> = React.forwardRef(({ src, alt, title, children }, ref) => (
  <div ref={ref} className="min-w-0">
    <img
      className="block w-full max-w-[240px] h-auto rounded-panel mb-xl"
      src={src}
      alt={alt}
      loading="lazy"
      width={240}
      height={160}
    />
    <div>
      {title ? <h3 className="text-lead font-semibold mt-0 mb-md text-balance">{title}</h3> : null}
      <p className="m-0 text-muted text-body text-pretty">{children}</p>
    </div>
  </div>
));
HomeFeature.displayName = 'HomeFeature';
