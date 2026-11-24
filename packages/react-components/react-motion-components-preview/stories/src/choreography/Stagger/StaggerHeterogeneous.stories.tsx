import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Card, Field, Text, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import {
  createChoreographyPresenceComponent,
  fadeIn,
  fadeOut,
  layer,
  scaleIn,
  scaleOut,
  slideIn,
  slideOut,
  stagger,
} from '@fluentui/react-motion-components-preview';
import StaggerHeterogeneousDescription from './StaggerHeterogeneous.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: tokens.spacingHorizontalM,
  },
  card: {
    width: '340px',
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  media: {
    height: '120px',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorBrandForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
  },
});

const CardChoreography = createChoreographyPresenceComponent({
  enter: stagger(
    [
      layer('[data-part="media"]', [
        fadeIn({ duration: motionTokens.durationNormal }),
        scaleIn({ from: 0.94, duration: motionTokens.durationSlow, easing: motionTokens.curveDecelerateMid }),
      ]),
      layer('[data-part="title"]', [
        fadeIn({ duration: motionTokens.durationNormal }),
        slideIn({
          from: { y: '10px' },
          duration: motionTokens.durationNormal,
          easing: motionTokens.curveDecelerateMid,
        }),
      ]),
      layer('[data-part="copy"]', fadeIn({ duration: motionTokens.durationNormal })),
      layer(
        '[data-part="actions"]',
        [
          fadeIn({ duration: motionTokens.durationNormal }),
          slideIn({
            from: { y: '12px' },
            duration: motionTokens.durationNormal,
            easing: motionTokens.curveDecelerateMid,
          }),
        ],
        { delay: 40 },
      ),
    ],
    { startInterval: 60 },
  ),
  exit: stagger(
    [
      layer('[data-part="media"]', [
        fadeOut({ duration: motionTokens.durationFast }),
        scaleOut({ to: 0.94, duration: motionTokens.durationFast, easing: motionTokens.curveAccelerateMid }),
      ]),
      layer('[data-part="title"]', fadeOut({ duration: motionTokens.durationFast })),
      layer('[data-part="copy"]', fadeOut({ duration: motionTokens.durationFast })),
      layer('[data-part="actions"]', [
        fadeOut({ duration: motionTokens.durationFast }),
        slideOut({ to: { y: '12px' }, duration: motionTokens.durationFast, easing: motionTokens.curveAccelerateMid }),
      ]),
    ],
    { startInterval: 40, order: 'reverse' },
  ),
});

export const Heterogeneous = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <CardChoreography visible={visible}>
        <Card className={classes.card}>
          <div className={classes.media} data-part="media">
            Media Preview
          </div>
          <div className={classes.body}>
            <Text as="h3" size={500} weight="semibold" data-part="title">
              Heterogeneous POJO Stagger
            </Text>
            <Text size={300} data-part="copy">
              Non-sibling elements in the DOM animate with different motions and additive layer delays under one
              presence component.
            </Text>
            <div className={classes.actions} data-part="actions">
              <Button appearance="primary" size="small">
                Open
              </Button>
              <Button appearance="secondary" size="small">
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
      </CardChoreography>
    </div>
  );
};

Heterogeneous.parameters = {
  docs: {
    description: {
      story: StaggerHeterogeneousDescription,
    },
  },
};
