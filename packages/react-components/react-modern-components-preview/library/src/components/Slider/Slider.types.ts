import type {
  SliderProps as SliderBaseProps,
  SliderState as SliderBaseState,
} from '@fluentui/react-headless-components-preview/slider';
export type { SliderSlots } from '@fluentui/react-headless-components-preview/slider';

export type SliderProps = SliderBaseProps & {
  /**
   * The size of the Slider.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium';
};

export type SliderState = SliderBaseState & {
  size: NonNullable<SliderProps['size']>;
  root: SliderBaseState['root'] & {
    'data-size': NonNullable<SliderProps['size']>;
  };
};
