import * as React from 'react';

import { Tooltip } from '@fluentui/react-components';
import { Button } from '@fluentui/react-modern-components-preview/button';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const styles = {
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
};

export const Icon = (): React.ReactNode => {
  return (
    <div style={styles.wrapper}>
      <Button icon={<CalendarMonthRegular />}>With calendar icon before contents</Button>
      <Button icon={<CalendarMonthRegular />} iconPosition="after">
        With calendar icon after contents
      </Button>
      <Tooltip content="With calendar icon only" relationship="label">
        <Button icon={<CalendarMonthRegular />} />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};
