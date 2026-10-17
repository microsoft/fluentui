import * as React from 'react';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-windmod-preview/interaction-tag';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { TagGroup } from '@fluentui/react-windmod-preview/tag-group';
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
