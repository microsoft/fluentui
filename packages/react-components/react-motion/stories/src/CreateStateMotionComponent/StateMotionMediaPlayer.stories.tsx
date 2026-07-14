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

type PlayerState = 'stopped' | 'playing' | 'paused';
type PlayerEvent = { type: 'PLAY' } | { type: 'PAUSE' } | { type: 'STOP' };

const playerDefinition: StateMotionDefinition<PlayerState, PlayerEvent> = {
  initialState: 'stopped',
  states: {
    stopped: {
      keyframe: { opacity: 0.6, transform: 'translateX(0) scale(0.9)' },
      on: { PLAY: { target: 'playing' } },
    },
    playing: {
      keyframe: { opacity: 1, transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1)` },
      on: { PAUSE: { target: 'paused' }, STOP: { target: 'stopped' } },
    },
    paused: {
      keyframe: { opacity: 0.8, transform: `translateX(${tokens.spacingHorizontalL}) scale(0.95)` },
      on: { PLAY: { target: 'playing' }, STOP: { target: 'stopped' } },
    },
  },
};

const PlayerMotion = createStateMotionComponent(playerDefinition);

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: tokens.spacingVerticalM },
  controls: { display: 'flex', gap: tokens.spacingHorizontalS },
  target: {
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteBerryBackground2,
    transitionDuration: `${motionTokens.durationNormal}ms`,
  },
});

export const StateMotionMediaPlayer = (): JSXElement => {
  const classes = useStyles();
  const [controller] = React.useState(() => createStateMotionController(playerDefinition));
  const snapshot = useStateMotion(controller);

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button onClick={() => controller.send({ type: 'PLAY' })}>Play</Button>
        <Button onClick={() => controller.send({ type: 'PAUSE' })}>Pause</Button>
        <Button onClick={() => controller.send({ type: 'STOP' })}>Stop</Button>
      </div>
      <div>Logical state: {snapshot.state}</div>
      <PlayerMotion controller={controller}>
        <div className={classes.target} aria-label={`Player is ${snapshot.state}`} />
      </PlayerMotion>
    </div>
  );
};
