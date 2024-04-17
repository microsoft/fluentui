import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
  },
  card: {
    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    ...shorthands.padding('20px'),
    ...shorthands.margin('20px'),
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.border('3px', 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
});

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
});

export const CreateMotionComponentDefault = () => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>();

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(0.3);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter iterations={Infinity} imperativeRef={motionRef}>
          <div className={classes.item} />
        </FadeEnter>
      </div>
    </div>
  );
};
