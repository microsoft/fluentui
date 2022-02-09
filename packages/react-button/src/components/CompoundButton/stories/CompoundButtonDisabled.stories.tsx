import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="Secondary content">Default</CompoundButton>
        <CompoundButton secondaryContent="Secondary content" disabled>
          Default disabled
        </CompoundButton>
        <CompoundButton secondaryContent="Secondary content" disabledFocusable>
          Default disabled focusable
        </CompoundButton>
      </div>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="Secondary content" appearance="primary" icon={<CalendarMonthRegular />}>
          Primary
        </CompoundButton>
        <CompoundButton
          secondaryContent="Secondary content"
          appearance="primary"
          disabled
          icon={<CalendarMonthRegular />}
        >
          Primary disabled
        </CompoundButton>
        <CompoundButton secondaryContent="Secondary content" appearance="primary" disabledFocusable>
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
