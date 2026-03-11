import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Card,
  CardHeader,
  createPresenceComponent,
  Field,
  makeStyles,
  motionTokens,
  Switch,
  Text,
} from '@fluentui/react-components';
import { fadeAtom, scaleAtom } from '@fluentui/react-motion-components-preview';

import description from './ScaleODSP.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

/*
New Scale variant specced by Jeremy Frye (2026-03-11)
Enter spec: https://app.motionspec.io/dev/vrdKN4SASSGjMZDAR7aS
Exit spec:  https://app.motionspec.io/dev/rdFT2tJlwwwgrpbfkUxb

ENTER timeline (300ms total)

       0ms  50   100  150  200  250  300ms
       ├────┼────┼────┼────┼────┼────┤
Scale  ██████████████████████████████  (0 → 300ms, curveDecelerateMin)
Fade   ██████████····················  (0 → 100ms, curveLinear)
       ↑         ↑
      0ms       100ms


EXIT timeline (300ms total)

       0ms  50   100  150  200  250  300ms
       ├────┼────┼────┼────┼────┼────┤
Scale  ██████████████████████████████  (0 → 300ms, curveAccelerateMid)
Fade   ····················██████████  (200 → 300ms, curveLinear)
                           ↑         ↑
                          200ms      300ms
*/

const scaleODSPAtoms = {
  enter: [
    scaleAtom({
      direction: 'enter',
      outScale: 0.95,
      duration: motionTokens.durationSlow, // 300 ms scale up
      easing: motionTokens.curveDecelerateMin,
    }),
    fadeAtom({
      direction: 'enter',
      duration: motionTokens.durationFaster, // 100 ms fade in
      easing: motionTokens.curveLinear,
    }),
  ],

  exit: [
    scaleAtom({
      direction: 'exit',
      outScale: 0.85,
      duration: motionTokens.durationSlow, // 300 ms scale down
      easing: motionTokens.curveAccelerateMid,
    }),
    fadeAtom({
      direction: 'exit',
      delay: motionTokens.durationNormal, // 200 ms delay
      duration: motionTokens.durationFaster, // 100 ms fade out
      easing: motionTokens.curveLinear,
    }),
  ],
};

/** A React component that applies the ODSP-specific scale in/out transitions to its children. */
const ScaleODSP = createPresenceComponent(scaleODSPAtoms);

export const ODSP = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <Card className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </Card>

      <ScaleODSP visible={visible}>
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" style={{ margin: 0 }} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          <LoremIpsum />
        </Card>
      </ScaleODSP>
    </div>
  );
};

ODSP.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
