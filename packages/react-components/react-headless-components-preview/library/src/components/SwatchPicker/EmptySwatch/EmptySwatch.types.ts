import type { EmptySwatchBaseState } from '@fluentui/react-swatch-picker';

export type { EmptySwatchBaseProps as EmptySwatchProps, EmptySwatchSlots } from '@fluentui/react-swatch-picker';

export type EmptySwatchState = EmptySwatchBaseState & {
  root: {
    /**
     * Whether EmptySwatch is selected
     */
    'data-selected'?: string;
    /**
     * Whether EmptySwatch is disabled
     */
    'data-disabled'?: string;
  };
};
