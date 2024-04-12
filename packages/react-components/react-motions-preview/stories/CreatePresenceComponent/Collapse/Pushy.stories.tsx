import * as React from 'react';
import description from './Pushy.stories.md';
import { Collapse } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Pushy = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse.Pushy visible={visible}>
        <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
      </Collapse.Pushy>
    </div>
  );
};

Pushy.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
