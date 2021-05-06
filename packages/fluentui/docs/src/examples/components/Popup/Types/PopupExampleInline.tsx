import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExampleInline = () => (
  <Popup content="This popup is rendered next to the trigger." inline>
    <Button icon={<MoreIcon />} title="Show popup" />
  </Popup>
);

export default PopupExampleInline;
