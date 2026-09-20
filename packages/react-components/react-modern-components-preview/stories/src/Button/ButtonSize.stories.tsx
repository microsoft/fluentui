import * as React from 'react';

import { Button } from '@fluentui/react-modern-components-preview/button';
import { Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const styles = {
  innerWrapper: {
    alignItems: 'start',
    columnGap: '15px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
    minWidth: 'min-content',
  },
} as const;

export const Size = (): React.ReactNode => {
  return (
    <div style={styles.outerWrapper}>
      <div style={styles.innerWrapper}>
        <Button size="small">Small</Button>
        <Button size="small" icon={<CalendarMonthRegular />}>
          Small with calendar icon
        </Button>
        <Tooltip content="Small with calendar icon only" relationship="label">
          <Button size="small" icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
      <div style={styles.innerWrapper}>
        <Button>Medium</Button>
        <Button icon={<CalendarMonthRegular />}>Medium with calendar icon</Button>
        <Tooltip content="Medium with calendar icon only" relationship="label">
          <Button icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
      <div style={styles.innerWrapper}>
        <Button size="large">Large</Button>
        <Button size="large" icon={<CalendarMonthRegular />}>
          Large with calendar icon
        </Button>
        <Tooltip content="Large with calendar icon only" relationship="label">
          <Button size="large" icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
    </div>
  );
};
Size.parameters = {
  docs: {
    description: {
      story: 'A button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
