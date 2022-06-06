import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Tooltip } from '../Tooltip';

export const Controlled = () => {
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Tooltip
      content="The checkbox controls whether the tooltip can show on hover or focus"
      relationship="description"
      visible={visible && enabled}
      onVisibleChange={(_ev, data) => setVisible(data.visible)}
    >
      <Checkbox label="Enable the tooltip" onChange={(_ev, { checked }) => setEnabled(!!checked)} />
    </Tooltip>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: `The visibility of the tooltip can be controlled using the \`visible\` and \`onVisibleChange\` props.
        <br />
        In this example, the tooltip will show on hover or focus _only if_ the checkbox is checked.`,
    },
  },
};
