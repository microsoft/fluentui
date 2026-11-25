'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDatePicker_unstable } from './useDatePicker';
import { renderDatePicker_unstable } from './renderDatePicker';
import { useDatePickerStyles_unstable } from './useDatePickerStyles.styles';
import type { DatePickerProps } from './DatePicker.types';

/**
 * DatePicker component - TODO: add more docs
 */
export const DatePicker: ForwardRefComponent<DatePickerProps> = React.forwardRef((props, ref) => {
  const state = useDatePicker_unstable(props, ref);

  useDatePickerStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useDatePickerStyles_unstable')(state);

  return renderDatePicker_unstable(state);
});

DatePicker.displayName = 'DatePicker';
