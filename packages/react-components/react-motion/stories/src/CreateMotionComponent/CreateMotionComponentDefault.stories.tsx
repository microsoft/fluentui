import {
  createMotionComponent,
  type MotionComponentProps,
  type MotionImperativeRef,
  motionTokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './CreateMotionComponentDefault.module.css';

const useClasses = () => styles;

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentDefault = (props: MotionComponentProps): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

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
