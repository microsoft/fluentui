import type { ColorSwatchBaseState } from '@fluentui/react-swatch-picker';

export type { ColorSwatchBaseProps as ColorSwatchProps, ColorSwatchSlots } from '@fluentui/react-swatch-picker';

export type ColorSwatchState = ColorSwatchBaseState & {
  root: {
    /**
     * Whether ColorSwatch is selected
     */
    'data-selected'?: string;
    /**
     * Whether ColorSwatch is disabled
     */
    'data-disabled'?: string;
  };
};
