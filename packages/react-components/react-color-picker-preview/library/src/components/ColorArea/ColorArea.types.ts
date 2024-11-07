import * as React from 'react';
import type { ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type ColorAreaOnColorChangeData = EventData<'change', React.SyntheticEvent | MouseEvent> & {
  color: HsvColor;
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
export type ColorAreaProps = Partial<ColorAreaSlots> & {
  /**
   * The current color of the ColorArea.
   */
  color?: HsvColor;

  /**
   * The starting value for an uncontrolled ColorArea.
   */
  defaultColor?: HsvColor;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: EventHandler<ColorAreaOnColorChangeData>;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots> & Pick<ColorAreaProps, 'color'>;
