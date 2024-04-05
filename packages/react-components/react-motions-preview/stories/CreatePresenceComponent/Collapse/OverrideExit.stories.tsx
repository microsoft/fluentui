import * as React from 'react';
import { Checkbox, ToggleButton } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motions-preview';
import { useMotionConfigurator } from '../utils/useMotionConfigurator';
import description from './OverrideExit.stories.md';

import { loremIpsum } from '../utils/loremIpsum';

export const OverrideExit = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  // Use the motion configurator UI to customize duration and easing, and generate an override object
  const { configuratorJSX, override } = useMotionConfigurator({
    animateOpacity,
    tagName: 'Collapse',
    overrideName: 'exit',
  });

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

OverrideExit.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
