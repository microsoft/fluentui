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
import { PresenceComponent } from '@fluentui/react-motion/src/index';
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

type MotionComponentDef = {
  fn: Function;
  props: Record<string, any>;
};

// A Series is a component that accepts an array of motion components and plays them in sequence
const Series: React.FC<{ components: MotionComponentDef[] }> = ({ components }) => {
  // const [currentComponent, setCurrentComponent] = React.useState(components[0]);
  const [index, setIndex] = React.useState(1);

  const currentComponent = components[index];
  const onMotionFinish = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  return <currentComponent.fn {...currentComponent.props} onMotionFinish={onMotionFinish} />;
};

const componentsA = ({ animateOpacity = true }): MotionComponentDef[] => [
  {
    fn: FadeRelaxed.In,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />,
    },
  },
  {
    fn: FadeRelaxed.Out,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />,
    },
  },

  {
    fn: ScaleRelaxed.In,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'blue', width: '100px', height: '100px' }} />,
    },
  },
  {
    fn: ScaleRelaxed.Out,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'blue', width: '100px', height: '100px' }} />,
    },
  },

  {
    fn: Collapse.In,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />,
    },
  },
  {
    fn: Collapse.Out,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />,
    },
  },

  {
    fn: Blur.In,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'orange', width: '100px', height: '100px' }} />,
    },
  },
  {
    fn: Blur.Out,
    props: {
      duration: 5000,
      animateOpacity,
      children: <div style={{ backgroundColor: 'orange', width: '100px', height: '100px' }} />,
    },
  },

  {
    fn: Slide.In,
    props: {
      duration: 5000,
      distance: '100%',
      orientation: 'vertical',
      animateOpacity,
      children: <div style={{ backgroundColor: 'darkgreen', width: '100px', height: '100px' }} />,
    },
  },
  {
    fn: Slide.Out,
    props: {
      duration: 5000,
      distance: '100%',
      orientation: 'vertical',
      animateOpacity,
      children: <div style={{ backgroundColor: 'darkgreen', width: '100px', height: '100px' }} />,
    },
  },

  {
    fn: Slide.In,
    props: {
      duration: 5000,
      distance: '100%',
      orientation: 'horizontal',
      animateOpacity,
      children: <div style={{ backgroundColor: 'darkRed', width: '100px', height: '100px' }} />,
    },
  },
  {
    fn: Slide.Out,
    props: {
      duration: 5000,
      distance: '100%',
      orientation: 'horizontal',
      animateOpacity,
      children: <div style={{ backgroundColor: 'darkRed', width: '100px', height: '100px' }} />,
    },
  },
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

      <div className={classes.card}>{seriesA}</div>
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
