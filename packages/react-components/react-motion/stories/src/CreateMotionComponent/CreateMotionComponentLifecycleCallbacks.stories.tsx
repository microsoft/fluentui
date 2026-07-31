import {
  createMotionComponent,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Text,
  useId,
  Button,
} from '@fluentui/react-components';
import { ReplayFilled } from '@fluentui/react-icons';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentLifecycleCallbacks.stories.md';

import styles from './CreateMotionComponentLifecycleCallbacks.module.css';

const useClasses = () => styles;

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
});

export const CreateMotionComponentLifecycleCallbacks = (): JSXElement => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [statusLog, setStatusLog] = React.useState<[number, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [count, setCount] = React.useState(0);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, count]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter
          key={count}
          imperativeRef={motionRef}
          onMotionStart={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart'], ...entries]);
          }}
          onMotionFinish={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish'], ...entries]);
          }}
          onMotionCancel={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel'], ...entries]);
          }}
        >
          <div className={classes.item} />
        </FadeEnter>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Button appearance="subtle" icon={<ReplayFilled />} onClick={() => setCount(s => s + 1)}>
            Restart
          </Button>
        </div>
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

CreateMotionComponentLifecycleCallbacks.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
