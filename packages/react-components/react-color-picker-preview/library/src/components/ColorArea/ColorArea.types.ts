import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type ColorAreaOnChangeEventHandler = EventHandler<ColorAreaOnChangeData>;

export type ColorAreaOnChangeData = EventData<'click', React.MouseEvent<HTMLInputElement>> & {
  x: number;
  y: number;
};

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
  x?: number;
  y?: number;
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

  onClick?: EventHandler<ColorAreaOnChangeData>;
  onChange?: EventHandler<ColorAreaOnChangeData>;

  color?: string;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots> & Pick<ColorAreaProps, 'color'>;
