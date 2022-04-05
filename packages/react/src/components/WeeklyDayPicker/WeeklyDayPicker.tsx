import * as React from 'react';
import { WeeklyDayPickerBase } from './WeeklyDayPicker.base';
import { styles } from './WeeklyDayPicker.styles';
import { styled } from '../../Utilities';
import type { IWeeklyDayPickerProps } from './WeeklyDayPicker.types';

export const WeeklyDayPicker: React.FunctionComponent<IWeeklyDayPickerProps> = styled(
  WeeklyDayPickerBase,
  styles,
  undefined,
  { scope: 'WeeklyDayPicker' },
);
