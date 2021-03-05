import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExample = () => (
  <Popup trigger={<Button icon={<MoreIcon />} title="Show popup" />} content="Hello from popup!" />
);

export default PopupExample;
