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
export type ColorAreaProps = ComponentProps<ColorAreaSlots> & {
  /**
   * The current color of the ColorArea.
   */
  color?: string;

  /**
   * The max value of the ColorArea.
   * @default 100
   */
  max?: number;

  /**
   * The min value of the ColorArea.
   * @default 0
   */
  min?: number;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onColorChange?: EventHandler<ColorAreaOnColorChangeData>;

  /**
   * The current X value of the controlled ColorArea.
   */
  x?: number;

  /**
   * The current Y value of the controlled ColorArea.
   */
  y?: number;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots>;
