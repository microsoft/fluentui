import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> = {
  root: 'fui-DatePicker',
  calendar: 'fui-DatePicker__calendar',
  popupSurface: 'fui-DatePicker__popupSurface',
};

const useStyles = makeStyles({
  base: {
    position: 'relative',
    cursor: 'pointer',
    '& input': {
      cursor: 'pointer',
    },
  },
  disabled: {
    cursor: 'default',
    '& input': {
      cursor: 'default',
    },
  },
});

const usePopupSurfaceClassName = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow16,
  borderRadius: tokens.borderRadiusMedium,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: tokens.colorTransparentStroke,
  display: 'inline-flex',
  color: tokens.colorNeutralForeground1,
  ...typographyStyles.body1,
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const styles = useStyles();
  const popupSurfaceClassName = usePopupSurfaceClassName();
  const { disabled } = state;

  state.root.className = mergeClasses(
    datePickerClassNames.root,
    styles.base,
    disabled && styles.disabled,
    state.root.className,
  );

  if (state.popupSurface) {
    state.popupSurface.className = mergeClasses(
      datePickerClassNames.popupSurface,
      popupSurfaceClassName,
      state.popupSurface.className,
    );
  }

  state.calendar.className = mergeClasses(datePickerClassNames.calendar, state.calendar.className);

  return state;
};
