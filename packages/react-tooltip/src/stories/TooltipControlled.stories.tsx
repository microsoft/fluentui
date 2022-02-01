import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Tooltip } from '../Tooltip';

export const Controlled = () => {
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Tooltip
      content="Tooltip with controlled visibility"
      relationship="description"
      visible={visible && enabled}
      onVisibleChange={(_ev, data) => setVisible(data.visible)}
    >
      <Checkbox label="Tooltip enabled" onChange={(_ev, { checked }) => setEnabled(!!checked)} />
    </Tooltip>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'The visibility of the tooltip can be controlled using the `visible` prop and `onVisibleChange` event. ' +
        'In this example, the tooltip will show on hover _only if_ the checkbox is checked.',
    },
  },
};
