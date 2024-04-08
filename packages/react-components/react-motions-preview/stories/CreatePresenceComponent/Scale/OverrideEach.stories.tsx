import * as React from 'react';
import { Checkbox, ToggleButton } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motions-preview';
import { useMotionConfigurator, OverrideCodePreviewJSON } from '../utils/useMotionConfigurator';
import description from './OverrideEach.stories.md';

import { loremIpsum } from '../utils/loremIpsum';

const tagName = 'Scale';

export const OverrideEach = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState(false);
  // Use the motion configurator UI to customize duration and easing, and generate an override object

  // configurator for enter transition
  const {
    // configuratorJSX: configuratorJSXEnter,
    // codePreviewJSX: codePreviewJSXEnter,
    overrideControlsJSX: overrideControlsJSXEnter,
    override: overrideEnter,
    overrideNamed: overrideNamedEnter,
  } = useMotionConfigurator({
    animateOpacity,
    unmountOnExit,
    tagName,
    overrideName: 'enter',
  });

  // configurator for exit transition
  const {
    // configuratorJSX: configuratorJSXExit,
    // codePreviewJSX: codePreviewJSXExit,
    overrideControlsJSX: overrideControlsJSXExit,
    override: overrideExit,
    overrideNamed: overrideNamedExit,
  } = useMotionConfigurator({
    animateOpacity,
    unmountOnExit,
    tagName,
    overrideName: 'exit',
  });

  // Merge overrides for enter and exit transitions
  const override = { ...overrideEnter, ...overrideExit };
  const overrideNamed = { ...overrideNamedEnter, ...overrideNamedExit };

  return (
    <>
      <OverrideCodePreviewJSON {...{ animateOpacity, unmountOnExit, tagName, overrideNamed }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h3>enter</h3>
          {/* {configuratorJSXEnter} */}
          {overrideControlsJSXEnter}
        </div>

        <div>
          <h3>exit</h3>
          {/* {configuratorJSXExit} */}
          {overrideControlsJSXExit}
        </div>
      </div>

      <Checkbox label="animate opacity" checked={animateOpacity} onChange={() => setAnimateOpacity(v => !v)} />
      <Checkbox label="unmount on exit" checked={unmountOnExit} onChange={() => setUnmountOnExit(v => !v)} />

      <div style={{ padding: '15px 0' }}>
        <ToggleButton checked={visible} onClick={() => setVisible(v => !v)}>
          <span>{visible ? '☑️' : '🔲'}</span>&nbsp; visible
        </ToggleButton>
      </div>

      <Scale {...{ visible, animateOpacity, override, unmountOnExit }}>
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
