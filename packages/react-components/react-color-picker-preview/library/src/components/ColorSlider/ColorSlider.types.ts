import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorSliderSlots = {
  root: NonNullable<Slot<'div'>>;
  rail: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  input: NonNullable<Slot<'input'>> & {
    /**
     * Orient is a non standard attribute that allows for vertical orientation in Firefox. It is set internally
     * when `vertical` is set to true.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#non_standard_attributes
     * Webkit/Chromium support for vertical inputs is provided via -webkit-appearance css property
     */
    orient?: 'horizontal' | 'vertical';
  };
};

/**
 * ColorSlider Props
 */
export type ColorSliderProps = Omit<
  ComponentProps<Partial<ColorSliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  value?: number;
  /**
   * The max value of the Slider.
   * @default 100
   */
  max?: number;

  /**
   * The min value of the Slider.
   * @default 0
   */
  min?: number;

  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => void;

  /**
   * Render the Slider in a vertical orientation, smallest value on the bottom.
   * @default `false`
   */
  vertical?: boolean;
};

export type SliderOnChangeData = {
  value: number;
};

/**
 * State used in rendering ColorSlider
 */
export type ColorSliderState = ComponentState<ColorSliderSlots> & Pick<ColorSliderProps, 'vertical'>;
