import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type ColorAreaOnColorChangeData = EventData<'click' | 'onMouseMove', React.MouseEvent> & {
  x: number;
  y: number;
};

export type ColorAreaSlots = {
  root: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
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
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: EventHandler<ColorAreaOnColorChangeData>;
};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots>;
