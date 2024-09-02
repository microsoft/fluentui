import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderProps, ColorSliderState } from '../ColorSlider/ColorSlider.types';

export type AlphaSliderSlots = ColorSliderSlots;

/**
 * AlphaSlider Props
 */
export type AlphaSliderProps = Omit<
  ComponentProps<Partial<AlphaSliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'value'
> &
  ColorSliderProps & {
    /**
     * The color to overlay on the alpha slider.
     */
    overlayColor?: string;
  };

/**
 * State used in rendering AlphaSlider
 */
export type AlphaSliderState = ComponentState<AlphaSliderSlots> &
  Pick<AlphaSliderProps, 'vertical'> &
  Omit<ColorSliderState, keyof ColorSliderSlots | 'components'>;
