import * as React from 'react';
import {
  FluentProvider,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTagVrScene } from './InteractionTagVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InteractionTagGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <InteractionTagVrScene
      InteractionTag={InteractionTag}
      InteractionTagPrimary={InteractionTagPrimary}
      InteractionTagSecondary={InteractionTagSecondary}
      TagGroup={TagGroup}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
