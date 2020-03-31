import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const PopupExampleInline = () => (
  <Popup content="This popup is rendered next to the trigger." inline>
    <Button icon={<More />} title="Show popup" />
  </Popup>
);

export default PopupExampleInline;
