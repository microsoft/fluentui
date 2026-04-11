import * as React from 'react';
import type {
  ComponentState,
  DistributiveOmit,
  Slot,
  EventHandler,
  EventData,
  ComponentProps,
} from '@fluentui/react-utilities';
import type { HsvColor } from '../../types/color';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker.types';

export type ColorAreaOnColorChangeData = EventData<'change', React.SyntheticEvent | PointerEvent> & {
  color: HsvColor;
};

export type ColorAreaSlots = {
  root: NonNullable<Slot<'div'>>;
  thumb?: NonNullable<Slot<'div'>>;
  inputX?: NonNullable<Slot<'input'>>;
  inputY?: NonNullable<Slot<'input'>>;
};

/**
 * ColorArea Props
 */
export type ColorAreaProps = Omit<ComponentProps<Partial<ColorAreaSlots>>, 'color' | 'onChange'> &
  Pick<ColorPickerProps, 'shape'> & {
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
export type ColorAreaState = ComponentState<Required<ColorAreaSlots>> & Pick<ColorAreaProps, 'color' | 'shape'>;

/**
 * ColorArea Props without design-only props.
 */
export type ColorAreaBaseProps = DistributiveOmit<ColorAreaProps, 'shape'>;

/**
 * State used in rendering ColorArea, without design-only state.
 */
export type ColorAreaBaseState = DistributiveOmit<ColorAreaState, 'shape'>;
