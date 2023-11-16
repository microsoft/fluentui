import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { atoms, createAtom } from '@fluentui/react-motions-preview';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
  },
  card: {
    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    ...shorthands.padding('20px'),
    ...shorthands.margin('20px'),
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
});

const motionAtom = atoms.fade.enterUltraSlow();
const FadeEnter = createAtom({
  keyframes: motionAtom.keyframes,
  options: { ...motionAtom.options, duration: 2000 },
});

export const MotionDefault = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter iterations={Infinity}>
          <div className={classes.item} />
        </FadeEnter>
      </div>
    </div>
  );
};
