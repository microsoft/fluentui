import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorAreaSlots = {
  root: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  inputX: NonNullable<Slot<'input'>>;
  inputY: NonNullable<Slot<'input'>>;
};

/**
 * ColorArea Props
 */
export type ColorAreaProps = Omit<
  ComponentProps<Partial<ColorAreaSlots>, 'inputX'>,
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

  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => void; // Use EventHandler<SliderOnChangeData>;

  color?: string;
};

export type SliderOnChangeData = {
  value: number;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots> & Pick<ColorAreaProps, 'color'>;
