import type * as React from 'react';
import type { FluentProviderContextValues, FluentProviderProps } from '@fluentui/react-provider';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ProviderSlots = {
  root: Slot<React.FragmentProps>;
};

/**
 * Provider Props
 */
export type ProviderProps = ComponentProps<ProviderSlots> & Pick<FluentProviderProps, 'dir' | 'targetDocument'>;

/**
 * State used in rendering Provider
 */
export type ProviderState = ComponentState<ProviderSlots> & Pick<FluentProviderProps, 'dir' | 'targetDocument'>;

export type ProviderContextValues = FluentProviderContextValues;
