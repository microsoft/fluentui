import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, Avatar } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from './InteractionTagShape.module.css';

const useContainerStyles = () => styles;

export const Shape = (): JSXElement => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.outerWrapper}>
      <div className={containerStyles.innerWrapper}>
        <InteractionTag>
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
            Rounded
          </InteractionTagPrimary>
        </InteractionTag>
        <InteractionTag shape="circular">
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
            Circular
          </InteractionTagPrimary>
        </InteractionTag>
      </div>

      <div className={containerStyles.innerWrapper}>
        <InteractionTag>
          <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
            Rounded
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
        <InteractionTag shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
            Circular
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
      </div>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag can be rounded or circular,',
    },
  },
};
