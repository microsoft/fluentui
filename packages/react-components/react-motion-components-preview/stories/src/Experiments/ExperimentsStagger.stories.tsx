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
  Wipe,
} from '@fluentui/react-motion-components-preview';
import { Series } from './Series';
import { Stagger } from './Stagger';

// import description from './ExperimentsWipe.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
    // perspective: '1000px',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    // gap: '10px',
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

export const ExperimentsStagger = () => {
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

  // a function to create an array of Blur.In components
  const createMotionComponents = ({
    numItems,
    itemSize = '25px',
    Component = Slide.In,
    props = {},
  }: {
    numItems: number;
    itemSize?: string;
    Component?: Function;
    props?: Record<string, any>;
  }) => {
    return Array.from({ length: numItems }, (_, i) => {
      const t = i / numItems;
      const backgroundColor = `hsl(${Math.floor(180 + t * 120)}, 100%, 50%)`;
      return (
        // <Blur.In>
        // <span>
        <Component key={i} animateOpacity={animateOpacity} enterDuration={duration} {...props}>
          <div style={{ backgroundColor, width: itemSize, height: itemSize, borderRadius: '0%' }} />
        </Component>
        // </span>
        // </Blur.In>
      );
    });
  };

  const seriesA = (
    <Series autoloop>
      <Stagger delay={20}>
        {createMotionComponents({
          Component: FadeRelaxed.In,
          numItems: 100,
          itemSize: '50px',
        })}
      </Stagger>

      <Stagger delay={20}>
        {createMotionComponents({
          Component: Slide.In,
          numItems: 100,
          itemSize: '50px',
          props: { orientation: 'vertical', distance: '200%' },
        })}
      </Stagger>

      <Stagger delay={20}>
        {createMotionComponents({
          Component: Slide.In,
          numItems: 100,
          itemSize: '50px',
          props: { orientation: 'horizontal', distance: '-400%' },
        })}
      </Stagger>
    </Series>
  );

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

      {/* <div className={classes.card}>{staggerB}</div> */}
      <div className={classes.card}>{seriesA}</div>
    </div>
  );
};

ExperimentsStagger.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
