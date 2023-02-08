import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> & Record<string, string> = {
  root: 'fui-DatePicker',
  inputField: 'fui-DatePicker__inputField',
  wrapper: 'fui-DatePicker__wrapper',
  popover: 'fui-DatePicker__popover',
  popoverSurface: 'fui-DatePicker__popoverSurface',
  input: 'fui-DatePicker__input',
};

const useRootStyles = makeStyles({
  base: {
    fontFamily: tokens.fontFamilyBase,
    // NOTE: Using 20px as we don't have an 18px font size in the ramp
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightRegular,
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
  },
});

const useTextFieldStyles = makeStyles({
  base: {
    position: 'relative',
    '& input[readonly]': {
      cursor: 'pointer',
    },
    input: {
      '::-ms-clear': {
        display: 'none',
      },
    },
  },
  disabled: {
    '& input[readonly]': {
      cursor: 'default',
    },
  },
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const rootStyles = useRootStyles();
  const textFieldStyles = useTextFieldStyles();
  const { disabled, isDatePickerShown } = state;

  state.root.className = mergeClasses(
    datePickerClassNames.root,
    rootStyles.base,
    isDatePickerShown && 'is-open',
    rootStyles.normalize,
    state.root.className,
  );

  state.wrapper.className = mergeClasses(datePickerClassNames.wrapper, state.wrapper.className);

  state.input.className = mergeClasses(
    datePickerClassNames.input,
    textFieldStyles.base,
    disabled && textFieldStyles.disabled,
    state.input.className,
  );

  state.inputField.className = mergeClasses(datePickerClassNames.inputField, state.inputField.className);

  state.popoverSurface.className = mergeClasses(datePickerClassNames.popoverSurface, state.popoverSurface.className);

  return state;
};
