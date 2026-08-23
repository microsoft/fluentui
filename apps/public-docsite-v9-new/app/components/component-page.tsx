import { useState, type ComponentType, type ReactNode } from 'react';

import { DocsSettingsProvider } from './docs-settings';
import { ApiDisclosures, PropsTable } from './props-table';
import { OpenInSandbox } from './open-in-sandbox';
import { StoryPreview } from './story-preview';
import { StoryControls, resolveControls, useStoryArgs, type ArgTypes } from './story-controls';
import { StorySource } from './story-source';

/** Matches the anchor scheme used by the Storybook docs page, so deep links stay stable. */
export function nameToHash(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/gi, '-');
}

type Story = ComponentType<Record<string, unknown>> & {
  parameters?: { docs?: { description?: { story?: string } }; fullSource?: string };
  argTypes?: ArgTypes;
  args?: Record<string, unknown>;
};

interface Meta {
  title?: string;
  argTypes?: ArgTypes;
  decorators?: import('./story-preview').StoryDecorator[];
  parameters?: {
    docs?: { description?: { component?: string }; hideArgsTable?: boolean };
  };
}

export interface ComponentPageProps {
  meta: Meta;
  /** The story module namespace (`import * as stories from '...'`). */
  stories: Record<string, unknown>;
  /** Component name in the generated docgen manifest. */
  docgen?: string;
  /**
   * Explicit example order.
   *
   * ES module namespace objects sort their keys alphabetically, so the order authored in
   * `index.stories.tsx` is not recoverable from the import alone. Pass this to restore it.
   */
  order?: string[];
  /** Replaces a story file's Storybook `decorators`. */
  wrapper?: ComponentType<{ children: ReactNode }>;
  /** Omit the theme picker for trees where theming does not apply (e.g. headless). */
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

  // Anything not named in `order` still renders, after the ordered examples.
  return [...ordered, ...byName.entries()];
}

function buildMarkdown(meta: Meta, entries: Array<[string, Story]>): string {
  const lines: string[] = [];

  if (meta.title) {
    lines.push(`# ${meta.title}`, '');
  }

  const description = meta.parameters?.docs?.description?.component;
  if (description) {
    lines.push(description, '');
  }

  lines.push('## Examples', '');

  for (const [name, story] of entries) {
    lines.push(`### ${name}`, '');

    const storyDescription = story.parameters?.docs?.description?.story;
    if (storyDescription) {
      lines.push(storyDescription, '');
    }

    if (story.parameters?.fullSource) {
      lines.push('```tsx', story.parameters.fullSource.trimEnd(), '```', '');
    }
  }

  return lines.join('\n');
}

function CopyAsMarkdown({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { navigator } = event.currentTarget.ownerDocument.defaultView ?? {};

    if (!navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={handleClick} className="rounded-md border px-3 py-1.5 text-sm">
      {copied ? 'Copied' : 'Copy as Markdown'}
    </button>
  );
}

function Example({
  name,
  story,
  docgenTitle,
  wrapper,
  decorators,
  metaArgTypes,
}: {
  name: string;
  story: Story;
  docgenTitle: string;
  wrapper?: ComponentType<{ children: ReactNode }>;
  decorators?: import('./story-preview').StoryDecorator[];
  metaArgTypes?: ArgTypes;
}) {
  const description = story.parameters?.docs?.description?.story;
  const controls = resolveControls(metaArgTypes, story.argTypes);
  const { args, setArgs } = useStoryArgs(controls, story.args);

  return (
    <section>
      <h2 id={nameToHash(name)}>{name}</h2>
      {description ? <p>{description}</p> : null}
      <StoryPreview story={story} name={name} wrapper={wrapper} decorators={decorators} args={args} />
      <StoryControls controls={controls} args={args} onChange={setArgs} idPrefix={nameToHash(name)} />
      <StorySource story={story} />
      <OpenInSandbox story={story} exportToken={name} description={`${docgenTitle} - ${name}`} />
    </section>
  );
}

/**
 * Renders a complete component page from its story module (design D4).
 *
 * Section order mirrors `FluentDocsPage.tsx`: controls → description → primary example →
 * API → remaining examples. Sections with no content are omitted rather than left empty.
 */
export function ComponentPage({ meta, stories, docgen, order, wrapper, showThemePicker }: ComponentPageProps) {
  // The build records the authored export order (see vite-plugins/story-order.ts), because a
  // module namespace object would otherwise hand us the examples alphabetically.
  const authored = Array.isArray(stories.__storyOrder) ? (stories.__storyOrder as string[]) : undefined;
  const entries = collectStories(stories, order ?? authored);
  const [primary, ...rest] = entries;
  const description = meta.parameters?.docs?.description?.component;
  const showArgsTable = docgen && meta.parameters?.docs?.hideArgsTable !== true;
  const title = meta.title ?? docgen ?? 'Component';

  return (
    <DocsSettingsProvider showThemePicker={showThemePicker}>
      <CopyAsMarkdown markdown={buildMarkdown(meta, entries)} />

      {description ? <p>{description}</p> : null}

      {primary ? <Example name={primary[0]} story={primary[1]} docgenTitle={title} wrapper={wrapper} /> : null}

      {showArgsTable ? (
        <>
          <h2 id="api">API</h2>
          <ApiDisclosures of={docgen} />
          <PropsTable of={docgen} />
        </>
      ) : null}

      {rest.map(([name, story]) => (
        <Example
          key={name}
          name={name}
          story={story}
          docgenTitle={title}
          wrapper={wrapper}
          decorators={meta.decorators}
          metaArgTypes={meta.argTypes}
        />
      ))}
    </DocsSettingsProvider>
  );
}
