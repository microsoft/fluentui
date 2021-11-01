import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const TooltipExampleDismissOnContentMouseEnter = () => {
  return <Tooltip dismissOnContentMouseEnter trigger={<Button content="trigger" />} content="well, yes" />;
};

export default TooltipExampleDismissOnContentMouseEnter;
