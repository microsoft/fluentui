import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Size = () => {
  return (
    <>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" size="large">
        Size: large
      </CompoundButton>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A compound button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
