import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  makeResetStyles,
} from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useContainerStyles = makeResetStyles({
  columnGap: '10px',
  display: 'flex',
});

export const Selected = (): JSXElement => {
  const containerStyles = useContainerStyles();

  return (
    <div className={containerStyles}>
      <InteractionTag selected>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};

Selected.storyName = 'Selected';
Selected.parameters = {
  docs: {
    description: {
      story:
        'InteractionTag that can be selected. Note: This prop only changes the appearance of the tag at the moment. A future PR will add the integration with TagGroup.',
    },
  },
};
