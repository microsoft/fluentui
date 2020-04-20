import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExample = () => (
  <Popup content="Hello from popup!">
    <Button icon={<MoreIcon />} title="Show popup" />
  </Popup>
);

export default PopupExample;
