import type * as React from 'react';
import type { FluentProviderProps } from '@fluentui/react-provider';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type { FluentProviderContextValues as ProviderContextValues } from '@fluentui/react-provider';

export type ProviderSlots = {
  /**
   * The root renders a `React.Fragment`. Its props are spelled out instead of using `React.FragmentProps`, which only
   * exists in `@types/react@>=19` and breaks type-checking for consumers on older React types.
   */
  root: Slot<{ children?: React.ReactNode }>;
};

/**
 * Provider Props
 */
export type ProviderProps = ComponentProps<ProviderSlots> & Pick<FluentProviderProps, 'dir' | 'targetDocument'>;

/**
 * State used in rendering Provider
 */
export type ProviderState = ComponentState<ProviderSlots> & Pick<FluentProviderProps, 'dir' | 'targetDocument'>;
