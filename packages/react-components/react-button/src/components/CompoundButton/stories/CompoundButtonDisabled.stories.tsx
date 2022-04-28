import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Disabled = () => {
  const groupStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5em' };

  return (
    <>
      <div style={groupStyles}>
        <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
        <CompoundButton disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
      <div style={groupStyles}>
        <CompoundButton appearance="primary" secondaryContent="Secondary content">
          Enabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabledFocusable secondaryContent="Secondary content">
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
