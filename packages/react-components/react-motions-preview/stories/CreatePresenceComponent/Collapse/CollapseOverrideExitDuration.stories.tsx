import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseOverrideExitDuration.stories.md';

import { loremIpsum } from '../loremIpsum';

export const OverrideExitDuration = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} override={{ exit: { duration: 2000 } }}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

OverrideExitDuration.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
