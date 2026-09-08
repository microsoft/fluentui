import type { ColorChannel, ColorSliderBaseState } from '@fluentui/react-color-picker';

export type { ColorSliderBaseProps as ColorSliderProps, ColorSliderSlots } from '@fluentui/react-color-picker';

export type ColorSliderState = ColorSliderBaseState & {
  root: {
    /**
     * The color channel controlled by the slider.
     */
    'data-channel'?: ColorChannel;

    /**
     * The slider orientation.
     */
    'data-orientation'?: 'horizontal' | 'vertical';
  };
};
