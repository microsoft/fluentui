import {
  createMotionComponent,
  createMotionComponentVariant,
  Field,
  makeStyles,
  mergeClasses,
  Slider,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"cards cards" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    gridArea: 'cards',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
    minHeight: '200px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  },
  cardTitle: {
    marginBottom: '50px',
    fontWeight: tokens.fontWeightSemibold,
  },
});

const springPulse = `linear(0.000 0.000%, 0.1361 1.000%, 0.2721 2.000%, 0.4082 3.000%, 0.5442 4.000%, 0.6803 5.000%, 0.8163 6.000%, 0.9524 7.000%, 1.086 8.000%, 1.205 9.000%, 1.309 10.00%, 1.397 11.00%, 1.469 12.00%, 1.525 13.00%, 1.565 14.00%, 1.591 15.00%, 1.602 16.00%, 1.600 17.00%, 1.586 18.00%, 1.562 19.00%, 1.529 20.00%, 1.489 21.00%, 1.443 22.00%, 1.392 23.00%, 1.339 24.00%, 1.284 25.00%, 1.228 26.00%, 1.173 27.00%, 1.120 28.00%, 1.070 29.00%, 1.023 30.00%, 0.9795 31.00%, 0.9410 32.00%, 0.9072 33.00%, 0.8785 34.00%, 0.8549 35.00%, 0.8364 36.00%, 0.8229 37.00%, 0.8142 38.00%, 0.8100 39.00%, 0.8100 40.00%, 0.8137 41.00%, 0.8208 42.00%, 0.8308 43.00%, 0.8431 44.00%, 0.8575 45.00%, 0.8732 46.00%, 0.8900 47.00%, 0.9074 48.00%, 0.9250 49.00%, 0.9424 50.00%, 0.9593 51.00%, 0.9754 52.00%, 0.9905 53.00%, 1.004 54.00%, 1.017 55.00%, 1.028 56.00%, 1.037 57.00%, 1.045 58.00%, 1.051 59.00%, 1.055 60.00%, 1.058 61.00%, 1.060 62.00%, 1.060 63.00%, 1.059 64.00%, 1.057 65.00%, 1.054 66.00%, 1.050 67.00%, 1.046 68.00%, 1.041 69.00%, 1.036 70.00%, 1.030 71.00%, 1.025 72.00%, 1.019 73.00%, 1.014 74.00%, 1.009 75.00%, 1.004 76.00%, 0.9993 77.00%, 0.9953 78.00%, 0.9918 79.00%, 0.9887 80.00%, 0.9862 81.00%, 0.9842 82.00%, 0.9827 83.00%, 0.9817 84.00%, 0.9811 85.00%, 0.9810 86.00%, 0.9812 87.00%, 0.9818 88.00%, 0.9827 89.00%, 0.9839 90.00%, 0.9853 91.00%, 0.9868 92.00%, 0.9884 93.00%, 0.9902 94.00%, 0.9919 95.00%, 0.9937 96.00%, 0.9954 97.00%, 0.9970 98.00%, 0.9986 99.00%, 1.000 100.0%)`;

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

export const CreateMotionComponentVariantDefault = (): JSXElement => {
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

      <div className={classes.controls}>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>TODO</code>: [some quantity]
              </>
            ),
            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider aria-valuetext={`TODO`} value={0} onChange={(ev, data) => null} min={0} max={100} step={5} />
        </Field>
      </div>
    </div>
  );
};
