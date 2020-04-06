import * as React from 'react';
import { SplitButton } from '@fluentui/react-northstar';

const SplitButtonExampleDisabledShorthand = () => (
  <SplitButton
    disabled
    menu={[
      { key: 'group', content: 'New group message' },
      { key: 'channel', content: 'New channel message' },
    ]}
    button={{
      content: 'New conversation',
      'aria-roledescription': 'splitbutton',
    }}
    toggleButton={{ 'aria-label': 'more options' }}
  />
);

export default SplitButtonExampleDisabledShorthand;
