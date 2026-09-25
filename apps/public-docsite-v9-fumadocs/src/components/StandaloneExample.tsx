'use client';

import * as React from 'react';
import { useSearchParams } from 'react-router';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { THEMES, isThemeId } from './DocsSettings';
import type { ThemeId } from './DocsSettings';
import { StoryPreview, PreviewSettingsProvider } from './StoryPreview';
import type { ComponentPageProps } from './ComponentPage';
import type { StoryPreviewProps, TextDirection } from './StoryPreview';

export type ExampleContent = Pick<ComponentPageProps, 'meta' | 'stories' | 'wrapper'>;

export interface StandaloneExampleProps extends React.ComponentProps<'main'> {
  components: ExampleContent[];
  name: string;
  title: string;
}

export const StandaloneExample: ForwardRefComponent<StandaloneExampleProps> = React.forwardRef(
  ({ components, name, title }, ref) => {
    const [params] = useSearchParams();
    const [preferences, setPreferences] = React.useState<{ themeId: ThemeId; dir: TextDirection }>({
      themeId: 'web-light',
      dir: 'ltr',
    });

    const requestedTheme = params.get('theme');
    const requestedDirection = params.get('dir');

    React.useEffect(() => {
      setPreferences({
        themeId: isThemeId(requestedTheme) ? requestedTheme : 'web-light',
        dir: requestedDirection === 'rtl' ? 'rtl' : 'ltr',
      });
    }, [requestedTheme, requestedDirection]);

    const component = components.find(
      ({ stories }) => Object.prototype.hasOwnProperty.call(stories, name) && typeof stories[name] === 'function',
    );

    if (!component || name === 'default') {
      return <p role="alert">Example “{name}” was not found.</p>;
    }

    const story = component.stories[name] as StoryPreviewProps['story'] & { args?: Record<string, unknown> };

    return (
      <main ref={ref} aria-label={`${title}: ${name}`}>
        <title>{`${title}: ${name} — Fluent UI`}</title>
        <PreviewSettingsProvider value={{ theme: THEMES[preferences.themeId].theme, ...preferences }}>
          <StoryPreview
            story={story}
            name={name}
            args={story.args}
            decorators={component.meta.decorators}
            wrapper={component.wrapper}
            standalone
          />
        </PreviewSettingsProvider>
      </main>
    );
  },
);

StandaloneExample.displayName = 'StandaloneExample';
