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
import { Blur, Collapse, Fade, FadeRelaxed, ScaleRelaxed, Slide } from '@fluentui/react-motion-components-preview';

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

// A Series is a component that accepts an array of motion components and plays them in sequence
const SeriesB: React.FC<{ components: React.ReactElement[] }> = ({ components }) => {
  const [index, setIndex] = React.useState(0);

  const currentComponent = components[index];
  const onMotionFinish = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  return React.cloneElement(currentComponent, { onMotionFinish });
};

const componentsB = ({ animateOpacity = true }): React.ReactElement[] => [
  <Blur.In animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Blur.In>,
  <Blur.Out animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Blur.Out>,
  <Blur.In animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Blur.In>,
  <Blur.Out animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Blur.Out>,
  <Collapse.In animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Collapse.In>,
  <Collapse.Out animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Collapse.Out>,
  <ScaleRelaxed.In animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </ScaleRelaxed.In>,
  <ScaleRelaxed.Out animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </ScaleRelaxed.Out>,
  <Slide.In distance="100%" orientation="vertical" animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Slide.In>,
  <Slide.Out distance="100%" orientation="vertical" animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Slide.Out>,
  <Slide.In distance="100%" orientation="horizontal" animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Slide.In>,
  <Slide.Out distance="100%" orientation="horizontal" animateOpacity={animateOpacity}>
    <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
  </Slide.Out>,
];

export const ExperimentsSeries = () => {
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

  const seriesA = <Series components={componentsA({ animateOpacity })} />;
  const seriesB = <SeriesB components={componentsB({ animateOpacity })} />;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        {/* <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field> */}

        <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field>
      </div>

      <div className={classes.card}>{seriesB}</div>
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
