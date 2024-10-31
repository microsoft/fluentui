import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import type { Numberify, HSVA } from '@ctrl/tinycolor';

export type ColorAreaOnColorChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: Numberify<HSVA>;
};

export type ColorAreaSlots = {
  root: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  inputX: NonNullable<Slot<'input'>>;
  inputY: NonNullable<Slot<'input'>>;
};

export type HsvColor = {
  h: number;
  s: number;
  v: number;
  a?: number;
};

/**
 * ColorArea Props
 */
export type ColorAreaProps = Omit<ComponentProps<Partial<ColorAreaSlots>>, 'onChange'> & {
  /**
   * The current color of the ColorArea.
   */
  color?: Numberify<HSVA>;

  /**
   * The starting value for an uncontrolled ColorArea.
   */
  defaultColor?: Numberify<HSVA>;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: EventHandler<ColorAreaOnColorChangeData>;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots> & Pick<ColorAreaProps, 'color'>;
