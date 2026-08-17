import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import type { Theme } from '@fluentui/react-components';
import { Component, type ComponentType, type ReactNode, createContext, useContext } from 'react';

export type TextDirection = 'ltr' | 'rtl';

export interface PreviewSettings {
  theme: Theme;
  themeId: string;
  dir: TextDirection;
}

const PreviewSettingsContext = createContext<PreviewSettings>({
  theme: webLightTheme,
  themeId: 'web-light',
  dir: 'ltr',
});

export const PreviewSettingsProvider = PreviewSettingsContext.Provider;

export function usePreviewSettings(): PreviewSettings {
  return useContext(PreviewSettingsContext);
}

interface ErrorBoundaryProps {
  children: ReactNode;
  name: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Isolates a single example so one failure cannot blank the page
 * (`docsite/component-page`: "One failing example does not blank the page").
 */
class PreviewErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public render() {
    const { error } = this.state;

    if (error) {
      return (
        <div role="alert" className="rounded-md border border-red-300 bg-red-50 p-4 text-sm">
          <p className="font-medium">This example failed to render.</p>
          <p className="mt-1 font-mono text-xs opacity-80">
            {this.props.name}: {error.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export interface StoryPreviewProps {
  /** A story export from a `*.stories.tsx` module. */
  story: ComponentType<Record<string, unknown>>;
  /** Story export name, used for anchors and error reporting. */
  name: string;
  /** Optional per-page wrapper, replacing a story file's Storybook `decorators`. */
  wrapper?: ComponentType<{ children: ReactNode }>;
}

/**
 * Renders a story from its module, live (design D1, D8).
 *
 * `data-fluent-preview` marks the subtree that Tailwind's preflight must not reach
 * (see app.css). Everything inside is styled solely by Griffel, as in Storybook.
 */
export function StoryPreview({ story: Story, name, wrapper: Wrapper }: StoryPreviewProps) {
  const { theme, dir } = usePreviewSettings();

  const content = Wrapper ? (
    <Wrapper>
      <Story />
    </Wrapper>
  ) : (
    <Story />
  );

  return (
    <div className="not-prose my-4 rounded-lg border p-6">
      <PreviewErrorBoundary name={name}>
        <div data-fluent-preview="">
          <FluentProvider theme={theme} dir={dir}>
            {content}
          </FluentProvider>
        </div>
      </PreviewErrorBoundary>
    </div>
  );
}
