import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import { InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});
export const Size = () => {
  const styles = useContainerStyles();
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <InteractionTag>
          <Primary>Medium</Primary>
        </InteractionTag>
        <InteractionTag>
          <Primary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Medium dismissible
          </Primary>
          <Secondary />
        </InteractionTag>
        <InteractionTag shape="circular">
          <Primary icon={<CalendarMonthRegular />}>Medium circular</Primary>
        </InteractionTag>
      </div>
      <div className={styles.innerWrapper}>
        <InteractionTag size="small">
          <Primary>Small</Primary>
        </InteractionTag>

        <InteractionTag size="small">
          <Primary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Small dismissible
          </Primary>
          <Secondary />
        </InteractionTag>
        <InteractionTag size="small" shape="circular">
          <Primary icon={<CalendarMonthRegular />}>Small circular</Primary>
        </InteractionTag>
      </div>
      <div className={styles.innerWrapper}>
        <InteractionTag size="extra-small">
          <Primary>Extra Small</Primary>
        </InteractionTag>

        <InteractionTag size="extra-small">
          <Primary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Extra Small dismissible
          </Primary>
          <Secondary />
        </InteractionTag>
        <InteractionTag size="extra-small" shape="circular">
          <Primary icon={<CalendarMonthRegular />}>Extra Small circular</Primary>
        </InteractionTag>
      </div>
    </div>
  );
};

Size.storyName = 'Size';
Size.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag supports `medium`, `small` and `extra-small` size. Default size is `medium`.',
    },
  },
};
