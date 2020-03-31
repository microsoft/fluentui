import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const PopupExample = () => (
  <Popup content="Hello from popup!">
    <Button icon={<More />} title="Show popup" />
  </Popup>
);

export default PopupExample;
