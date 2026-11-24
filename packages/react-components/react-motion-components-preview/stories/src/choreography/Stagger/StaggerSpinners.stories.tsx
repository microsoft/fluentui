import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, motionTokens } from '@fluentui/react-components';
import { createStaggerComponent } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  spinnerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  spinnerTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '120px',
    padding: tokens.spacingHorizontalL,
  },

  // Grid to arrange spinner sections responsively
  // Use 1 column by default and switch to 2 columns at a reasonable breakpoint
  spinnerGrid: {
    display: 'grid',
    gap: tokens.spacingHorizontalL,
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    '@media (min-width: 640px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },

  // Circular spinners
  arcSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  arc: {
    position: 'absolute',
    borderRadius: '50%',
    borderTopColor: tokens.colorBrandBackground,
    borderBottomColor: tokens.colorBrandBackground,
  },
  arc1: {
    width: '60px',
    height: '60px',
    border: '4px solid transparent',
  },
  arc2: {
    width: '45px',
    height: '45px',
    border: '4px solid transparent',
    borderTopColor: tokens.colorBrandBackground,
  },
  arc3: {
    width: '30px',
    height: '30px',
    border: '4px solid transparent',
    borderTopColor: tokens.colorBrandBackground,
  },

  dotOrbitSpinner: {
    position: 'relative',
    width: '120px', // adjusted to be consistent with other spinners
    height: '120px',
    display: 'inline-block',
  },
  orbitDot: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
    // place dot at center then push it outwards on the X axis to set orbit radius
    // translate(-50%, -50%) keeps the dot centered on its own center
    transform: 'translate(-50%, -50%) translateY(-22px)',
    transformOrigin: 'center center',
    willChange: 'transform',
  },

  // Linear spinners
  growingBarsSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'end',
    height: '40px',
  },
  growingBar: {
    width: '6px',
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
  },

  slidingBlocksSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    alignItems: 'center',
  },
  slidingBlock: {
    width: '16px',
    height: '16px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
  },
});

const OrbitSpinnerMotion = createStaggerComponent(
  [
    // rotation atom
    {
      keyframes: [
        { offset: 0, rotate: '0deg', easing: motionTokens.curveEasyEase },
        { offset: 0.8, rotate: '740deg' },
        { offset: 1, rotate: '740deg' },
      ],
      duration: motionTokens.durationUltraSlow * 8,
      iterations: Infinity,
    },
    // opacity atom
    {
      keyframes: [
        { offset: 0, opacity: 0, easing: motionTokens.curveEasyEase },
        { offset: 0.4, opacity: 1, easing: motionTokens.curveEasyEase },
        { offset: 0.8, opacity: 0 },
        { offset: 1, opacity: 0 },
      ],
      duration: motionTokens.durationUltraSlow * 8,
      fill: 'both',
      iterations: Infinity,
    },
  ],
  { defaultStartInterval: motionTokens.durationFaster },
);

const BarsSpinnerMotion = createStaggerComponent(
  [
    {
      keyframes: [
        { scale: '1 0.25', easing: motionTokens.curveEasyEase },
        { scale: '1 1', easing: motionTokens.curveEasyEase },
        { scale: '1 0.25' },
      ],
      duration: motionTokens.durationUltraSlow * 2,
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
      duration: motionTokens.durationUltraSlow * 6,
      fill: 'both',
      iterations: Infinity,
    },
  ],
  { defaultStartInterval: motionTokens.durationUltraFast * 2 },
);

const ArcsSpinnerMotion = createStaggerComponent(
  [
    {
      keyframes: [
        { offset: 0, easing: motionTokens.curveEasyEase },
        { offset: 0.2, rotate: '-60deg', easing: motionTokens.curveEasyEase },
        { offset: 0.9, rotate: '720deg' },
        { offset: 1, rotate: '720deg' },
      ],
      duration: 4000,
      iterations: Infinity,
    },
  ],
  { defaultStartInterval: 80 },
);

const BlocksSpinnerMotion = createStaggerComponent(
  [
    // horizontal slide atom
    {
      keyframes: [
        { offset: 0, translate: '0px', easing: motionTokens.curveEasyEase },
        { offset: 0.5, translate: '-30px', easing: motionTokens.curveEasyEaseMax },
        { offset: 0.85, translate: '0px' },
        { offset: 1, translate: '0px' },
      ],
      duration: 2000,
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
      iterations: Infinity,
    },
  ],
  { defaultStartInterval: motionTokens.durationFaster },
);

export const StaggerSpinners = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.spinnerGrid}>
        {/* Orbit Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Orbit</h3>
          <div className={classes.spinnerContainer}>
            <OrbitSpinnerMotion>
              <div className={classes.dotOrbitSpinner}>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={classes.orbitDot} data-index={i} />
                ))}
              </div>
            </OrbitSpinnerMotion>
          </div>
        </div>

        {/* Bars Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Bars</h3>
          <div className={classes.spinnerContainer}>
            <BarsSpinnerMotion>
              <div className={classes.growingBarsSpinner}>
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className={classes.growingBar} />
                ))}
              </div>
            </BarsSpinnerMotion>
          </div>
        </div>

        {/* Arcs Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Arcs</h3>
          <div className={classes.spinnerContainer}>
            <ArcsSpinnerMotion>
              <div className={classes.arcSpinner}>
                <div className={`${classes.arc} ${classes.arc3}`} />
                <div className={`${classes.arc} ${classes.arc2}`} />
                <div className={`${classes.arc} ${classes.arc1}`} />
              </div>
            </ArcsSpinnerMotion>
          </div>
        </div>

        {/* Blocks Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Blocks</h3>
          <div className={classes.spinnerContainer}>
            <BlocksSpinnerMotion>
              <div className={classes.slidingBlocksSpinner}>
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={classes.slidingBlock} />
                ))}
              </div>
            </BlocksSpinnerMotion>
          </div>
        </div>
      </div>
    </div>
  );
};
