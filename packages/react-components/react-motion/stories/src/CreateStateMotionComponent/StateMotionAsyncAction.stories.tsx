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

type ActionState = 'idle' | 'submitting' | 'success' | 'error';
type ActionEvent = { type: 'SUBMIT' } | { type: 'RESOLVE' } | { type: 'REJECT'; severity: number } | { type: 'RESET' };

const actionDefinition: StateMotionDefinition<ActionState, ActionEvent> = {
  initialState: 'idle',
  states: {
    idle: {
      keyframe: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
      on: { SUBMIT: { target: 'submitting' } },
    },
    submitting: {
      keyframe: { opacity: 0.7, transform: `translateY(calc(-1 * ${tokens.spacingVerticalS})) rotate(4deg)` },
      on: {
        RESOLVE: { target: 'success' },
        REJECT: {
          target: 'error',
          motion: ({ event, source, target }) => ({
            keyframes: [
              source.keyframe,
              { transform: `translateX(calc(-1 * ${tokens.spacingHorizontalM}))` },
              { transform: `translateX(${tokens.spacingHorizontalM})` },
              target.keyframe,
            ],
            duration: motionTokens.durationFast + event.severity * 25,
          }),
        },
      },
    },
    success: {
      keyframe: { opacity: 1, transform: 'translateY(0) scale(1.08)' },
      on: { RESET: { target: 'idle' } },
    },
    error: {
      keyframe: { opacity: 1, transform: 'translateY(0) scale(0.94)' },
      on: { RESET: { target: 'idle' }, SUBMIT: { target: 'submitting' } },
    },
  },
};

const ActionMotion = createStateMotionComponent(actionDefinition);

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: tokens.spacingVerticalM },
  controls: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  target: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

export const StateMotionAsyncAction = (): JSXElement => {
  const classes = useStyles();
  const [controller] = React.useState(() => createStateMotionController(actionDefinition));
  const snapshot = useStateMotion(controller);

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button onClick={() => controller.send({ type: 'SUBMIT' })}>Submit</Button>
        <Button onClick={() => controller.send({ type: 'RESOLVE' })}>Resolve</Button>
        <Button onClick={() => controller.send({ type: 'REJECT', severity: 6 })}>Reject</Button>
        <Button onClick={() => controller.send({ type: 'RESET' })}>Reset</Button>
      </div>
      <div>
        State: {snapshot.state}; last animated event: {snapshot.animation?.event.type ?? 'none'}
      </div>
      <ActionMotion controller={controller}>
        <div className={classes.target}>Async action</div>
      </ActionMotion>
    </div>
  );
};
