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

import description from './MotionSlotDefault.stories.md';

// 1. Create a default motion component — a looping pulse animation
const PulseMotion = createMotionComponent({
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0.6, transform: 'scale(0.95)' },
    { opacity: 1, transform: 'scale(1)' },
  ],
  duration: motionTokens.durationUltraSlow,
  iterations: Infinity,
});

// 2. Define the component's slot types
type PulseIndicatorSlots = {
  root: NonNullable<Slot<'div'>>;
  pulseMotion?: Slot<MotionSlotProps>;
};

type PulseIndicatorProps = ComponentProps<PulseIndicatorSlots>;
type PulseIndicatorState = ComponentState<PulseIndicatorSlots>;

// 3. Build component state with motionSlot()
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

// 4. Render the component using the slot
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
    gridTemplate: `"card" / 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
  },
  indicator: {
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '50%',
    width: '80px',
    height: '80px',
  },
});

export const MotionSlotDefault = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <PulseIndicator>
          <div className={classes.indicator} />
        </PulseIndicator>
      </div>
    </div>
  );
};

MotionSlotDefault.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
