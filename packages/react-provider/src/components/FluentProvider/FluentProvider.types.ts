import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';
import {
  ProviderContextValue,
  TooltipContextType,
  ThemeContextValue,
  ThemeClassNameContextValue,
} from '@fluentui/react-shared-contexts';

export interface FluentProviderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
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

  className: string;
  dir: 'ltr' | 'rtl';
  targetDocument: Document | undefined;
  theme: Theme;
}

export interface FluentProviderContextValues {
  provider: ProviderContextValue;
  theme: ThemeContextValue;
  themeClassname: ThemeClassNameContextValue;
  tooltip: TooltipContextType;
}
