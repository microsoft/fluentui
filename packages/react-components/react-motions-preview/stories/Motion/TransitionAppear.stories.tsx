import { makeStyles, shorthands, tokens, Label, Slider, useId, Checkbox } from '@fluentui/react-components';
import { createTransition, transitions } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './TransitionUnmountOnExit.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    alignItems: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
  description: {
    ...shorthands.margin('5px'),
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },
});

const Fade = createTransition(transitions.fade.slow());

export const TransitionAppear = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, isMounted]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          {isMounted && (
            <Fade appear imperativeRef={motionRef} visible>
              <div className={classes.item} />
            </Fade>
          )}

          <code className={classes.description}>fadeSlow</code>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label="Mount an element?" checked={isMounted} onChange={() => setIsMounted(v => !v)} />
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
    </>
  );
};

TransitionAppear.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
