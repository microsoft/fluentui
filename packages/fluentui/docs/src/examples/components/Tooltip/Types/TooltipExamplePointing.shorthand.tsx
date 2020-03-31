import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const TooltipExamplePointing = () => (
  <Tooltip open pointing trigger={<Button icon={<More />} />} content="The tooltip is pointing." />
);

export default TooltipExamplePointing;
