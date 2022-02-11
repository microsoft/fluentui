import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { ToggleButton } from '../../../ToggleButton';

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <ToggleButton>Enabled state</ToggleButton>
        <ToggleButton disabled>Disabled state</ToggleButton>
        <ToggleButton disabledFocusable>Disabled focusable state</ToggleButton>
      </div>
      <div style={groupStyles}>
        <ToggleButton appearance="primary" icon={<CalendarMonthRegular />}>
          Enabled state
        </ToggleButton>
        <ToggleButton appearance="primary" disabled icon={<CalendarMonthRegular />}>
          Disabled state
        </ToggleButton>
        <ToggleButton appearance="primary" disabledFocusable>
          Disabled focusable state
        </ToggleButton>
      </div>
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A toggle button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled toggle button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
