import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Collapse } from '@fluentui/react-motions-preview';
import description from './CollapseDuration.stories.md';

import { loremIpsum } from './loremIpsum';

export const Duration = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Checkbox label="Visible?" checked={visible} onChange={() => setVisible(v => !v)} />
      <Collapse visible={visible} duration={2000}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

Duration.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
