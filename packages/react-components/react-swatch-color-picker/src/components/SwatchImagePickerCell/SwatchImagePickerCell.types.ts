import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Radio, RadioProps, RadioSlots } from '@fluentui/react-components';

export type SwatchImagePickerCellSlots = Pick<RadioSlots, 'root' | 'input'>;

/**
 * SwatchImagePickerCell Props
 */
export type SwatchImagePickerCellProps = ComponentProps<SwatchImagePickerCellSlots> &
  Pick<RadioProps, 'name' | 'value'> & {
    // TODO make base type
    shape?: 'circular' | 'square';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    uri: string;
    id?: string | number; // TODO make it required
  };

/**
 * State used in rendering SwatchImagePickerCell
 */
export type SwatchImagePickerCellState = ComponentState<SwatchImagePickerCellSlots> &
  // Required<Pick<SwatchImagePickerCellProps, 'uri'>>;
  Required<Pick<SwatchImagePickerCellProps, 'name' | 'value' | 'onChange' | 'uri'>> &
  Partial<Omit<SwatchImagePickerCellProps, 'name' | 'value' | 'onChange' | 'uri'>>;
