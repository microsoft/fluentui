import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Shape = (): JSXElement => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.outerWrapper}>
      <div className={containerStyles.innerWrapper}>
        <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</Tag>
        <Tag shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Circular
        </Tag>
      </div>

      <div className={containerStyles.innerWrapper}>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          icon={<CalendarMonthRegular />}
          secondaryText="Secondary text"
        >
          Rounded
        </Tag>
        <Tag
          shape="circular"
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          icon={<CalendarMonthRegular />}
          secondaryText="Secondary text"
        >
          Circular
        </Tag>
      </div>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A tag can be rounded or circular,',
    },
  },
};
