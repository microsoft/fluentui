import * as React from 'react';
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-motion';
import { Checkbox } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { loremIpsum } from '../utils/loremIpsum';
import description from './Custom.stories.md';

const { curveEasyEaseMax, durationSlow, durationNormal } = motionTokens;

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  enter: { duration: durationSlow, easing: curveEasyEaseMax },
  exit: { duration: durationNormal, easing: curveEasyEaseMax },
});

export const Custom = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(false);
  const [unmountOnExit, setUnmountOnExit] = React.useState(false);

  return (
    <>
      <Checkbox label="visible" checked={visible} onChange={() => setVisible(v => !v)} />
      <Checkbox label="animateOpacity" checked={animateOpacity} onChange={() => setAnimateOpacity(v => !v)} />
      <Checkbox label="unmountOnExit" checked={unmountOnExit} onChange={() => setUnmountOnExit(v => !v)} />

      <CustomCollapseVariant visible={visible} animateOpacity={animateOpacity} unmountOnExit={unmountOnExit}>
        <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
      </CustomCollapseVariant>
    </>
  );
};

Custom.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
