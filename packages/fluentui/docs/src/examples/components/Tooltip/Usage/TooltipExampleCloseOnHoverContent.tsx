import { Button, Tooltip } from '@fluentui/react-northstar';
import * as React from 'react';

const TooltipExampleDialogContentShorthand: React.FC = () => (
  <Tooltip dismissOnContentMouseEnter trigger={<Button content="Click me!" />} content="Hello from tooltip!" />
);

export default TooltipExampleDialogContentShorthand;
