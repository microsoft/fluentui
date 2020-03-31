import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const PopupExample = () => (
  <Popup trigger={<Button icon={<More />} title="Show popup" />} content="Hello from popup!" />
);

export default PopupExample;
