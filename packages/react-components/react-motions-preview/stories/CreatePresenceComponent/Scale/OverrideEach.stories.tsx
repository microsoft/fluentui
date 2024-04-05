import * as React from 'react';
import { Checkbox, ToggleButton } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motions-preview';
import { useMotionConfigurator } from '../utils/useMotionConfigurator';
import description from './OverrideEach.stories.md';

import { loremIpsum } from '../utils/loremIpsum';

export const OverrideEach = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  // Use the motion configurator UI to customize duration and easing, and generate an override object

  // configurator for enter transition
  const { configuratorJSX: configuratorJSXEnter, override: overrideEnter } = useMotionConfigurator({
    animateOpacity,
    tagName: 'Scale',
    overrideName: 'enter',
  });

  // configurator for exit transition
  const { configuratorJSX: configuratorJSXExit, override: overrideExit } = useMotionConfigurator({
    animateOpacity,
    tagName: 'Scale',
    overrideName: 'exit',
  });

  // Merge overrides for enter and exit transitions
  const override = { ...overrideEnter, ...overrideExit };

  return (
    <>
      <h2>enter</h2>
      {configuratorJSXEnter}

      <h2>exit</h2>
      {configuratorJSXExit}

      <Checkbox label="animate opacity" checked={animateOpacity} onChange={() => setAnimateOpacity(v => !v)} />

      <div style={{ padding: '15px 0' }}>
        <ToggleButton checked={visible} onClick={() => setVisible(v => !v)}>
          <span>{visible ? '☑️' : '🔲'}</span>&nbsp; visible
        </ToggleButton>
      </div>

      <Scale {...{ visible, animateOpacity, override }}>
        <div>{loremIpsum(10)}</div>
      </Scale>
    </>
  );
};

OverrideEach.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
