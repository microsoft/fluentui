import * as React from 'react';
import { SplitButton } from '@fluentui/react-northstar';

const SplitButtonExamplePrimaryShorthand = () => (
  <>
    <SplitButton
      menu={[
        { key: 'group', content: 'New group message' },
        { key: 'channel', content: 'New channel message' },
      ]}
      button={{
        content: 'New conversation',
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message-primary-button',
      }}
      primary
      toggleButton={{ 'aria-label': 'more options' }}
      onMainButtonClick={() => alert('button was clicked')}
    />
    <span aria-hidden="true" id="instruction-message-primary-button" style={{ opacity: 0 }}>
      to open menu, press Alt + Arrow Down
    </span>
  </>
);

export default SplitButtonExamplePrimaryShorthand;
