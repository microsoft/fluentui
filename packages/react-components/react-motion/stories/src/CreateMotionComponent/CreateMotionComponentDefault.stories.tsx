import {
  createMotionComponent,
  makeStyles,
  type MotionImperativeRef,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card" / 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
  iterations: Infinity,
});

export const CreateMotionComponentDefault = () => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>();

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(0.2);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter imperativeRef={motionRef}>
          <div className={classes.item} />
        </FadeEnter>
      </div>
    </div>
  );
};
