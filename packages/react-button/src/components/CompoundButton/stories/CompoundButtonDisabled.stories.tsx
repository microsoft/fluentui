import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
        <CompoundButton secondaryContent="Secondary content" disabled>
          Disabled state
        </CompoundButton>
        <CompoundButton secondaryContent="Secondary content" disabledFocusable>
          Disabled focusable state
        </CompoundButton>
      </div>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="Secondary content" appearance="primary" icon={<CalendarMonthRegular />}>
          Enabled state
        </CompoundButton>
        <CompoundButton
          secondaryContent="Secondary content"
          appearance="primary"
          disabled
          icon={<CalendarMonthRegular />}
        >
          Disabled state
        </CompoundButton>
        <CompoundButton secondaryContent="Secondary content" appearance="primary" disabledFocusable>
          Disabled focusable state
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
