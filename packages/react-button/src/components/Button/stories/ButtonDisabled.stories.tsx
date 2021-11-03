import * as React from 'react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Button } from '../../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button disabledFocusable>Disabled focusable</Button>
      </div>
      <div style={groupStyles}>
        <Button appearance="primary" icon={<CalendarMonth24Regular />}>
          Primary
        </Button>
        <Button appearance="primary" disabled icon={<CalendarMonth24Regular />}>
          Primary disabled
        </Button>
        <Button appearance="primary" disabledFocusable>
          Primary disabled focusable
        </Button>
      </div>
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
