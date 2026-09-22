import type {
  AlphaSliderProps as AlphaSliderBaseProps,
  AlphaSliderState as AlphaSliderBaseState,
} from '@fluentui/react-headless-components-preview/color-picker';
export type { AlphaSliderSlots } from '@fluentui/react-headless-components-preview/color-picker';

export type AlphaSliderProps = AlphaSliderBaseProps & {
  /**
   * The shape of the slider rail.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';
};

export type AlphaSliderState = AlphaSliderBaseState & {
  shape: NonNullable<AlphaSliderProps['shape']>;
  root: AlphaSliderBaseState['root'] & {
    'data-shape': NonNullable<AlphaSliderProps['shape']>;
  };
};
