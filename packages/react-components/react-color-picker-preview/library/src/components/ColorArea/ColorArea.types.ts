import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type ColorAreaOnColorChangeData = EventData<'click' | 'onMouseMove', React.MouseEvent> & {
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
  'defaultValue' | 'onChange' | 'value'
> & {
  /**
   * The current color of the ColorArea.
   */
  color?: string;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: EventHandler<ColorAreaOnColorChangeData>;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots>;
