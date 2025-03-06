import * as React from 'react';
import { Field, makeStyles, tokens, Switch, useId, Label, Slider, Avatar } from '@fluentui/react-components';
import { Wipe } from './Wipe';

// import description from './ExperimentsWipe.stories.md';

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
    backgroundColor: tokens.colorNeutralBackground1Pressed,
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
  ball: {
    width: '50px',
    height: '50px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '50%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  itemWrapper: {
    position: 'absolute',
    // top: '0',
    // left: '0',
    // width: '100%',
    // height: '100%',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const diagonalWipeKeyframes = ({ reverse = false } = {}) => {
  if (reverse) {
    return [
      // beginning: mask is fully covering the element
      {
        clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 0% 0%, 100% 0%)',
      },
      // halfway: mask covers half along the diagonal from the bottom-left to the top-right
      {
        clipPath: 'polygon(100% 100%, 0% 100%, 0% 100%, 100% 0%, 100% 0%)',
      },
      // end: mask is empty and the starting point is the top-left corner
      { clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%)' },
    ];
  }

  return [
    // beginning: mask is empty and the starting point is the top-left corner
    { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)' },
    // halfway: mask covers half along the diagonal from the bottom-left to the top-right
    { clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 100% 0%, 100% 0%)' },
    // end: mask is fully covering the element
    {
      clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 100%, 100% 0%)',
    },
  ];
};

export const ExperimentsWipe = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<number>(50);
  const [duration, setDuration] = React.useState<number>(1000);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);

  const radiusSliderId = useId();
  const durationSliderId = useId();
  const radiusMin = 2;
  const radiusMax = 50;
  const durationMin = 200;
  const durationMax = 2000;

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

        <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field>

        {/* <Label htmlFor={radiusSliderId}>radius: {radius}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{radiusMin}</Label>
          <Slider
            min={radiusMin}
            max={radiusMax}
            defaultValue={20}
            id={radiusSliderId}
            onChange={(_, data) => {
              setRadius(data.value);
            }}
          />
          <Label aria-hidden>{radiusMax}</Label>
        </div> */}
      </div>

      <Wipe
        visible={visible}
        enterDuration={duration}
        animateOpacity={animateOpacity}
        onMotionFinish={() => autoplay && setVisible(v => !v)}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Wipe>
    </div>
  );
};

ExperimentsWipe.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
