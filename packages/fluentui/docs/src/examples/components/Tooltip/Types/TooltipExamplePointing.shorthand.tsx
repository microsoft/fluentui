import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const TooltipExamplePointing = () => (
  <Tooltip open pointing trigger={<Button icon={<MoreIcon />} />} content="The tooltip is pointing." />
);

export default TooltipExamplePointing;
