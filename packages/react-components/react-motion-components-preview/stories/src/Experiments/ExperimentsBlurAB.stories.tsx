import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  useId,
  Label,
  Slider,
  Select,
  Image,
  motionTokens,
} from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

import { Hold, Series } from './Series';

const imageUrls = [
  'https://picsum.photos/id/15/800/800',
  'https://picsum.photos/id/16/800/800',
  'https://picsum.photos/id/17/800/800',
  'https://picsum.photos/id/18/800/800',
  'https://picsum.photos/id/19/800/800',
  'https://picsum.photos/id/20/800/800',
  'https://picsum.photos/id/21/800/800',
  'https://picsum.photos/id/22/800/800',
];

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
  photo: {
    width: '300px',
    height: '300px',
  },
  series: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const ExperimentsBlurAB = () => {
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

  const curveSpringRelaxed = `linear(
    0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017,
    1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
    1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,
    0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1
  )`;

  const contentA = (
    <div key={1} className={classes.card}>
      <Image key={1} fit="cover" src={imageUrls[0]} className={`${classes.photo}`} />
    </div>
  );
  const contentB = (
    <div key={2} className={classes.card}>
      <Image key={2} fit="cover" src={imageUrls[1]} className={`${classes.photo}`} />
    </div>
  );

  // const easing = [motionTokens.curveDecelerateMid, motionTokens.curveAccelerateMid];
  return (
    <div className={classes.container}>
      {/* <div className={classes.controls}>
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
      </div> */}

      <div style={{ perspective, perspectiveOrigin: '50% 50%', display: 'inline' }}>
        <Series
          autoloop
          commonProps={{
            axis: 'Y',
            enterDuration: duration,
            enterEasing: motionTokens.curveDecelerateMin,
            exitEasing: motionTokens.curveAccelerateMin,
            radius: '10px',
          }}
        >
          <Blur.In>{contentA}</Blur.In>
          <Hold duration={2000}>{contentA}</Hold>
          <Blur.Out>{contentA}</Blur.Out>

          <Blur.In>{contentB}</Blur.In>
          <Hold duration={2000}>{contentB}</Hold>
          <Blur.Out>{contentB}</Blur.Out>
        </Series>
      </div>
    </div>
  );
};

ExperimentsBlurAB.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
