import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const TooltipExampleDisabledTrigger = () => {
  return (
    <Tooltip
      trigger={<Button disabledFocusable content="Hover me" />}
      content="The button uses disabledFocusable property."
    />
  );
};

export default TooltipExampleDisabledTrigger;
