'use client';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import type { Theme } from '@fluentui/react-components';
import * as React from 'react';
import { clsx } from 'clsx';

export type TextDirection = 'ltr' | 'rtl';

export interface PreviewSettings {
  theme: Theme;
  themeId: string;
  dir: TextDirection;
}

const defaultPreviewSettings: PreviewSettings = {
  theme: webLightTheme,
  themeId: 'web-light',
  dir: 'ltr',
};

const PreviewSettingsContext = React.createContext<PreviewSettings | undefined>(undefined);

export const PreviewSettingsProvider = PreviewSettingsContext.Provider;

export function usePreviewSettings(): PreviewSettings {
  return React.useContext(PreviewSettingsContext) ?? defaultPreviewSettings;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  name: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class PreviewErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public render() {
    const { error } = this.state;

    if (error) {
      return (
        <div
          role="alert"
          className="rounded-md border border-fd-destructive-border bg-fd-destructive-surface p-4 text-sm text-fd-destructive"
        >
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

export type StoryDecorator = (Story: React.ComponentType) => React.ReactNode;

export interface StoryPreviewProps {
  story: React.ComponentType<Record<string, unknown>>;
  name: string;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  args?: Record<string, unknown>;
  decorators?: StoryDecorator[];
  standalone?: boolean;
  className?: string;
}

function applyDecorators(content: React.ReactNode, decorators: StoryDecorator[] = []): React.ReactNode {
  return decorators.reduceRight<React.ReactNode>((acc, decorate) => decorate(() => <>{acc}</>), content);
}

export const StoryPreview = ({
  story: Story,
  name,
  wrapper: Wrapper,
  decorators,
  args,
  standalone = false,
  className,
}: StoryPreviewProps): React.ReactElement => {
  const { theme, dir } = usePreviewSettings();

  const decorated = applyDecorators(<Story {...args} />, decorators);
  const content = Wrapper ? <Wrapper>{decorated}</Wrapper> : decorated;

  return (
    <div
      className={clsx(
        'not-prose',
        standalone && 'min-h-screen',
        !standalone &&
          className === undefined &&
          'my-[var(--preview-gap)] rounded-[var(--preview-radius)] border-[length:var(--preview-stroke)] p-[var(--preview-padding)]',
        className,
      )}
      style={
        {
          backgroundColor: theme.colorNeutralBackground1,
          '--preview-gap': theme.spacingVerticalL,
          '--preview-radius': theme.borderRadiusXLarge,
          '--preview-stroke': theme.strokeWidthThin,
          '--preview-padding': theme.spacingHorizontalXXL,
          ...(standalone ? { padding: `${theme.spacingVerticalL} ${theme.spacingHorizontalL}` } : {}),
        } as React.CSSProperties
      }
    >
      <PreviewErrorBoundary name={name}>
        <div data-fluent-preview="">
          <FluentProvider theme={theme} dir={dir}>
            {content}
          </FluentProvider>
        </div>
      </PreviewErrorBoundary>
    </div>
  );
};
