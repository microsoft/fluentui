import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton, CompoundButtonProps } from '../../../CompoundButton';

export const Default = (props: CompoundButtonProps) => {
  return (
    <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" {...props}>
      Example
    </CompoundButton>
  );
};
