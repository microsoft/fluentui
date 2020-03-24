import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const TooltipOpenExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open', initialValue: true });

  return (
    <Tooltip
      open={open || undefined}
      onOpenChange={(e, data) => setOpen(data.open)}
      content="This is a controlled Tooltip"
    >
      <Button icon="more" />
    </Tooltip>
  );
};

export default TooltipOpenExample;
