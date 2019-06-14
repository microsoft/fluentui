import * as React from 'react';
import { IWeeklyDayPickerProps, IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles } from './WeeklyDayPicker.types';
import { WeeklyDayPickerBase } from './WeeklyDayPicker.base';
import { styles } from './WeeklyDayPicker.styles';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

/**
 * WeeklyDayPicker description
 */
export const WeeklyDayPicker: React.FunctionComponent<IWeeklyDayPickerProps> = styled<
  IWeeklyDayPickerProps,
  IWeeklyDayPickerStyleProps,
  IWeeklyDayPickerStyles
>(WeeklyDayPickerBase, styles, undefined, { scope: 'WeeklyDayPicker' });
