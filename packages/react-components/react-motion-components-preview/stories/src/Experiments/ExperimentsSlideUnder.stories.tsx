import * as React from 'react';
import { Field, makeStyles, tokens, Switch, useId, Label, Select } from '@fluentui/react-components';
import { SlideOrientation, SlideUnder } from './SlideUnder';

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
  },
  solidBackground: {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    padding: '20px',
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

export const ExperimentsSlideUnder = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>(1000);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [orientation, setOrientation] = React.useState<'vertical' | 'horizontal'>('vertical');
  const [distance, setDistance] = React.useState<string>('100%');

  const orientationSelectId = useId();
  const distanceSelectId = useId();
  const durationSliderId = useId();
  const durationMin = 200;
  const durationMax = 2000;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        {/* <Field className={classes.field}>
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
        </div> */}

        <label htmlFor={orientationSelectId}>orientation:</label>
        <Select
          id={orientationSelectId}
          onChange={(_, data) => setOrientation(data.value as SlideOrientation)}
          defaultValue={orientation}
        >
          <option>vertical</option>
          <option>horizontal</option>
        </Select>

        <label htmlFor={distanceSelectId}>distance:</label>
        <Select id={orientationSelectId} onChange={(_, data) => setDistance(data.value)} defaultValue={orientation}>
          <option>100%</option>
          <option>-100%</option>
          <option>50%</option>
          <option>-50%</option>
        </Select>

        {/* Not working with animateOpacity false */}
        {/* <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field> */}
      </div>
      <div className={classes.card}>
        <SlideUnder visible={visible} orientation={orientation} distance={distance} animateOpacity={animateOpacity}>
          <div className={classes.solidBackground}>
            <LoremIpsum />
          </div>
        </SlideUnder>
      </div>
    </div>
  );
};

ExperimentsSlideUnder.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
