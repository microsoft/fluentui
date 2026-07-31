import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { motionTokens, createMotionComponent } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

import styles from './StaggerSpinners.module.css';

const useClasses = () => styles;

// Motion components for stagger spinners
// NOTE: the delay prop needs to be explicitly defined for each custom motion component

const OrbitRotateMotion = createMotionComponent<{ duration?: number; easing?: string; delay?: number }>(
  ({ duration = motionTokens.durationUltraSlow * 8, easing = motionTokens.curveEasyEase, delay = 0 }) => {
    const finalOffset = 0.8;
    const finalAngle = '740deg';
    return [
      // rotation atom
      {
        keyframes: [
          { offset: 0, rotate: '0deg', easing },
          { offset: finalOffset, rotate: finalAngle },
          { offset: 1, rotate: finalAngle },
        ],
        duration,
        delay,
        iterations: Infinity,
      },
      // opacity atom
      {
        keyframes: [
          { offset: 0, opacity: 0, easing: motionTokens.curveEasyEase },
          { offset: 0.4, opacity: 1, easing: motionTokens.curveEasyEase },
          { offset: finalOffset, opacity: 0 },
          { offset: 1, opacity: 0 },
        ],
        duration,
        delay,
        fill: 'both',
        iterations: Infinity,
      },
    ];
  },
);

const BarsScaleMotion = createMotionComponent<{ duration?: number; easing?: string; delay?: number }>(
  ({ duration = motionTokens.durationUltraSlow * 2, easing = motionTokens.curveEasyEase, delay = 0 }) => [
    {
      keyframes: [{ scale: '1 0.25', easing }, { scale: '1 1', easing }, { scale: '1 0.25' }],
      duration,
      delay,
      fill: 'both',
      iterations: Infinity,
    },
    // opacity atom oscillating at a different rate
    {
      keyframes: [
        { offset: 0, opacity: 1, easing: motionTokens.curveAccelerateMin },
        { offset: 0.15, opacity: 0.5 },
        { offset: 0.4, opacity: 0.5, easing: motionTokens.curveDecelerateMin },
        { offset: 0.6, opacity: 1 },
      ],
      duration: duration * 3,
      delay,
      fill: 'both',
      iterations: Infinity,
    },
  ],
);

const ArcsSpinMotion = createMotionComponent<{ duration?: number; spins?: number; delay?: number }>(
  ({ duration = 4000, spins = 2, delay = 0 }) => [
    {
      keyframes: [
        { offset: 0, easing: motionTokens.curveEasyEase },
        { offset: 0.2, rotate: `-60deg`, easing: motionTokens.curveEasyEase },
        { offset: 0.9, rotate: `${360 * spins}deg` },
        { offset: 1, rotate: `${360 * spins}deg` },
      ],
      duration,
      delay,
      iterations: Infinity,
    },
  ],
);

const BlocksSlideMotion = createMotionComponent<{ delay?: number }>(({ delay = 0 }) => [
  // horizontal slide atom
  {
    keyframes: [
      { offset: 0, translate: '0px', easing: motionTokens.curveEasyEase },
      { offset: 0.5, translate: '-30px', easing: motionTokens.curveEasyEaseMax },
      { offset: 0.85, translate: '0px' },
      { offset: 1, translate: '0px' },
    ],
    duration: 2000,
    delay,
    iterations: Infinity,
  },
  // opacity atom
  {
    keyframes: [
      { offset: 0.5, opacity: 0.5, easing: motionTokens.curveEasyEaseMax },
      { offset: 0.65, opacity: 0.5 },
      { offset: 0.66, opacity: 1 },
    ],
    duration: 2000,
    delay,
    iterations: Infinity,
  },
]);

export const StaggerSpinners = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.spinnerGrid}>
        {/* Orbit Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Orbit</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.dotOrbitSpinner}>
              <Stagger.In itemDelay={motionTokens.durationFaster}>
                {Array.from({ length: 6 }, (_, i) => (
                  <OrbitRotateMotion key={i}>
                    <div className={classes.orbitDot} data-index={i} />
                  </OrbitRotateMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Bars Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Bars</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.growingBarsSpinner}>
              <Stagger.In itemDelay={motionTokens.durationUltraFast * 2}>
                {Array.from({ length: 7 }, (_, i) => (
                  <BarsScaleMotion key={i}>
                    <div className={classes.growingBar} />
                  </BarsScaleMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Arcs Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Arcs</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.arcSpinner}>
              <Stagger.In itemDelay={80}>
                <ArcsSpinMotion key="1">
                  <div className={`${classes.arc} ${classes.arc3}`} />
                </ArcsSpinMotion>
                <ArcsSpinMotion key="2">
                  <div className={`${classes.arc} ${classes.arc2}`} />
                </ArcsSpinMotion>
                <ArcsSpinMotion key="3">
                  <div className={`${classes.arc} ${classes.arc1}`} />
                </ArcsSpinMotion>
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Blocks Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Blocks</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.slidingBlocksSpinner}>
              <Stagger.In itemDelay={motionTokens.durationFaster}>
                {Array.from({ length: 5 }, (_, i) => (
                  <BlocksSlideMotion key={i}>
                    <div className={classes.slidingBlock} />
                  </BlocksSlideMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
