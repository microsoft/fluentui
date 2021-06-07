import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';
import { TooltipContextType } from '@fluentui/react-shared-contexts';

export interface FluentProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document | undefined;

  theme?: PartialTheme;
}

export interface FluentProviderState extends FluentProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  dir: 'ltr' | 'rtl';
  targetDocument: Document | undefined;
  theme: Theme;
  tooltipContext: TooltipContextType;
}
