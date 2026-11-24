import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Card, Text, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import {
  createChoreographyPresenceComponent,
  fadeIn,
  fadeOut,
  layer,
  scaleIn,
  scaleOut,
  sequence,
  slideIn,
  slideOut,
  stagger,
} from '@fluentui/react-motion-components-preview';
import SequencePresenceDescription from './SequencePresence.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalL,
  },
  panel: {
    width: '320px',
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  row: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const SequencedPanel = createChoreographyPresenceComponent({
  enter: sequence(
    [
      [
        fadeIn({ duration: motionTokens.durationFast }),
        scaleIn({ from: 0.96, duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMid }),
      ],
      stagger(
        [
          layer('[data-row]', [
            fadeIn({ duration: motionTokens.durationFast }),
            slideIn({
              from: { y: '10px' },
              duration: motionTokens.durationNormal,
              easing: motionTokens.curveDecelerateMid,
            }),
          ]),
        ],
        { startInterval: 50 },
      ),
    ],
    { gap: -100 },
  ),
  exit: sequence(
    [
      stagger(
        [
          layer('[data-row]', [
            fadeOut({ duration: motionTokens.durationFaster }),
            slideOut({
              to: { y: '10px' },
              duration: motionTokens.durationFast,
              easing: motionTokens.curveAccelerateMid,
            }),
          ]),
        ],
        { startInterval: 40, order: 'reverse' },
      ),
      [
        fadeOut({ duration: motionTokens.durationFast }),
        scaleOut({ to: 0.96, duration: motionTokens.durationFast, easing: motionTokens.curveAccelerateMid }),
      ],
    ],
    { gap: -40 },
  ),
});

export const Presence = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.container}>
      <Button appearance="primary" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide Panel' : 'Show Panel'}
      </Button>

      <SequencedPanel visible={visible}>
        <Card className={classes.panel}>
          <Text weight="semibold" size={400}>
            Notifications
          </Text>
          {['Design review at 2:00 PM', 'PR #37201 ready for review', 'Build succeeded'].map(label => (
            <div key={label} className={classes.row} data-row="">
              <Text size={300}>{label}</Text>
            </div>
          ))}
        </Card>
      </SequencedPanel>
    </div>
  );
};

Presence.parameters = {
  docs: {
    description: {
      story: SequencePresenceDescription,
    },
  },
};
