'use client';

import * as React from 'react';
import { useLocation } from 'react-router';
import { ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { DocsButton } from './DocsControls';
import { MarkdownActions } from './MarkdownActions';

import { DocsSettingsProvider } from './DocsSettings';
import { Description } from './Markdown';
import { OpenInSandbox } from './OpenInSandbox';
import { StoryPreview, usePreviewSettings } from './StoryPreview';
import { StorySource } from './StorySource';
import { toKebabCase } from '../utils/toKebabCase';
import { docsBasename } from '../utils/paths';
import { examplePath } from '../utils/examplePath';
import { useComponentPageHeader } from './ComponentPageHeaderContext';

const sectionHeading = '[&>h2]:mt-0 [&>h2]:mb-xl [&>h2]:text-heading [&>h2]:font-semibold';

export function nameToHash(name: string): string {
  return toKebabCase(name);
}

type Story = React.ComponentType<Record<string, unknown>> & {
  parameters?: { docs?: { description?: { story?: string } }; fullSource?: string };
  args?: Record<string, unknown>;
};

interface Meta {
  title?: string;
  decorators?: import('./StoryPreview').StoryDecorator[];
  parameters?: {
    docs?: { description?: { component?: string }; hideArgsTable?: boolean };
  };
}

export interface ComponentPageProps {
  meta: Meta;
  stories: Record<string, unknown>;
  docgen?: string;
  children?: React.ReactNode;
  order?: string[];
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  showThemePicker?: boolean;
}

function isStory(value: unknown): value is Story {
  return typeof value === 'function';
}

function collectStories(stories: Record<string, unknown>, order?: string[]): Array<[string, Story]> {
  const entries = Object.entries(stories).filter(
    (entry): entry is [string, Story] => entry[0] !== 'default' && isStory(entry[1]),
  );

  if (!order) {
    return entries;
  }

  const byName = new Map(entries);
  const ordered = order.flatMap(name => {
    const story = byName.get(name);
    byName.delete(name);
    return story ? ([[name, story]] as Array<[string, Story]>) : [];
  });

  return [...ordered, ...byName.entries()];
}

const Example = ({
  name,
  story,
  docgenTitle,
  wrapper,
  decorators,
  primary = false,
}: {
  name: string;
  story: Story;
  docgenTitle: string;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  decorators?: import('./StoryPreview').StoryDecorator[];
  primary?: boolean;
}) => {
  const description = story.parameters?.docs?.description?.story;
  const { pathname } = useLocation();
  const { themeId, dir } = usePreviewSettings();
  const exampleUrl = `${docsBasename}${examplePath(pathname, name)}?${new URLSearchParams({ theme: themeId, dir })}`;

  return (
    <section className={clsx('my-3xl min-w-0', sectionHeading)}>
      <h2 id={nameToHash(name)}>{name}</h2>
      {description ? <Description>{description}</Description> : null}
      <div className="mt-xl border-thin border-stroke rounded-panel min-w-0">
        <StoryPreview
          story={story}
          name={name}
          wrapper={wrapper}
          decorators={decorators}
          args={story.args}
          className={clsx('rounded-t-panel p-3xl max-[640px]:p-lg', primary && 'min-h-preview grid items-center')}
        />
        <div className="not-prose flex flex-wrap items-center justify-end max-[640px]:justify-start gap-sm p-lg border-t-thin border-stroke rounded-b-panel bg-surface">
          <StorySource story={story} />
          <DocsButton
            as="a"
            href={exampleUrl}
            className="no-underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name} in a new tab`}
            iconPosition="after"
            icon={{
              className: 'inline-flex items-center shrink-0',
              children: <ExternalLink aria-hidden="true" className="size-lg" />,
            }}
          >
            Open in a new tab
          </DocsButton>
          <OpenInSandbox story={story} exportToken={name} description={`${docgenTitle} - ${name}`} />
        </div>
      </div>
    </section>
  );
};

export const ComponentPage = ({
  meta,
  stories,
  docgen,
  order,
  wrapper,
  showThemePicker,
  children,
}: ComponentPageProps): React.ReactElement => {
  const authored = Array.isArray(stories.__storyOrder) ? (stories.__storyOrder as string[]) : undefined;
  const entries = collectStories(stories, order ?? authored);
  const [primary, ...rest] = entries;
  const showArgsTable = docgen && meta.parameters?.docs?.hideArgsTable !== true;
  const title = meta.title ?? docgen ?? 'Component';
  const header = useComponentPageHeader();
  const description = meta.parameters?.docs?.description?.component || header?.description;

  return (
    <div className="min-w-0" data-component-page="">
      <DocsSettingsProvider
        showThemePicker={showThemePicker}
        actions={<MarkdownActions key={title} />}
        className="mt-lg mb-3xl py-lg"
        introduction={
          <div className="mb-3xl [&_h1]:m-0 [&_h1]:text-title [&_h1]:font-semibold [&_h1]:text-balance max-[640px]:[&_h1]:text-title-mobile">
            {header?.title}
            {description ? (
              <div className="mt-xl [&>div>p:first-child]:max-w-[65ch] [&>div>p:first-child]:mt-0 [&>div>p:first-child]:text-lead [&>div>p:first-child]:text-muted">
                <Description>{description}</Description>
              </div>
            ) : null}
          </div>
        }
      >
        {primary ? (
          <Example
            name={primary[0]}
            primary
            story={primary[1]}
            docgenTitle={title}
            wrapper={wrapper}
            decorators={meta.decorators}
          />
        ) : null}

        {showArgsTable ? (
          <section className={clsx('my-3xl pt-xl border-t-thin border-stroke min-w-0', sectionHeading)}>
            <h2 id="api">API</h2>
            {children}
          </section>
        ) : null}

        {rest.map(([name, story]) => (
          <Example
            key={name}
            name={name}
            story={story}
            docgenTitle={title}
            wrapper={wrapper}
            decorators={meta.decorators}
          />
        ))}
      </DocsSettingsProvider>
    </div>
  );
};
