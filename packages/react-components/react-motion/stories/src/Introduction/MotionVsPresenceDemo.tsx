import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { createMotionComponent, createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { useClasses } from './MotionVsPresenceDemo.styles';

// One-way motion: plays on mount
const SlideIn = createMotionComponent({
  keyframes: [
    { transform: 'translateX(-20px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  duration: motionTokens.durationNormal,
  easing: motionTokens.curveDecelerateMid,
});

// Two-way presence: controlled by visible prop
const FadePresence = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationNormal,
    easing: motionTokens.curveDecelerateMid,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationFast,
    easing: motionTokens.curveAccelerateMid,
  },
});

export const MotionVsPresenceDemo: React.FC = () => {
  const classes = useClasses();
  const [motionKey, setMotionKey] = React.useState(0);
  const [presenceVisible, setPresenceVisible] = React.useState(true);

  const handleReplay = React.useCallback(() => {
    setMotionKey(k => k + 1);
  }, []);

  const handleTogglePresence = React.useCallback(() => {
    setPresenceVisible(v => !v);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.panel}>
        <h4 className={classes.title}>One-Way Motion</h4>
        <p className={classes.subtitle}>Plays once on mount</p>
        <div className={classes.demoArea}>
          <SlideIn key={motionKey}>
            <div className={classes.card}>Slide In</div>
          </SlideIn>
        </div>
        <Button onClick={handleReplay}>Replay</Button>
      </div>

      <div className={classes.panel}>
        <h4 className={classes.title}>Two-Way Presence</h4>
        <p className={classes.subtitle}>Toggles with enter/exit</p>
        <div className={classes.demoArea}>
          <FadePresence visible={presenceVisible}>
            <div className={classes.card}>Fade</div>
          </FadePresence>
        </div>
        <Button onClick={handleTogglePresence}>{presenceVisible ? 'Hide' : 'Show'}</Button>
      </div>
    </div>
  );
};
