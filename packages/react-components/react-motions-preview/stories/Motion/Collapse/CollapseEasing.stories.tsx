import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseEasing.stories.md';

import { loremIpsum } from './loremIpsum';
import { easingEasyEaseMax } from '../../../src/motions/atom/tokens';

export const Easing = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="Visible?" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} easing={easingEasyEaseMax} duration={700}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

Easing.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
