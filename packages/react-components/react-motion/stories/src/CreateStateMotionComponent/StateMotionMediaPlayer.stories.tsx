import {
  Button,
  createStateMotionComponent,
  createStateMotionController,
  makeStyles,
  motionTokens,
  tokens,
  useStateMotion,
  type JSXElement,
  type StateMotionAnimation,
  type StateMotionMachineDefinition,
  type StateMotionSkin,
} from '@fluentui/react-components';
import * as React from 'react';

type PlayerState =
  | 'stopped'
  | 'startingPlayback'
  | 'playing'
  | 'pausingPlayback'
  | 'paused'
  | 'resumingPlayback'
  | 'stoppingFromPlaying'
  | 'stoppingFromPaused';
type PlayerEvent = { type: 'PLAY' } | { type: 'PAUSE' } | { type: 'STOP' };
type PlayerAnimation = 'startPlayback' | 'pausePlayback' | 'resumePlayback' | 'stopFromPlaying' | 'stopFromPaused';

const playerMachine: StateMotionMachineDefinition<PlayerState, PlayerEvent, PlayerAnimation> = {
  initialState: 'stopped',
  states: {
    stopped: {
      on: { PLAY: { target: 'startingPlayback' } },
    },
    startingPlayback: {
      animation: { id: 'startPlayback', target: 'playing' },
      on: { STOP: { target: 'stoppingFromPlaying' } },
    },
    playing: {
      on: {
        PAUSE: { target: 'pausingPlayback' },
        STOP: { target: 'stoppingFromPlaying' },
      },
    },
    pausingPlayback: {
      animation: { id: 'pausePlayback', target: 'paused' },
      on: { PLAY: { target: 'resumingPlayback' }, STOP: { target: 'stoppingFromPlaying' } },
    },
    paused: {
      on: {
        PLAY: { target: 'resumingPlayback' },
        STOP: { target: 'stoppingFromPaused' },
      },
    },
    resumingPlayback: {
      animation: { id: 'resumePlayback', target: 'playing' },
      on: { PAUSE: { target: 'pausingPlayback' }, STOP: { target: 'stoppingFromPlaying' } },
    },
    stoppingFromPlaying: { animation: { id: 'stopFromPlaying', target: 'stopped' } },
    stoppingFromPaused: { animation: { id: 'stopFromPaused', target: 'stopped' } },
  },
};

const stopMotion: StateMotionAnimation = {
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
    startingPlayback: { opacity: 1, transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1)` },
    playing: { opacity: 1, transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1)` },
    pausingPlayback: { opacity: 0.8, transform: `translateX(${tokens.spacingHorizontalL}) scale(0.95)` },
    paused: { opacity: 0.8, transform: `translateX(${tokens.spacingHorizontalL}) scale(0.95)` },
    resumingPlayback: { opacity: 1, transform: `translateX(${tokens.spacingHorizontalXXL}) scale(1)` },
    stoppingFromPlaying: { opacity: 0.6, transform: 'translateX(0) scale(0.9)' },
    stoppingFromPaused: { opacity: 0.6, transform: 'translateX(0) scale(0.9)' },
  },
  animations: {
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
} satisfies StateMotionSkin<PlayerState, PlayerAnimation>;

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
  const availableEvents = playerMachine.states[snapshot.state].on;

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button disabled={!availableEvents?.PLAY} onClick={() => controller.send({ type: 'PLAY' })}>
          Play
        </Button>
        <Button disabled={!availableEvents?.PAUSE} onClick={() => controller.send({ type: 'PAUSE' })}>
          Pause
        </Button>
        <Button disabled={!availableEvents?.STOP} onClick={() => controller.send({ type: 'STOP' })}>
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
