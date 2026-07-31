import {
  createPresenceComponent,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentAppear.stories.md';

import styles from './CreatePresenceComponentAppear.module.css';

const useClasses = () => styles;

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentAppear = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, isMounted]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        {isMounted && (
          <Fade appear imperativeRef={motionRef} visible>
            <div className={classes.item} />
          </Fade>
        )}
      </div>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Mount an element?" checked={isMounted} onChange={() => setIsMounted(v => !v)} />
        </Field>
        <Field
          className={`${classes.field} ${classes.sliderField}`}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),
            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};

CreatePresenceComponentAppear.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
