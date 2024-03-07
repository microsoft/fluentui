import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseOverrideAllDuration.stories.md';

import { loremIpsum } from '../loremIpsum';

export const OverrideAllDuration = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} override={{ all: { duration: 2000 } }}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

OverrideAllDuration.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
