import {
  createPresenceComponent,
  Field,
  type MotionImperativeRef,
  type PresenceMotionFn,
  Slider,
  Switch,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentFunctions.stories.md';

import styles from './CreatePresenceComponentFunctions.module.css';

const useClasses = () => styles;

const collapseMotion: PresenceMotionFn = ({ element }) => {
  const duration = 500;
  const keyframes = [
    { opacity: 0, maxHeight: '0px', overflow: 'hidden' },
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
  ];

  return {
    enter: { duration, keyframes },
    exit: { duration, keyframes: [...keyframes].reverse() },
  };
};
const Collapse = createPresenceComponent(collapseMotion);

export const CreatePresenceComponentFunctions = (): JSXElement => {
  const classes = useClasses();

  const motionInRef = React.useRef<MotionImperativeRef>(null);
  const motionOutRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionInRef.current?.setPlaybackRate(playbackRate / 100);
    motionOutRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={`${classes.card} ${classes.cardA}`}>
        <Collapse imperativeRef={motionInRef} visible={visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>normal state</div>
      </div>
      <div className={`${classes.card} ${classes.cardB}`}>
        <Collapse imperativeRef={motionOutRef} visible={!visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>reversed state</div>
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

CreatePresenceComponentFunctions.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
