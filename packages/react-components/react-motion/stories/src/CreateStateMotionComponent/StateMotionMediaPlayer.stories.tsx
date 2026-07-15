import {
  Button,
  createStateMotionComponent,
  createStateMotionController,
  makeStyles,
  motionTokens,
  tokens,
  useStateMotion,
  type JSXElement,
  type StateMotionMachineDefinition,
  type StateMotionSkin,
  type StateMotionTransitionMotion,
} from '@fluentui/react-components';
import * as React from 'react';

type PlayerState = 'stopped' | 'playing' | 'paused';
type PlayerEvent = { type: 'PLAY' } | { type: 'PAUSE' } | { type: 'STOP' };
type PlayerTransition = 'startPlayback' | 'pausePlayback' | 'resumePlayback' | 'stopFromPlaying' | 'stopFromPaused';

const playerMachine: StateMotionMachineDefinition<PlayerState, PlayerEvent, PlayerTransition> = {
  initialState: 'stopped',
  states: {
    stopped: {
      on: { PLAY: { id: 'startPlayback', target: 'playing' } },
    },
    playing: {
      on: {
        PAUSE: { id: 'pausePlayback', target: 'paused' },
        STOP: { id: 'stopFromPlaying', target: 'stopped' },
      },
    },
    paused: {
      on: {
        PLAY: { id: 'resumePlayback', target: 'playing' },
        STOP: { id: 'stopFromPaused', target: 'stopped' },
      },
    },
  },
};

const stopMotion: StateMotionTransitionMotion = {
  keyframes: [
    { state: 'current' },
    {
      offset: 0.72,
      opacity: 0.5,
      transform: `translateX(${tokens.spacingHorizontalS}) scale(0.88)`,
    },
    { state: 'target' },
  ],
  duration: motionTokens.durationNormal,
  easing: motionTokens.curveAccelerateMid,
};

const playerSkin = {
  states: {
    stopped: { opacity: 0.6, transform: 'translateX(0) scale(0.9)' },
    playing: { opacity: 1, transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1)` },
    paused: { opacity: 0.8, transform: `translateX(${tokens.spacingHorizontalL}) scale(0.95)` },
  },
  transitions: {
    startPlayback: {
      keyframes: [
        { state: 'current' },
        {
          offset: 0.7,
          opacity: 1,
          transform: `translateX(calc(${tokens.spacingHorizontalXXL} + ${tokens.spacingHorizontalS})) scale(1.06)`,
        },
        { state: 'target' },
      ],
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveDecelerateMid,
    },
    pausePlayback: {
      keyframes: [
        { state: 'current' },
        {
          offset: 0.45,
          opacity: 0.65,
          transform: `translateX(${tokens.spacingHorizontalL}) scale(0.9)`,
        },
        { state: 'target' },
      ],
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveAccelerateMid,
    },
    resumePlayback: {
      keyframes: [
        { state: 'current' },
        {
          offset: 0.65,
          opacity: 1,
          transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1.04)`,
        },
        { state: 'target' },
      ],
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMid,
    },
    stopFromPlaying: stopMotion,
    stopFromPaused: stopMotion,
  },
} satisfies StateMotionSkin<PlayerState, PlayerTransition>;

const PlayerMotion = createStateMotionComponent(playerMachine, playerSkin);

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: tokens.spacingVerticalM },
  controls: { display: 'flex', gap: tokens.spacingHorizontalS },
  target: {
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteBerryBackground2,
  },
});

export const StateMotionMediaPlayer = (): JSXElement => {
  const classes = useStyles();
  const [controller] = React.useState(() => createStateMotionController(playerMachine));
  const snapshot = useStateMotion(controller);

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button disabled={snapshot.state === 'playing'} onClick={() => controller.send({ type: 'PLAY' })}>
          Play
        </Button>
        <Button disabled={snapshot.state !== 'playing'} onClick={() => controller.send({ type: 'PAUSE' })}>
          Pause
        </Button>
        <Button disabled={snapshot.state === 'stopped'} onClick={() => controller.send({ type: 'STOP' })}>
          Stop
        </Button>
      </div>
      <div>Logical state: {snapshot.state}</div>
      <PlayerMotion controller={controller}>
        <div className={classes.target} aria-label={`Player is ${snapshot.state}`} />
      </PlayerMotion>
    </div>
  );
};
