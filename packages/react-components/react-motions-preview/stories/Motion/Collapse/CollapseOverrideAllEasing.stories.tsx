import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseOverrideAllEasing.stories.md';

import { loremIpsum } from './loremIpsum';
import { easingEasyEaseMax } from '../../../src/motions/atom/tokens';

export const OverrideAllEasing = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="Visible?" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} override={{ all: { easing: easingEasyEaseMax, duration: 700 } }}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

OverrideAllEasing.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
