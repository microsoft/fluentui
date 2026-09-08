/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import {
  assertSlots,
  createMotionComponent,
  makeStyles,
  motionSlot,
  motionTokens,
  slot,
  tokens,
} from '@fluentui/react-components';
import type { ComponentProps, ComponentState, JSXElement, MotionSlotProps, Slot } from '@fluentui/react-components';
import * as React from 'react';

import description from './MotionSlotDisable.stories.md';

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
    root: slot.always(rootProps, { elementType: 'div' }),
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

// --- Story ---

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" / 1fr 1fr`,
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
  },
  indicator: {
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '50%',
    width: '80px',
    height: '80px',
  },
});

export const MotionSlotDisable = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <PulseIndicator>
          <div className={classes.indicator} />
        </PulseIndicator>
        <span className={classes.label}>Default (pulsing)</span>
      </div>
      <div className={classes.card}>
        {/* Passing null disables the pulse animation */}
        <PulseIndicator pulseMotion={null}>
          <div className={classes.indicator} />
        </PulseIndicator>
        <span className={classes.label}>Disabled (pulseMotion=null)</span>
      </div>
    </div>
  );
};

MotionSlotDisable.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
