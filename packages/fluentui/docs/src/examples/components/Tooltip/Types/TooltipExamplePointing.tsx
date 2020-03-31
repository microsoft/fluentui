import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { More } from '@fluentui/react-icons-northstar';

const TooltipExamplePointing = () => (
  <Tooltip open pointing content="The tooltip is pointing.">
    <Button icon={<More />} />
  </Tooltip>
);

export default TooltipExamplePointing;
