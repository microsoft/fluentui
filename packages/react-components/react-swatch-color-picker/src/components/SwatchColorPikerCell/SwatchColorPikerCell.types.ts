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
    id?: string | number; // TODO make it required
  };

/**
 * State used in rendering SwatchColorPikerCell
 */
export type SwatchColorPikerCellState = ComponentState<SwatchColorPikerCellSlots> &
  Required<Pick<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange'>> &
  Partial<Omit<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange'>>;
