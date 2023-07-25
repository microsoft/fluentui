import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Radio, RadioProps, RadioSlots, RadioState } from '@fluentui/react-components';

export type SwatchColorPikerCellSlots = RadioSlots;

/**
 * SwatchColorPikerCell Props
 */
export type SwatchColorPikerCellProps = ComponentProps<SwatchColorPikerCellSlots> &
  Pick<RadioProps, 'name' | 'value'> & {
    shape?: 'circular' | 'square';
    size?: number;
    selected?: boolean; // if this color is selected
    disabled?: boolean;
    color: string;
  };

/**
 * State used in rendering SwatchColorPikerCell
 */
export type SwatchColorPikerCellState = ComponentState<SwatchColorPikerCellSlots> &
  Omit<RadioState, keyof RadioSlots | 'components'> &
  // Omit<RadioState, keyof RadioProps | 'label'> &
  Required<Pick<SwatchColorPikerCellProps, 'color'>>;
