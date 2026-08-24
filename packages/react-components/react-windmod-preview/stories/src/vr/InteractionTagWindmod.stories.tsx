import * as React from 'react';
import {
  FluentProvider,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
} from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { InteractionTagVrScene } from './InteractionTagVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InteractionTagWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InteractionTagVrScene
      InteractionTag={InteractionTag}
      InteractionTagPrimary={InteractionTagPrimary}
      InteractionTagSecondary={InteractionTagSecondary}
      TagGroup={TagGroup}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
