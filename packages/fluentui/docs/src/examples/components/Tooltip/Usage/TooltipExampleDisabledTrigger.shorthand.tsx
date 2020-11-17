import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const TooltipExampleDisabledTrigger = () => {
  return (
    <Tooltip
      trigger={<Button disabledFocusable content="Hover me" />}
      content="This tooltip is set on the div wrapping the disabled button"
    />
  );
};

export default TooltipExampleDisabledTrigger;
