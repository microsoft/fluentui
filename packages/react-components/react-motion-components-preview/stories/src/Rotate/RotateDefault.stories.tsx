import * as React from 'react';
import { Field, makeStyles, tokens, Switch, useId, Label, Slider } from '@fluentui/react-components';
import { Rotate, RotateParams } from '@fluentui/react-motion-components-preview';

// import description from './ExperimentsRotate.stories.md';

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

// export const Default = (props: React.PropsWithChildren<typeof Rotate>) => {
export const Default = (props: RotateParams) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [perspective, setPerspective] = React.useState<string>('1000px');
  const [duration, setDuration] = React.useState<number>(500);
  const [fromX, setFromX] = React.useState<number>(0);
  const [fromY, setFromY] = React.useState<number>(-90);
  const [fromZ, setFromZ] = React.useState<number>(0);

  const perspectiveSliderId = useId();
  const durationSliderId = useId();
  const fromXSliderId = useId();
  const fromYSliderId = useId();
  const fromZSliderId = useId();

  const perspectiveMin = 200;
  const perspectiveMax = 2000;
  const durationMin = 50;
  const durationMax = 1000;
  const angleMin = -180;
  const angleMax = 180;

  const curveSpringRelaxed = `linear(
    0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017,
    1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
    1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,
    0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1
  )`;

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

        <label htmlFor={fromXSliderId}>fromX: {fromX}°</label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{angleMin}</Label>
          <Slider
            min={angleMin}
            max={angleMax}
            defaultValue={fromX}
            id={fromXSliderId}
            onChange={(_, data) => {
              setFromX(data.value);
            }}
          />
          <Label aria-hidden>{angleMax}</Label>
        </div>

        <label htmlFor={fromYSliderId}>fromY: {fromY}°</label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{angleMin}</Label>
          <Slider
            min={angleMin}
            max={angleMax}
            defaultValue={fromY}
            id={fromYSliderId}
            onChange={(_, data) => {
              setFromY(data.value);
            }}
          />
          <Label aria-hidden>{angleMax}</Label>
        </div>

        <label htmlFor={fromZSliderId}>fromZ: {fromZ}°</label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{angleMin}</Label>
          <Slider
            min={angleMin}
            max={angleMax}
            defaultValue={fromZ}
            id={fromZSliderId}
            onChange={(_, data) => {
              setFromZ(data.value);
            }}
          />
          <Label aria-hidden>{angleMax}</Label>
        </div>

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
        fromX={fromX}
        fromY={fromY}
        fromZ={fromZ}
        duration={duration}
        easing={curveSpringRelaxed}
        onMotionFinish={() => autoplay && setVisible(v => !v)}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Rotate>
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
