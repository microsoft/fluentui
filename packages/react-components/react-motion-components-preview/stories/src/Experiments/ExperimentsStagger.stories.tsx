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
  createPresenceComponentVariant,
} from '@fluentui/react-components';
import { fadeAtom } from '../../../library/src/atoms/fade-atom';
import { slideAtom } from '../../../library/src/atoms/slide-atom';
import { PresenceMotionFnCreator } from '../../../library/src/types';
import {
  Blur,
  Collapse,
  createSlidePresence,
  Fade,
  FadeRelaxed,
  Rotate,
  Scale,
  ScaleRelaxed,
  Slide,
} from '@fluentui/react-motion-components-preview';
import { Series } from './Series';
import { PresenceStagger, Stagger } from './Stagger';
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
  staggerContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    perspective: '400px',
    overflow: 'hidden',
    // width: '500px',
    minHeight: '500px',
    // gap: '10px',
    gridArea: 'card',
    // padding: '10px',
  },
});

const curveSpringRelaxed = `linear(
  0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017,
  1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
  1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,
  0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1
)`;

const curveBounceHard = `linear(
    0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765,
    1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785,
    0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953,
    0.973, 1, 0.988, 0.984, 0.988, 1
  )`;

const curveElastic = `linear(
    0, 0.218 2.1%, 0.862 6.5%, 1.114, 1.296 10.7%, 1.346, 1.37 12.9%, 1.373,
    1.364 14.5%, 1.315 16.2%, 1.032 21.8%, 0.941 24%, 0.891 25.9%, 0.877,
    0.869 27.8%, 0.87, 0.882 30.7%, 0.907 32.4%, 0.981 36.4%, 1.012 38.3%, 1.036,
    1.046 42.7% 44.1%, 1.042 45.7%, 0.996 53.3%, 0.988, 0.984 57.5%, 0.985 60.7%,
    1.001 68.1%, 1.006 72.2%, 0.998 86.7%, 1
  )`;

const curveEmphasized = `linear(
    0, 0.002, 0.01 3.6%, 0.034, 0.074 9.1%, 0.128 11.4%, 0.194 13.4%, 0.271 15%,
    0.344 16.1%, 0.544, 0.66 20.6%, 0.717 22.4%, 0.765 24.6%, 0.808 27.3%,
    0.845 30.4%, 0.883 35.1%, 0.916 40.6%, 0.942 47.2%, 0.963 55%, 0.979 64%,
    0.991 74.4%, 0.998 86.4%, 1
  )`;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

// const FadeExtraGentle = createPresenceComponent(
//   createFadePresence({ enterDuration: motionTokens.durationGentle * 5, enterEasing: motionTokens.curveAccelerateMin }),
// );

const FadeExtraGentle = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationGentle * 5,
  easing: motionTokens.curveAccelerateMin,
});

const SlideSpringy = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationNormal * 5,
    enterEasing: curveSpringRelaxed,
    exitDuration: motionTokens.durationNormal * 5,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

const SlideElastic = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationNormal * 10,
    enterEasing: curveElastic,
    exitDuration: motionTokens.durationNormal * 10,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

const SlideBouncy = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationNormal * 2,
    enterEasing: curveBounceHard,
    exitDuration: motionTokens.durationNormal * 2,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

const SlideMagnetic = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationNormal * 5,
    enterEasing: motionTokens.curveAccelerateMax,
    exitDuration: motionTokens.durationNormal * 5,
    // exitEasing: motionTokens.curveAccelerateMax,
    exitEasing: curveEmphasized,
  }),
);

// const ScaleCompletely = createPresenceComponent(
//   createScalePresence({
//     fromScale: 0,
//     enterDuration: motionTokens.durationSlow * 10,
//     enterEasing: motionTokens.curveAccelerateMax,
//     exitDuration: motionTokens.durationSlow * 10,
//     exitEasing: curveEmphasized,
//   }),
// );

const ScaleCompletely = createPresenceComponentVariant(Scale, {
  fromScale: 0,
  duration: motionTokens.durationSlow * 10,
  easing: motionTokens.curveAccelerateMax,
  exitEasing: curveEmphasized,
});

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
  const createStaggerForMotion = ({
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
      const backgroundColor = `hsl(${Math.floor(180 + t * 120)}, 100%, 40%)`;
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
      <PresenceStagger mode="enter" delay={20}>
        {createStaggerForMotion({
          Component: FadeExtraGentle,
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="exit" delay={20}>
        {createStaggerForMotion({
          Component: Blur,
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="enter" delay={20}>
        {createStaggerForMotion({
          Component: Wipe,
          props: {},
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="exitReverse" delay={20}>
        {createStaggerForMotion({
          Component: Wipe,
          props: {},
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <Stagger delay={30}>
        {createStaggerForMotion({
          Component: SlideElastic.In,
          props: { orientation: 'vertical', distance: '100%' },
          numItems: 100,
          itemSize: '50px',
        })}
      </Stagger>

      <PresenceStagger mode="exit" delay={50}>
        {createStaggerForMotion({
          Component: SlideMagnetic,
          props: { orientation: 'horizontal', distance: '-200%' },
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <Stagger delay={50}>
        {createStaggerForMotion({
          Component: SlideMagnetic.In,
          props: { orientation: 'horizontal', distance: '200%' },
          numItems: 100,
          itemSize: '50px',
        })}
      </Stagger>

      <PresenceStagger mode="enterReverse" delay={50}>
        {createStaggerForMotion({
          Component: SlideBouncy,
          props: { orientation: 'vertical', distance: '-200%', animateOpacity: false },
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="exit" delay={50}>
        {createStaggerForMotion({
          Component: Rotate,
          props: {
            axis: 'Y',
            enterAngle: 90,
            enterDuration: motionTokens.durationSlow * 2,
            enterEasing: motionTokens.curveAccelerateMid,
          },
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="enterReverse" delay={50}>
        {createStaggerForMotion({
          Component: Rotate,
          props: { axis: 'X', enterDuration: motionTokens.durationSlow * 8, enterEasing: curveSpringRelaxed },
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      <PresenceStagger mode="exit" delay={50}>
        {createStaggerForMotion({
          Component: ScaleCompletely,
          props: {},
          numItems: 100,
          itemSize: '50px',
        })}
      </PresenceStagger>

      {/* <Stagger delay={20}>
        {createMotionComponents({
          Component: Slide.In,
          numItems: 100,
          itemSize: '50px',
          props: { orientation: 'horizontal', distance: '-400%' },
        })}
      </Stagger> */}
    </Series>
  );

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
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

      {/* <div className={classes.card}>{staggerB}</div> */}
      <div className={classes.staggerContainer}>{seriesA}</div>
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
