import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '../../../Button';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Size = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };
  const headerStyles: React.CSSProperties = { width: '100%', margin: 0 };

  return (
    <>
      <div style={groupStyles}>
        <h4 style={headerStyles}>small</h4>
        <Button size="small">Small</Button>
        <Button size="small" icon={<CalendarMonth />}>
          Small with calendar icon
        </Button>
        <Tooltip content="Small with calendar icon only" relationship="label">
          <Button size="small" icon={<CalendarMonth />} />
        </Tooltip>
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>medium</h4>
        <Button>Medium</Button>
        <Button icon={<CalendarMonth />}>Medium with calendar icon</Button>
        <Tooltip content="Medium with calendar icon only" relationship="label">
          <Button icon={<CalendarMonth />} />
        </Tooltip>
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>large</h4>
        <Button size="large">Large</Button>
        <Button size="large" icon={<CalendarMonth />}>
          Large with calendar icon
        </Button>
        <Tooltip content="Large with calendar icon only" relationship="label">
          <Button size="large" icon={<CalendarMonth />} />
        </Tooltip>
      </div>
    </>
  );
};
Size.parameters = {
  docs: {
    description: {
      story: 'A button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
