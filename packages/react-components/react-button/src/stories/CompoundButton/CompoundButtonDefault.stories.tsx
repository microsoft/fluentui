import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '@fluentui/react-components';
import type { CompoundButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Default = (props: CompoundButtonProps) => (
  <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" {...props}>
    Example
  </CompoundButton>
);
