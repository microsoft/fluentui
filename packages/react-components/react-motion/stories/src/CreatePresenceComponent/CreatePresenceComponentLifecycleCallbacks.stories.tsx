import {
  createPresenceComponent,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  Text,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentLifecycleCallbacks.stories.md';

import styles from './CreatePresenceComponentLifecycleCallbacks.module.css';

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

export const CreatePresenceComponentLifecycleCallbacks = (): JSXElement => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [statusLog, setStatusLog] = React.useState<[number, string, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade
          imperativeRef={motionRef}
          onMotionStart={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart', data.direction], ...entries]);
          }}
          onMotionFinish={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish', data.direction], ...entries]);
          }}
          onMotionCancel={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel', data.direction], ...entries]);
          }}
          visible={visible}
        >
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName, direction], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text> (direction: {direction})
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
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

CreatePresenceComponentLifecycleCallbacks.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
