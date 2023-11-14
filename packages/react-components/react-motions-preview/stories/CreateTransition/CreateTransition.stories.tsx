import { makeStyles, shorthands, tokens, Label, Slider, useId, Checkbox } from '@fluentui/react-components';
import { atoms, createTransition } from '@fluentui/react-motions-preview';
import * as React from 'react';

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

// TODO: use transition instead of atom
const Fade = createTransition({
  in: atoms.fade.enterSlow(),
  out: atoms.fade.exitSlow(),
});

export const CreateTransition = () => {
  const classes = useClasses();
  const sliderId = useId();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.getAnimations().forEach(animation => {
      animation.playbackRate = playbackRate / 100;
    });
  }, [playbackRate, visible]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <Fade visible={visible}>
            <div className={classes.item} />
          </Fade>

          <code className={classes.description}>fadeSlow</code>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label={<code>visible</code>} checked={visible} onChange={() => setVisible(v => !v)} />
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
