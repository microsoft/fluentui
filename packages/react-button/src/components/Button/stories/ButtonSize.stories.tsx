import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Button } from '../../../Button';

export const Size = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };
  const headerStyles: React.CSSProperties = { width: '100%', margin: 0 };

  return (
    <>
      <div style={groupStyles}>
        <h4 style={headerStyles}>small</h4>
        <Button size="small">Text</Button>
        <Button size="small" icon={<CalendarMonthRegular />}>
          Text
        </Button>
        <Button size="small" icon={<CalendarMonthRegular />} />
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>medium</h4>
        <Button>Text</Button>
        <Button icon={<CalendarMonthRegular />}>Text</Button>
        <Button icon={<CalendarMonthRegular />} />
      </div>
      <div style={groupStyles}>
        <h4 style={headerStyles}>large</h4>
        <Button size="large">Text</Button>
        <Button size="large" icon={<CalendarMonthRegular />}>
          Text
        </Button>
        <Button size="large" icon={<CalendarMonthRegular />} />
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
