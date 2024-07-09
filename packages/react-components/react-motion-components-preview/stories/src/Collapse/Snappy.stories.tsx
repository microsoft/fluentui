import * as React from 'react';
import description from './Snappy.stories.md';
import { CollapseSnappy } from '@fluentui/react-motion-components-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Snappy = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <CollapseSnappy visible={visible}>
        <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
      </CollapseSnappy>
    </div>
  );
};

Snappy.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
