import * as React from 'react';
import { SplitButton } from '@fluentui/react-northstar';

const SplitButtonExampleSmallShorthand = () => (
  <>
    <SplitButton
      menu={[
        { key: 'group', content: 'New group message' },
        { key: 'channel', content: 'New channel message' },
      ]}
      button={{
        content: 'small',
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message',
      }}
      size="small"
      toggleButton={{ 'aria-label': 'expand options menu' }}
      onMainButtonClick={() => alert('button was clicked')}
    />
    <span aria-hidden="true" id="instruction-message" style={{ opacity: 0 }}>
      to open menu, press Alt + Arrow Down
    </span>
  </>
);

export default SplitButtonExampleSmallShorthand;
