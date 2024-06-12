import * as React from 'react';
import description from './Exaggerated.stories.md';
import { CollapseExaggerated } from '@fluentui/react-motion-components-preview';
import { Checkbox } from '@fluentui/react-components';
import { loremIpsum } from '../utils/loremIpsum';

export const Exaggerated = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <CollapseExaggerated visible={visible}>
        <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
      </CollapseExaggerated>
    </div>
  );
};

Exaggerated.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
