import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { PartialTheme } from '@fluentui/react-theme';

export interface FluentProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  document?: Document | undefined;

  theme?: PartialTheme;
}

export const fluentProviderShorthandProps = [] as const;

export type FluentProviderState = ComponentState<
  React.RefObject<HTMLElement>,
  FluentProviderProps,
  /* ShorthandProps: */ typeof fluentProviderShorthandProps[number],
  /* DefaultedProps: */ 'dir'
>;
