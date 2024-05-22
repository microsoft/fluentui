import { Checkbox, Label, makeStyles, Slider, tokens, useId } from '@fluentui/react-components';
import { createPresenceComponent } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef, PresenceMotionFn } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './MotionFunctions.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
  item: {
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',

    width: '300px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: '2 1 2 3',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
  description: { margin: '5px' },
});

const collapseMotion: PresenceMotionFn = element => {
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

export const MotionFunctions = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionInRef = React.useRef<MotionImperativeRef>();
  const motionOutRef = React.useRef<MotionImperativeRef>();

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
      <div className={classes.card}>
        <Collapse imperativeRef={motionInRef} visible={visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>normal state</div>
      </div>
      <div className={classes.card}>
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
        <div>
          <Checkbox label="Visible?" checked={visible} onChange={() => setVisible(v => !v)} />
        </div>
        <div>
          <Label htmlFor={sliderId}>
            <code>playbackRate</code>: {playbackRate}%
          </Label>
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            id={sliderId}
            max={100}
            step={10}
          />
        </div>
      </div>
    </div>
  );
};

MotionFunctions.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
