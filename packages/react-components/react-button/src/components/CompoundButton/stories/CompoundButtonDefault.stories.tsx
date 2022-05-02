import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton, CompoundButtonProps } from '../../../CompoundButton';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Default = (props: CompoundButtonProps) => {
  return (
    <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" {...props}>
      Example
    </CompoundButton>
  );
};
