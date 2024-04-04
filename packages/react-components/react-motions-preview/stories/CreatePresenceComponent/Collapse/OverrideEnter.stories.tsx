import * as React from 'react';
import { Checkbox, ToggleButton } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motions-preview';
import { useMotionConfigurator } from '../utils/useMotionConfigurator';
import description from './OverrideEnter.stories.md';

import { loremIpsum } from '../utils/loremIpsum';

export const OverrideEnter = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  // Use the motion configurator UI to customize duration and easing, and generate an override object
  const { configuratorJSX, override } = useMotionConfigurator({ animateOpacity, overrideName: 'enter' });

  return (
    <>
      {configuratorJSX}
      <Checkbox label="animate opacity" checked={animateOpacity} onChange={() => setAnimateOpacity(v => !v)} />

      <div style={{ padding: '15px 0' }}>
        <ToggleButton checked={visible} onClick={() => setVisible(v => !v)}>
          <span>{visible ? '☑️' : '🔲'}</span>&nbsp; visible
        </ToggleButton>
      </div>

      <Collapse {...{ visible, animateOpacity, override }}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </>
  );
};

OverrideEnter.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
