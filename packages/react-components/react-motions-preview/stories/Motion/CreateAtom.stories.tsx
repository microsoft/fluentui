import { makeStyles, shorthands, tokens, Label, Slider, useId } from '@fluentui/react-components';
import { atom, createAtom } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './CreateAtom.stories.md';

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
    marginTop: '20px',

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },
  meter: {
    ...shorthands.padding('4px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralForeground3),
    fontFamily: tokens.fontFamilyNumeric,
    backgroundColor: tokens.colorNeutralBackground4,
  },
  slider: {
    width: '250px',
  },
  label: {
    alignSelf: 'center',
  },
});

const FadeEnter = createAtom(atom.fade.enterUltraSlow());
const FadeExit = createAtom(atom.fade.exitUltraSlow());

export const CreateAtom = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionEnterRef = React.useRef<MotionImperativeRef>();
  const motionExitRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);

  React.useEffect(() => {
    motionEnterRef.current?.setPlaybackRate(playbackRate / 100);
    motionExitRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <FadeEnter iterations={Infinity} imperativeRef={motionEnterRef}>
            <div className={classes.item} />
          </FadeEnter>

          <code className={classes.description}>fadeEnterUltraSlow</code>
        </div>
        <div className={classes.card}>
          <FadeExit iterations={Infinity} imperativeRef={motionExitRef}>
            <div className={classes.item} />
          </FadeExit>

          <div className={classes.description}>fadeExitUltraSlow</div>
        </div>
      </div>

      <div className={classes.controls}>
        <Label className={classes.label} htmlFor={sliderId}>
          <code>playbackRate</code>
        </Label>
        <Slider
          className={classes.slider}
          aria-valuetext={`Value is ${playbackRate}%`}
          value={playbackRate}
          onChange={(ev, data) => setPlaybackRate(data.value)}
          min={0}
          id={sliderId}
          max={100}
          step={10}
        />
        <div className={classes.meter}>{playbackRate}%</div>
      </div>
    </>
  );
};

CreateAtom.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
