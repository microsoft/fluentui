import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Radio, RadioProps, RadioSlots, RadioState } from '@fluentui/react-components';

export type SwatchColorPikerCellSlots = Pick<RadioSlots, 'root' | 'input'>;

// export type SwatchColorPikerCellSlots = {
//   /**
//    * Root element of the SwatchColorCell.
//    */
//   root: RadioProps;
// };

/**
 * SwatchColorPikerCell Props
 */
export type SwatchColorPikerCellProps = ComponentProps<SwatchColorPikerCellSlots> &
  Pick<RadioProps, 'name' | 'value'> & {
    shape?: 'circular' | 'square';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    swatch: string;
    id?: string | number; // TODO make it required
  };

/**
 * State used in rendering SwatchColorPikerCell
 */
export type SwatchColorPikerCellState = ComponentState<SwatchColorPikerCellSlots> &
  Required<Pick<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange' | 'disabled'>> &
  Partial<Omit<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange' | 'disabled'>> & {
    selected?: boolean;
  };
