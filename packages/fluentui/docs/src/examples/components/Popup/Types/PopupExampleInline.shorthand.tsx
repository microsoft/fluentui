import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const PopupExampleInline = () => (
  <Popup
    trigger={<Button icon={<More />} title="Show popup" />}
    content="This popup is rendered next to the trigger."
    inline
  />
);

export default PopupExampleInline;
