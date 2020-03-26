import { SplitButton } from '@fluentui/react-northstar';
import * as React from 'react';

const SplitButtonExampleToggleButtonShorthand = () => {
  return (
    <>
      <SplitButton
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'New conversation',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message-icon',
        }}
        toggleButton={{
          'aria-label': 'more options',
        }}
        onMainButtonClick={() => alert('button was clicked')}
      />
      <span aria-hidden="true" id="instruction-message-icon" style={{ opacity: 0 }}>
        to open menu, press Alt + Arrow Down
      </span>
    </>
  );
};

export default SplitButtonExampleToggleButtonShorthand;
