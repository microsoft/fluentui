import type { AlphaSliderBaseState } from '@fluentui/react-color-picker';

export type { AlphaSliderBaseProps as AlphaSliderProps, AlphaSliderSlots } from '@fluentui/react-color-picker';

export type AlphaSliderState = AlphaSliderBaseState & {
  root: {
    /**
     * The color channel that the slider represents.
     */
    'data-channel'?: AlphaSliderBaseState['channel'];

    /**
     * The slider orientation.
     */
    'data-orientation'?: 'horizontal' | 'vertical';

    /**
     * Present when the slider value represents transparency instead of opacity.
     */
    'data-transparency'?: string;
  };
};
