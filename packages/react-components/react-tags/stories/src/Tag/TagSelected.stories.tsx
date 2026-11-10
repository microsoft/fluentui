import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, makeResetStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeResetStyles({
  columnGap: '10px',
  display: 'flex',
});

export const Selected = (): JSXElement => {
  const containerStyles = useContainerStyles();

  return (
    <div className={containerStyles}>
      <Tag
        selected
        secondaryText="appearance=filled"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
    </div>
  );
};
