import {
  Button,
  createStateMotionComponent,
  createStateMotionController,
  makeStyles,
  motionTokens,
  tokens,
  useStateMotion,
  type JSXElement,
  type StateMotionDefinition,
} from '@fluentui/react-components';
import * as React from 'react';

type PresenceState = 'absent' | 'present';
type PresenceEvent = { type: 'SHOW' } | { type: 'HIDE' };

const presenceDefinition: StateMotionDefinition<PresenceState, PresenceEvent> = {
  initialState: 'absent',
  states: {
    absent: {
      keyframe: { opacity: 0, transform: 'scale(0.96)' },
      on: {
        SHOW: {
          target: 'present',
          motion: {
            keyframes: [
              { opacity: 0, transform: 'scale(0.96)' },
              { opacity: 1, transform: 'scale(1)' },
            ],
            duration: motionTokens.durationSlow,
            easing: motionTokens.curveDecelerateMid,
          },
        },
      },
    },
    present: {
      keyframe: { opacity: 1, transform: 'scale(1)' },
      on: {
        HIDE: {
          target: 'absent',
          motion: {
            keyframes: [
              { opacity: 1, transform: 'scale(1)' },
              { opacity: 0, transform: 'scale(0.96)' },
            ],
            duration: motionTokens.durationFast,
            easing: motionTokens.curveAccelerateMid,
          },
        },
      },
    },
  },
};

const PresenceMotion = createStateMotionComponent(presenceDefinition);

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: tokens.spacingVerticalM },
  target: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

export const StateMotionPresence = (): JSXElement => {
  const classes = useStyles();
  const [controller] = React.useState(() => createStateMotionController(presenceDefinition));
  const snapshot = useStateMotion(controller);
  const isPresent = snapshot.state === 'present';

  return (
    <div className={classes.root}>
      <Button onClick={() => controller.send({ type: isPresent ? 'HIDE' : 'SHOW' })}>
        {isPresent ? 'Hide' : 'Show'}
      </Button>
      <div>Logical state: {snapshot.state}</div>
      <PresenceMotion controller={controller}>
        <div className={classes.target} aria-hidden={!isPresent}>
          Presence is a two-state motion graph
        </div>
      </PresenceMotion>
    </div>
  );
};
