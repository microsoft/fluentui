import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

/**
 * {@docCategory FluentProvider }
 */
export interface FluentProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  document?: Document | undefined;

  theme?: PartialTheme;
}

/**
 * {@docCategory FluentProvider }
 */
export interface FluentProviderState extends FluentProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  dir: 'ltr' | 'rtl';
  document: Document | undefined;
  theme: Theme;
}
