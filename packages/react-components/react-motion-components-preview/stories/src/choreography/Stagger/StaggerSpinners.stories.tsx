import * as React from 'react';
import StaggerSpinnersDescription from './StaggerSpinners.stories.md';
import { makeStyles, tokens, motionTokens, createMotionComponent, JSXElement } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

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
    // borderTopColor: tokens.colorBrandBackground2,
  },
  arc3: {
    width: '30px',
    height: '30px',
    border: '4px solid transparent',
    borderTopColor: tokens.colorBrandBackground,
    // borderTopColor: tokens.colorBrandBackgroundPressed,
  },

  dotOrbitSpinner: {
    position: 'relative',
    width: '70px',
    height: '70px',
  },
  orbitDot: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
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

// Motion components for continuous animations
const SpinMotion = createMotionComponent<{ duration?: number; spins?: number; delay?: number }>(
  ({ duration = 4000, spins = 2, delay = 0 }) => [
    {
      keyframes: [
        { easing: motionTokens.curveEasyEase },
        { offset: 0.2, rotate: `-60deg`, easing: motionTokens.curveEasyEase },
        { offset: 0.9, rotate: `${360 * spins}deg` },
        { rotate: `${360 * spins}deg` },
      ],
      duration,
      delay,
      iterations: Infinity,
      // direction: 'alternate',
      // composite: 'add',
    },
    // {
    //   keyframes: [
    //     { offset: 0.2, borderWidth: '4px', easing: motionTokens.curveEasyEase },
    //     { offset: 0.55, borderWidth: '6px', easing: motionTokens.curveEasyEase },
    //     { offset: 0.9, borderWidth: '4px' },
    //   ],
    //   duration,
    //   iterations: Infinity,
    // },
    // {
    //   keyframes: [
    //     { offset: 0.2, scale: 1, easing: motionTokens.curveEasyEase },
    //     { offset: 0.55, scale: 0.8, easing: motionTokens.curveEasyEase },
    //     { offset: 0.9, scale: 1 },
    //   ],
    //   duration,
    //   iterations: Infinity,
    // },
  ],
);

const ScaleMotion = createMotionComponent({
  keyframes: [{ transform: 'scaleY(0.3)' }, { transform: 'scaleY(1)' }, { transform: 'scaleY(0.3)' }],
  duration: motionTokens.durationSlow * 2, // 600ms
  iterations: Infinity,
  easing: motionTokens.curveEasyEase,
});

const SlideMotion = createMotionComponent<{ delay?: number }>(({ delay = 0 }) => [
  {
    keyframes: [
      { transform: 'translateX(0px)', easing: motionTokens.curveEasyEase },
      { offset: 0.5, transform: 'translateX(-30px)', easing: motionTokens.curveEasyEaseMax },
      { offset: 0.85, transform: 'translateX(0px)' },
      { transform: 'translateX(0px)' },
    ],
    duration: 2000,
    delay,
    iterations: Infinity,
  },
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

// Orbital motion for dots
const OrbitMotion = createMotionComponent(({ element }) => {
  const index = parseInt(element.dataset.index || '0', 10);
  const angle = index * 60 - 90; // 6 dots, 60 degrees apart, start at top
  const radius = 25;

  return {
    keyframes: [
      {
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      },
      {
        transform: `rotate(${angle + 360}deg) translateX(${radius}px) rotate(-${angle - 360}deg)`,
      },
    ],
    duration: motionTokens.durationUltraSlow * 6, // 3 seconds
    iterations: Infinity,
    easing: motionTokens.curveLinear,
  };
});

export const StaggerSpinners = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      {/* Nested Arcs Spinner */}
      <div className={classes.spinnerSection}>
        <h3 className={classes.spinnerTitle}>Nested Arcs Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.arcSpinner}>
            <Stagger.In itemDelay={80}>
              <SpinMotion key="1">
                <div className={`${classes.arc} ${classes.arc3}`} />
              </SpinMotion>
              <SpinMotion key="2">
                <div className={`${classes.arc} ${classes.arc2}`} />
              </SpinMotion>
              <SpinMotion key="3">
                <div className={`${classes.arc} ${classes.arc1}`} />
              </SpinMotion>
            </Stagger.In>
          </div>
        </div>
      </div>

      {/* Dot Orbit Spinner */}
      <div className={classes.spinnerSection} style={{ display: 'none' }}>
        <h3 className={classes.spinnerTitle}>Dot Orbit Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.dotOrbitSpinner}>
            <Stagger.In itemDelay={motionTokens.durationFaster}>
              {Array.from({ length: 6 }, (_, i) => (
                <OrbitMotion key={i}>
                  <div className={classes.orbitDot} data-index={i} />
                </OrbitMotion>
              ))}
            </Stagger.In>
          </div>
        </div>
      </div>

      {/* Growing Bars Spinner */}
      <div className={classes.spinnerSection} style={{ display: 'none' }}>
        <h3 className={classes.spinnerTitle}>Growing Bars Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.growingBarsSpinner}>
            <Stagger.In itemDelay={motionTokens.durationFaster}>
              {Array.from({ length: 7 }, (_, i) => (
                <ScaleMotion key={i}>
                  <div
                    className={classes.growingBar}
                    style={{
                      height: `${20 + (i % 3) * 8}px`,
                    }}
                  />
                </ScaleMotion>
              ))}
            </Stagger.In>
          </div>
        </div>
      </div>

      {/* Sliding Blocks Spinner */}
      <div className={classes.spinnerSection}>
        <h3 className={classes.spinnerTitle}>Sliding Blocks Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.slidingBlocksSpinner}>
            <Stagger.In itemDelay={motionTokens.durationFaster}>
              {Array.from({ length: 5 }, (_, i) => (
                <SlideMotion key={i}>
                  <div className={classes.slidingBlock} />
                </SlideMotion>
              ))}
            </Stagger.In>
          </div>
        </div>
      </div>
    </div>
  );
};

StaggerSpinners.parameters = {
  docs: {
    description: {
      story: StaggerSpinnersDescription,
    },
  },
};
