import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';

export const ButtonDisabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button disabledFocusable>Disabled focusable</Button>
      </div>
      <div style={groupStyles}>
        <Button primary icon={<CalendarMonth24Regular />}>
          Primary
        </Button>
        <Button primary disabled icon={<CalendarMonth24Regular />}>
          Primary disabled
        </Button>
        <Button primary disabledFocusable>
          Primary disabled focusable
        </Button>
      </div>
    </>
  );
};
ButtonDisabled.parameters = {
  docs: {
    description: {
      story: `A button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
