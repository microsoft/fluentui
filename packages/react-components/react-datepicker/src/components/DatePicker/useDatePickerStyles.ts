import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerStyles, DatePickerStyleProps } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> & Record<string, string> = {
  root: 'fui-DatePicker',
  inputField: 'fui-DatePicker-inputField',
  wrapper: 'fui-DatePicker-wrapper',
  callout: 'fui-DatePicker-callout',
  withLabel: 'fui-DatePicker-event--with-label',
  withoutLabel: 'fui-DatePicker-event--without-label',
  disabled: 'fui-DatePicker--disabled ',
};

const TEXTFIELD_HEIGHT = 32;

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

const useIconStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground2,
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase400,
    // NOTE: Using 20px as we don't have an 18px line height in the ramp
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(`calc(${tokens.spacingHorizontalXS} + ${tokens.spacingHorizontalXXS} / 2)`),
    paddingTop: '7px',
    pointerEvents: 'initial',
    position: 'absolute',
    right: tokens.spacingHorizontalXS,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'default',
  },
});

const useStatusMessageStyles = makeStyles({
  base: {
    color: tokens.colorPaletteDarkRedForeground2,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    marginTop: `calc(${tokens.spacingHorizontalXS} + ${tokens.spacingHorizontalXXS} / 2)`,
  },
});

const useReadOnlyTextFieldStyles = makeStyles({
  base: {
    cursor: 'pointer',
    height: `${TEXTFIELD_HEIGHT}px`,
    lineHeight: `${TEXTFIELD_HEIGHT - 2}px`,
    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
  },
  underlined: {
    lineHeight: `${TEXTFIELD_HEIGHT + 2}px`,
  },
});

const useReadOnlyPlaceholderStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground4,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
// export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
export const useDatePickerStyles_unstable = (props: DatePickerStyleProps): Record<keyof DatePickerStyles, string> => {
  const rootStyles = useRootStyles();
  const textFieldStyles = useTextFieldStyles();
  const iconStyles = useIconStyles();
  const statusMessageStyles = useStatusMessageStyles();
  const readOnlyTextFieldStyles = useReadOnlyTextFieldStyles();
  const readOnlyPlaceholderStyles = useReadOnlyPlaceholderStyles();

  const { className, disabled, isDatePickerShown, label, underlined } = props;

  return {
    root: mergeClasses(
      datePickerClassNames.root,
      rootStyles.base,
      isDatePickerShown && 'is-open',
      rootStyles.normalize,
      className,
    ),
    wrapper: datePickerClassNames.wrapper,
    textField: mergeClasses(textFieldStyles.base, disabled && textFieldStyles.disabled),
    callout: datePickerClassNames.callout,
    icon: mergeClasses(
      iconStyles.base,
      label ? datePickerClassNames.withLabel : datePickerClassNames.withoutLabel,
      !disabled && datePickerClassNames.disabled,
      disabled && iconStyles.disabled,
    ),
    statusMessage: statusMessageStyles.base,
    readOnlyTextField: mergeClasses(readOnlyTextFieldStyles.base, underlined && readOnlyTextFieldStyles.underlined),
    readOnlyPlaceholder: readOnlyPlaceholderStyles.base,
  };
};
