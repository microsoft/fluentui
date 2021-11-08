import * as React from 'react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="This is the secondary content">Default</CompoundButton>
        <CompoundButton secondaryContent="This is the secondary content" disabled>
          Disabled
        </CompoundButton>
        <CompoundButton secondaryContent="This is the secondary content" disabledFocusable>
          Disabled focusable
        </CompoundButton>
      </div>
      <div style={groupStyles}>
        <CompoundButton
          secondaryContent="This is the secondary content"
          appearance="primary"
          icon={<CalendarMonth24Regular />}
        >
          Primary
        </CompoundButton>
        <CompoundButton
          secondaryContent="This is the secondary content"
          appearance="primary"
          disabled
          icon={<CalendarMonth24Regular />}
        >
          Primary disabled
        </CompoundButton>
        <CompoundButton secondaryContent="This is the secondary content" appearance="primary" disabledFocusable>
          Primary disabled focusable
        </CompoundButton>
      </div>
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A compound button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled compound button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
