import * as React from 'react';
import StaggerBouncingDotsDescription from './StaggerBouncingDots.stories.md';
import {
  makeStyles,
  tokens,
  motionTokens,
  createMotionComponent,
  Slider,
  Label,
  JSXElement,
} from '@fluentui/react-components';
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

const BounceMotion = createMotionComponent<{ delay?: number; duration?: number }>(({ delay = 0, duration = 2000 }) => ({
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
  delay,
  iterations: Infinity,
}));

export const BouncingDots = (): JSXElement => {
  const classes = useClasses();
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  // Bouncing Dots controls
  const [bounceDuration, setBounceDuration] = React.useState<number>(2000);
  const [bounceItemDelay, setBounceItemDelay] = React.useState<number>(100);

  // Automatically restart animation when slider values change
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [bounceDuration, bounceItemDelay]);

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
            <Label>Item Delay: {bounceItemDelay}ms</Label>
            <Slider
              min={10}
              max={200}
              step={10}
              value={bounceItemDelay}
              onChange={(_ev, data) => setBounceItemDelay(data.value)}
            />
          </div>
        </div>
      </div>

      {/* Bouncing Dots Spinner */}
      <div className={classes.spinnerSection}>
        <h3 className={classes.spinnerTitle}>Bouncing Dots Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.bouncingDotsSpinner}>
            <Stagger.In itemDelay={bounceItemDelay} key={`bounce-${animationKey}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <BounceMotion key={i} duration={bounceDuration}>
                  <div className={classes.bouncingDot} />
                </BounceMotion>
              ))}
            </Stagger.In>
          </div>
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
