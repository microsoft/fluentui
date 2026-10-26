import type { TimePickerBaseProps, TimePickerTimeState } from '@fluentui/react-timepicker-preview';
import type { ComboboxState } from '../Combobox/Combobox.types';
import type { PositioningShorthand } from '../../positioning';

export type {
  TimePickerContextValues,
  TimePickerOnChangeData,
  TimePickerSlots,
} from '@fluentui/react-timepicker-preview';

/**
 * TimePicker Props
 */
export type TimePickerProps = Omit<TimePickerBaseProps, 'inlinePopup' | 'mountNode' | 'positioning'> & {
  positioning?: PositioningShorthand;
};

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComboboxState &
  TimePickerTimeState & {
    root: {
      /**
       * Whether the TimePicker accepts freeform input.
       */
      'data-freeform'?: string;
    };
  };
