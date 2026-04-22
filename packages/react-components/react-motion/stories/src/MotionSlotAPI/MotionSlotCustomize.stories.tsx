/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import {
  assertSlots,
  createMotionComponent,
  makeStyles,
  motionSlot,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import type { ComponentProps, ComponentState, JSXElement, MotionSlotProps, Slot } from '@fluentui/react-components';
import * as React from 'react';

import description from './MotionSlotCustomize.stories.md';

// A params-typed pulse: consumers can pass `{ duration, iterations }` directly on the slot.
type PulseParams = {
  duration?: number;
  iterations?: number;
};

const PulseMotion = createMotionComponent<PulseParams>(
  ({ duration = motionTokens.durationUltraSlow, iterations = Infinity }) => ({
    keyframes: [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0.6, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    duration,
    iterations,
  }),
);

type PulseIndicatorSlots = {
  root: NonNullable<Slot<'div'>>;
  pulseMotion?: Slot<MotionSlotProps<PulseParams>>;
};

type PulseIndicatorProps = ComponentProps<PulseIndicatorSlots>;
type PulseIndicatorState = ComponentState<PulseIndicatorSlots>;

const usePulseIndicator = (props: PulseIndicatorProps): PulseIndicatorState => {
  const { pulseMotion: pulseMotionProp, ...rootProps } = props;

  return {
    components: {
      root: 'div',
      pulseMotion: PulseMotion,
    },
    root: rootProps as PulseIndicatorState['root'],
    pulseMotion: motionSlot(pulseMotionProp, {
      elementType: PulseMotion,
      defaultProps: {},
    }),
  };
};

const renderPulseIndicator = (state: PulseIndicatorState): JSXElement => {
  assertSlots<PulseIndicatorSlots>(state);

  return (
    <state.root>
      {state.pulseMotion && (
        <state.pulseMotion>
          <div>{state.root.children}</div>
        </state.pulseMotion>
      )}
    </state.root>
  );
};

const PulseIndicator: React.FC<PulseIndicatorProps> = props => {
  const state = usePulseIndicator(props);

  return renderPulseIndicator(state);
};

// A completely different motion for the render-fn card to swap in
const SpinMotion = createMotionComponent({
  keyframes: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  duration: motionTokens.durationUltraSlow,
  iterations: Infinity,
});

// --- Story ---

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card card" / 1fr 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
  },
  label: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    textAlign: 'center',
  },
  indicator: {
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: '24px',
  },
});

export const MotionSlotCustomize = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <PulseIndicator>
          <div className={classes.indicator} />
        </PulseIndicator>
        <span className={classes.label}>Default (pulse)</span>
      </div>

      <div className={classes.card}>
        {/* Tune the existing motion by passing params directly on the slot */}
        <PulseIndicator pulseMotion={{ duration: motionTokens.durationFast }}>
          <div className={classes.indicator} />
        </PulseIndicator>
        <span className={classes.label}>
          Direct params
          <br />
          <code>{'{ duration: 100 }'}</code>
        </span>
      </div>

      <div className={classes.card}>
        {/* Replace the motion entirely with a render function */}
        <PulseIndicator
          pulseMotion={{
            children: (_, props) => <SpinMotion {...props}>{props.children}</SpinMotion>,
          }}
        >
          <div className={classes.indicator}>&uarr;</div>
        </PulseIndicator>
        <span className={classes.label}>
          Render function
          <br />
          (swap in spin)
        </span>
      </div>
    </div>
  );
};

MotionSlotCustomize.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
