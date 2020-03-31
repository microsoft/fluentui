import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { More } from '@fluentui/react-icons-northstar';

const TooltipOpenExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open', initialValue: true });

  return (
    <Tooltip
      open={open}
      onOpenChange={(e, data) => setOpen(data.open)}
      trigger={<Button icon={<More />} />}
      content="This is a controlled Tooltip"
    />
  );
};

export default TooltipOpenExample;
