import * as React from 'react';
import { Field, makeStyles, tokens, Switch, useId, Label, Slider, Select } from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';

import description from './ExperimentsRotate.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
    // perspective: '1000px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const ExperimentsRotate = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [axis, setAxis] = React.useState<'X' | 'Y' | 'Z'>('X');
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [perspective, setPerspective] = React.useState<string>('1000px');
  const [duration, setDuration] = React.useState<number>(500);
  const perspectiveSliderId = useId();
  const durationSliderId = useId();
  const axisSelectId = useId();
  const perspectiveMin = 200;
  const perspectiveMax = 2000;
  const durationMin = 50;
  const durationMax = 1000;

  return (
    <div className={classes.container} style={{ perspective }}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        <Field className={classes.field}>
          <Switch
            label="Autoplay"
            checked={autoplay}
            onChange={() => {
              if (!autoplay) {
                setVisible(!visible);
              }
              return setAutoplay(v => !v);
            }}
          />
        </Field>

        <label htmlFor={axisSelectId}>axis</label>
        <Select id={axisSelectId} onChange={(_, data) => setAxis(data.value as 'X' | 'Y' | 'Z')} defaultValue={axis}>
          <option>X</option>
          <option>Y</option>
          <option>Z</option>
        </Select>

        <Label htmlFor={durationSliderId}>duration: {duration}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{durationMin}</Label>
          <Slider
            min={durationMin}
            max={durationMax}
            defaultValue={duration}
            id={durationSliderId}
            onChange={(_, data) => {
              setDuration(data.value);
            }}
          />
          <Label aria-hidden>{durationMax}</Label>
        </div>

        <Label htmlFor={perspectiveSliderId}>perspective: {perspective}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{perspectiveMin}</Label>
          <Slider
            min={perspectiveMin}
            max={perspectiveMax}
            defaultValue={1000}
            id={perspectiveSliderId}
            onChange={(_, data) => {
              setPerspective(`${data.value}px`);
            }}
          />
          <Label aria-hidden>{perspectiveMax}</Label>
        </div>
      </div>

      <Rotate
        visible={visible}
        axis={axis}
        enterDuration={duration}
        onMotionFinish={() => autoplay && setVisible(v => !v)}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Rotate>
    </div>
  );
};

ExperimentsRotate.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
