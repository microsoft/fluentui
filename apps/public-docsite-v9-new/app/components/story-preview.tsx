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

/** Storybook decorator: receives a component rendering the story, returns wrapped JSX. */
export type StoryDecorator = (Story: ComponentType) => ReactNode;

export interface StoryPreviewProps {
  /** A story export from a `*.stories.tsx` module. */
  story: ComponentType<Record<string, unknown>>;
  /** Story export name, used for anchors and error reporting. */
  name: string;
  /** Optional per-page wrapper. */
  wrapper?: ComponentType<{ children: ReactNode }>;
  /** Props the reader has varied through the controls panel. */
  args?: Record<string, unknown>;
  /**
   * Decorators declared on the story module's meta.
   *
   * Applying these keeps the story module the single source of truth (design D1) — the
   * alternative was re-declaring each layout wrapper on the corresponding docs page, which
   * would drift from Storybook the moment a decorator changed.
   */
  decorators?: StoryDecorator[];
}

/** Applies decorators innermost-last, matching Storybook's ordering. */
function applyDecorators(content: ReactNode, decorators: StoryDecorator[] = []): ReactNode {
  return decorators.reduceRight<ReactNode>((acc, decorate) => decorate(() => <>{acc}</>), content);
}

/**
 * Renders a story from its module, live (design D1, D8).
 *
 * `data-fluent-preview` marks the subtree that Tailwind's preflight must not reach
 * (see app.css). Everything inside is styled solely by Griffel, as in Storybook.
 */
export function StoryPreview({ story: Story, name, wrapper: Wrapper, decorators, args }: StoryPreviewProps) {
  const { theme, dir } = usePreviewSettings();

  const decorated = applyDecorators(<Story {...args} />, decorators);
  const content = Wrapper ? <Wrapper>{decorated}</Wrapper> : decorated;

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
