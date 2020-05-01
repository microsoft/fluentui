import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const TooltipExampleDisabledTrigger = () => {
  return (
    <Tooltip
      trigger={
        <div style={{ display: 'inline-block' }}>
          <Button disabled content="Hover me" />
        </div>
      }
      content="This tooltip is set on the div wrapping the disabled button"
    />
  );
};

export default TooltipExampleDisabledTrigger;
