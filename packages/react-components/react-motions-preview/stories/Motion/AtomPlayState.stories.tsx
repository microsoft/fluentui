import { makeStyles, shorthands, tokens, Label, Slider, useId, Checkbox } from '@fluentui/react-components';
import { atoms, createAtom } from '@fluentui/react-motions-preview';
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

const FadeEnter = createAtom(atoms.fade.enterUltraSlow());

export const AtomPlayState = () => {
  const classes = useClasses();
  const sliderId = useId();

  const elementRef = React.useRef<HTMLDivElement>(null);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  React.useEffect(() => {
    elementRef.current?.getAnimations().forEach(animation => {
      animation.playbackRate = playbackRate / 100;
    });
  }, [playbackRate, isRunning]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <FadeEnter playState={isRunning ? 'running' : 'paused'} iterations={Infinity}>
            <div className={classes.item} ref={elementRef} />
          </FadeEnter>

          <code className={classes.description}>fadeEnterSlow</code>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox
            label={isRunning ? '⏸️ Pause' : '▶️ Play'}
            checked={isRunning}
            onChange={() => setIsRunning(v => !v)}
          />
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

AtomPlayState.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
