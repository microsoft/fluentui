import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { More } from '@fluentui/react-icons-northstar';

const TooltipOpenExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open', initialValue: true });

  return (
    <Tooltip
      open={open || undefined}
      onOpenChange={(e, data) => setOpen(data.open)}
      content="This is a controlled Tooltip"
    >
      <Button icon={<More />} />
    </Tooltip>
  );
};

export default TooltipOpenExample;
