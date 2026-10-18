'use client';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { slot } from '@fluentui/react-utilities';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> = {
  root: 'fui-DatePicker',
  calendar: 'fui-DatePicker__calendar',
  popupSurface: 'fui-DatePicker__popupSurface',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  selectionOnly: {
    cursor: 'pointer',
    '& input': { cursor: 'pointer' },
  },
  disabled: {
    cursor: 'default',
    '& input': { cursor: 'default' },
  },
  icon: {
    cursor: 'pointer',
  },
  inline: {
    zIndex: 1,
  },
});

const usePopupSurfaceStyles = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  boxShadow: tokens.shadow16,
  borderRadius: tokens.borderRadiusMedium,
  borderWidth: tokens.strokeWidthThin,
  borderStyle: 'solid',
  borderColor: tokens.colorTransparentStroke,
  display: 'inline-flex',
  ...typographyStyles.body1,
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  'use no memo';

  const styles = useStyles();
  const popupSurfaceClassName = usePopupSurfaceStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    datePickerClassNames.root,
    styles.root,
    !state.allowTextInput && styles.selectionOnly,
    state.disabled && styles.disabled,
    state.root.className,
  );
  const contentAfter = slot.resolveShorthand(state.root.contentAfter);
  if (contentAfter) {
    contentAfter.className = mergeClasses(styles.icon, state.disabled && styles.disabled, contentAfter.className);
  }
  // eslint-disable-next-line react-hooks/immutability
  state.calendar.className = mergeClasses(datePickerClassNames.calendar, state.calendar.className);
  if (state.popupSurface) {
    // eslint-disable-next-line react-hooks/immutability
    state.popupSurface.className = mergeClasses(
      datePickerClassNames.popupSurface,
      popupSurfaceClassName,
      state.inlinePopup && styles.inline,
      state.popupSurface.className,
    );
  }

  return state;
};
