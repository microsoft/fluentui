import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { DatePickerBase } from './DatePicker.base';
import { styles } from './DatePicker.styles';
import type { IDatePickerProps } from './DatePicker.types';

export const DatePicker: React.FunctionComponent<IDatePickerProps> = styled(DatePickerBase, styles, undefined, {
  scope: 'DatePicker',
});
