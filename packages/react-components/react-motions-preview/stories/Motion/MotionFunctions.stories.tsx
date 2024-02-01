import { Checkbox, Label, makeStyles, shorthands, Slider, tokens, useId } from '@fluentui/react-components';
import { createPresence, MotionImperativeRef, PresenceMotionFn } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './MotionFunctions.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
  item: {
    ...shorthands.border('3px', 'solid', tokens.colorBrandBackground),
    ...shorthands.padding('8px'),

    width: '300px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gridArea('2', '1', '2', '3'),

    marginTop: '20px',

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },
  description: {
    ...shorthands.margin('5px'),
  },
});

const collapseMotion: PresenceMotionFn = ({ element }) => {
  console.log('### collapseMotion - element:', element);
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
const Collapse = createPresence(collapseMotion);

export const MotionFunctions = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionInRef = React.useRef<MotionImperativeRef>();
  const motionOutRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

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
