import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <ToggleButton>Default</ToggleButton>
        <ToggleButton disabled>Disabled</ToggleButton>
        <ToggleButton disabledFocusable>Disabled focusable</ToggleButton>
      </div>
      <div style={groupStyles}>
        <ToggleButton appearance="primary" icon={<CalendarMonthRegular />}>
          Primary
        </ToggleButton>
        <ToggleButton appearance="primary" disabled icon={<CalendarMonthRegular />}>
          Primary disabled
        </ToggleButton>
        <ToggleButton appearance="primary" disabledFocusable>
          Primary disabled focusable
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
