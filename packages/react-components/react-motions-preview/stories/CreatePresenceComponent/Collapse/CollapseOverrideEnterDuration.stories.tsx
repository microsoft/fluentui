import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseOverrideEnterDuration.stories.md';

import { loremIpsum } from '../loremIpsum';

export const OverrideEnterDuration = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} override={{ enter: { duration: 2000 } }}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

OverrideEnterDuration.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
