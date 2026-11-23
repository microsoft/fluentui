import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-preview';
import type { DatePickerProps } from '@fluentui/react-datepicker-preview';

export const Default = (props: Partial<DatePickerProps>): React.ReactElement => <DatePicker {...props} />;
