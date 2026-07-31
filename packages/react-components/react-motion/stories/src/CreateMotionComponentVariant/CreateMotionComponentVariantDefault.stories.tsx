import { createMotionComponent, createMotionComponentVariant } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, MotionComponentProps } from '@fluentui/react-components';

import styles from './CreateMotionComponentVariantDefault.module.css';

const useClasses = () => styles;

const springPulse = `linear(0 0.000%, 1.086 8.000%, 1.397 11.000%, 1.565 14.000%, 1.6 17.000%, 1.489 21.000%, 1.023 30.000%, 0.8785 34.000%, 0.81 39.000%, 0.8732 46.000%, 1.028 56.000%, 1.057 65.000%, 0.9827 83.000%, 1 100.000%)
`;

// Base motion component with configurable parameters
const PulseMotion = createMotionComponent<{ duration?: number; fromScale?: number }>(
  ({ duration = 1000, fromScale = 0.8 }) => ({
    keyframes: [{ scale: fromScale }, { scale: 1 }],
    duration,
    easing: springPulse,
    iterations: Infinity,
    direction: 'alternate',
  }),
);

// Slow variant with different defaults
const PulseMotionVariant = createMotionComponentVariant(PulseMotion, {
  duration: 2000,
});

export const CreateMotionComponentVariantDefault = (props: MotionComponentProps): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <div className={classes.card}>
          <div className={classes.cardTitle}>
            <span>PulseMotion</span>
            <br />
            <span>{`duration: 1000`}</span>
          </div>
          <PulseMotion>
            <div className={classes.item} />
          </PulseMotion>
        </div>

        <div className={classes.card}>
          <div className={classes.cardTitle}>{`createMotionComponentVariant(PulseMotion, { duration: 2000 })`}</div>
          <PulseMotionVariant>
            <div className={classes.item} />
          </PulseMotionVariant>
        </div>
      </div>
    </div>
  );
};
