import * as React from 'react';
import { Field, makeStyles, tokens, Switch, useId, Label, Slider } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

import description from './ExperimentsBlur.stories.md';

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

export const ExperimentsBlur = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<string>('20px');
  const [duration, setDuration] = React.useState<number>(500);
  const radiusSliderId = useId();
  const durationSliderId = useId();
  const radiusMin = 2;
  const radiusMax = 50;
  const durationMin = 50;
  const durationMax = 1000;

  return (
    <div className={classes.container}>
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

        <Label htmlFor={radiusSliderId}>radius: {radius}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{radiusMin}</Label>
          <Slider
            min={radiusMin}
            max={radiusMax}
            defaultValue={20}
            id={radiusSliderId}
            onChange={(_, data) => {
              setRadius(`${data.value}px`);
            }}
          />
          <Label aria-hidden>{radiusMax}</Label>
        </div>
      </div>

      <Blur
        visible={visible}
        radius={radius}
        enterDuration={duration}
        onMotionFinish={() => autoplay && setVisible(v => !v)}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Blur>
    </div>
  );
};

ExperimentsBlur.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
