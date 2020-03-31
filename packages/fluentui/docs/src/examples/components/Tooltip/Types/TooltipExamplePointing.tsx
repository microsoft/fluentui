import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const TooltipExamplePointing = () => (
  <Tooltip open pointing content="The tooltip is pointing.">
    <Button icon={<MoreIcon />} />
  </Tooltip>
);

export default TooltipExamplePointing;
