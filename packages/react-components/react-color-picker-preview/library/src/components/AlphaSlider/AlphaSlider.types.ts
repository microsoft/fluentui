import type { ComponentState } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderProps, ColorSliderState } from '../ColorSlider/ColorSlider.types';

export type AlphaSliderSlots = ColorSliderSlots;

/**
 * AlphaSlider Props
 */
export type AlphaSliderProps = Omit<ColorSliderProps, 'channel'> & {
  /**
   * The `transparency` property determines how the alpha channel is interpreted.
   * - When `false`, the alpha channel represents the opacity of the color.
   * - When `true`, the alpha channel represents the transparency of the color.
   * For example, a 30% transparent color has 70% opacity.
   *
   * @defaultvalue false
   */
  transparency?: boolean;
};

/**
 * State used in rendering AlphaSlider
 */
export type AlphaSliderState = ComponentState<AlphaSliderSlots> &
  Pick<AlphaSliderProps, 'vertical'> &
  Omit<ColorSliderState, keyof ColorSliderSlots | 'components'>;
