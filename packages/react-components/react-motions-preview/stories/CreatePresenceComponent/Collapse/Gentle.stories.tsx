import * as React from 'react';
import description from './Gentle.stories.md';
import { Collapse } from '@fluentui/react-motions-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Gentle = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse.Gentle visible={visible}>
        <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
      </Collapse.Gentle>
    </div>
  );
};

Gentle.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
