import * as React from 'react';
import StaggerBouncingDotsDescription from './StaggerBouncingDots.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, motionTokens, Slider, Label } from '@fluentui/react-components';
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
  controlsRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: '200px',
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
  bouncingDotsSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
  },
  bouncingDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
  },
});

const StaggeredBounce = createStaggerComponent<{ duration?: number }>(({ duration = 2000 }) => ({
  keyframes: [
    { transform: 'translateY(0px)', easing: motionTokens.curveEasyEase },
    { offset: 0.1, transform: 'translateY(10px)', easing: motionTokens.curveEasyEaseMax },
    { offset: 0.4, transform: 'translateY(-30px)', easing: motionTokens.curveAccelerateMid },
    { offset: 0.6, transform: 'translateY(0px)', easing: motionTokens.curveDecelerateMid },
    { offset: 0.61, transform: 'translateY(-10px)', easing: motionTokens.curveAccelerateMid },
    { offset: 0.62, transform: 'translateY(0px)', easing: motionTokens.curveDecelerateMid },
    { offset: 0.63, transform: 'translateY(-5px)', easing: motionTokens.curveAccelerateMid },
    { offset: 0.64, transform: 'translateY(0px)' },
    { transform: 'translateY(0px)' },
  ],
  duration,
  iterations: Infinity,
}));

export const BouncingDots = (): JSXElement => {
  const classes = useClasses();

  // Bouncing Dots controls
  const [bounceDuration, setBounceDuration] = React.useState<number>(2000);
  const [startInterval, setStartInterval] = React.useState<number>(100);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <div className={classes.controlsRow}>
          <div className={classes.controlGroup}>
            <Label>Bounce Duration: {bounceDuration}ms</Label>
            <Slider
              min={1000}
              max={5000}
              step={500}
              value={bounceDuration}
              onChange={(_ev, data) => setBounceDuration(data.value)}
            />
          </div>

          <div className={classes.controlGroup}>
            <Label>Start Interval: {startInterval}ms</Label>
            <Slider
              min={10}
              max={200}
              step={10}
              value={startInterval}
              onChange={(_ev, data) => setStartInterval(data.value)}
            />
          </div>
        </div>
      </div>

      {/* Bouncing Dots Spinner */}
      <div className={classes.spinnerSection}>
        <h3 className={classes.spinnerTitle}>Bouncing Dots Spinner</h3>
        <div className={classes.spinnerContainer}>
          <StaggeredBounce
            key={`${bounceDuration}-${startInterval}`}
            startInterval={startInterval}
            duration={bounceDuration}
          >
            <div className={classes.bouncingDotsSpinner}>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={classes.bouncingDot} />
              ))}
            </div>
          </StaggeredBounce>
        </div>
      </div>
    </div>
  );
};

BouncingDots.parameters = {
  docs: {
    description: {
      story: StaggerBouncingDotsDescription,
    },
  },
};
