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
  inline: {
    // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
    // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
    zIndex: 1,
  },
});

const usePopupSurfaceClassName = makeResetStyles({
  backgroundColor: `var(--ctrl-token-DatePicker-1049, var(--semantic-token-DatePicker-1050, ${tokens.colorNeutralBackground1}))`,
  boxShadow: `var(--ctrl-token-DatePicker-1051, var(--semantic-token-DatePicker-1052, ${tokens.shadow16}))`,
  borderRadius: `var(--ctrl-token-DatePicker-1053, var(--semantic-token-DatePicker-1054, ${tokens.borderRadiusMedium}))`,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: `var(--ctrl-token-DatePicker-1055, var(--semantic-token-DatePicker-1056, ${tokens.colorTransparentStroke}))`,
  display: 'inline-flex',
  color: `var(--ctrl-token-DatePicker-1057, var(--semantic-token-DatePicker-1058, ${tokens.colorNeutralForeground1}))`,
  ...typographyStyles.body1,
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const styles = useStyles();
  const popupSurfaceClassName = usePopupSurfaceClassName();
  const { disabled, inlinePopup } = state;

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
      inlinePopup && styles.inline,
    );
  }

  state.calendar.className = mergeClasses(datePickerClassNames.calendar, state.calendar.className);

  return state;
};
