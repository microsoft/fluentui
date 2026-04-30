'use client';

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
  duration: motionTokens.durationUltraSlow,
  easing: motionTokens.curveDecelerateMid,
});

// Two-way presence: controlled by visible prop
const FadePresence = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationUltraSlow,
    easing: motionTokens.curveDecelerateMid,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
    easing: motionTokens.curveAccelerateMid,
  },
});

const motionCode = `const SlideIn = createMotionComponent({
  keyframes: [
    { transform: 'translateX(-20px)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  duration: 500,
});`;

const presenceCode = `const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 500,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 300,
  },
});`;

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
        <div className={classes.panelHeader}>
          <h4 className={classes.title}>One-Way Motion</h4>
          <p className={classes.subtitle}>Plays once on mount</p>
        </div>
        <div className={classes.demoArea}>
          <SlideIn key={motionKey}>
            <div className={classes.card}>Slide In</div>
          </SlideIn>
        </div>
        <div className={classes.codeArea}>
          <code className={classes.code}>{motionCode}</code>
        </div>
        <div className={classes.buttonRow}>
          <Button appearance="primary" onClick={handleReplay}>
            Replay
          </Button>
        </div>
      </div>

      <div className={classes.panel}>
        <div className={classes.panelHeader}>
          <h4 className={classes.title}>Two-Way Presence</h4>
          <p className={classes.subtitle}>Toggles with enter/exit</p>
        </div>
        <div className={classes.demoArea}>
          <FadePresence visible={presenceVisible}>
            <div className={classes.card}>Fade</div>
          </FadePresence>
        </div>
        <div className={classes.codeArea}>
          <code className={classes.code}>{presenceCode}</code>
        </div>
        <div className={classes.buttonRow}>
          <Button appearance="primary" onClick={handleTogglePresence}>
            {presenceVisible ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
};
