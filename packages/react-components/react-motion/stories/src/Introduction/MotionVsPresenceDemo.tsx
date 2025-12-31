import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { createMotionComponent, createPresenceComponent, motionTokens } from '@fluentui/react-motion';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginTop: '24px',
    marginBottom: '24px',

    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  subtitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    boxShadow: tokens.shadow4,
  },
});

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
        <Button onClick={() => setMotionKey(k => k + 1)}>Replay</Button>
      </div>

      <div className={classes.panel}>
        <h4 className={classes.title}>Two-Way Presence</h4>
        <p className={classes.subtitle}>Toggles with enter/exit</p>
        <div className={classes.demoArea}>
          <FadePresence visible={presenceVisible}>
            <div className={classes.card}>Fade</div>
          </FadePresence>
        </div>
        <Button onClick={() => setPresenceVisible(v => !v)}>{presenceVisible ? 'Hide' : 'Show'}</Button>
      </div>
    </div>
  );
};
