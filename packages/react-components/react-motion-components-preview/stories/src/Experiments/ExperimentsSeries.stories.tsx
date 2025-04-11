import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  useId,
  Label,
  Select,
  AtomMotion,
  motionTokens,
  createPresenceComponent,
} from '@fluentui/react-components';
import { fadeAtom } from '../../../library/src/atoms/fade-atom';
import { slideAtom } from '../../../library/src/atoms/slide-atom';
import { PresenceMotionFnCreator } from '../../../library/src/types';
import { MotionComponentProps, PresenceComponent } from '@fluentui/react-motion/src/index';
import {
  Blur,
  Collapse,
  Fade,
  FadeRelaxed,
  ScaleRelaxed,
  Slide,
  SlideRelaxed,
  Series,
} from '@fluentui/react-motion-components-preview';

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

export const ExperimentsSeries = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>(700);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [orientation, setOrientation] = React.useState<'vertical' | 'horizontal'>('vertical');
  const [distance, setDistance] = React.useState<string>('100%');

  const orientationSelectId = useId();
  const distanceSelectId = useId();
  const durationSliderId = useId();
  const durationMin = 200;
  const durationMax = 2000;

  const series = (
    <Series autoloop>
      <Blur.In enterDuration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.In>
      <Blur.Out exitDuration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.Out>

      <Blur.In enterDuration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.In>
      <Blur.Out exitDuration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.Out>

      <ScaleRelaxed.In duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </ScaleRelaxed.In>
      <ScaleRelaxed.Out duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </ScaleRelaxed.Out>

      <SlideRelaxed.In distance="100%" orientation="vertical" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.In>
      <SlideRelaxed.Out distance="100%" orientation="vertical" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.Out>

      <SlideRelaxed.In distance="100%" orientation="horizontal" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.In>
      <SlideRelaxed.Out distance="100%" orientation="horizontal" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.Out>
    </Series>
  );

  return (
    <div className={classes.container}>
      <div>
        {/* <div className={classes.controls}> */}
        {/* <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field> */}

        {/* <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field> */}
      </div>

      <div className={classes.card}>{series}</div>
    </div>
  );
};

ExperimentsSeries.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
