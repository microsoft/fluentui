import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  useId,
  Label,
  Slider,
  AtomMotion,
  motionTokens,
  PresenceMotionFn,
  createPresenceComponent,
  Avatar,
} from '@fluentui/react-components';
import { fadeAtom } from '../../../library/src/atoms/fade-atom';

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

const diagonalWipeKeyframes = ({ reverse = false } = {}) => {
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

// TODO: define wipe by angle?
// TODO: allow wipe-out to go forward rather than backward

const wipeKeyframes = () => {
  return { diagonal: diagonalWipeKeyframes() };
};

type WipeRuntimeParams = {
  enterDuration?: number;
  exitDuration?: number;
  enterEasing?: string;
  exitEasing?: string;
  animateOpacity?: boolean;
};

// Create a Wipe presence motion component that moves the element in a wipe path,
// from a starting radius to a target radius, and from a starting angle to a target angle.
const wipePresenceFn: PresenceMotionFn<WipeRuntimeParams> = ({
  enterDuration = 500,
  exitDuration = enterDuration,
  // enterEasing = motionTokens.curveDecelerateMin,
  enterEasing = motionTokens.curveDecelerateMin,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}: WipeRuntimeParams) => {
  // const keyframeDefs = {
  //   diagonal: [
  //     // beginning: mask is empty and the starting point is the top-left corner
  //     { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)' },
  //     // halfway: mask covers half along the diagonal from the bottom-left to the top-right
  //     { clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 100% 0%, 100% 0%)' },
  //     // end: mask is fully covering the element
  //     {
  //       clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 100%, 100% 0%)',
  //     },
  //   ],
  // };
  const keyframes = wipeKeyframes().diagonal;

  // create the enter and exit atoms
  const enterAtoms: AtomMotion[] = [
    {
      keyframes,
      duration: enterDuration,
      easing: enterEasing,
      // fill: 'forwards',
    },
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: enterDuration, easing: enterEasing }));
  }
  const exitAtoms: AtomMotion[] = [
    {
      // keyframes: [...keyframes].reverse(),
      keyframes: diagonalWipeKeyframes({ reverse: true }),
      duration: exitDuration,
      easing: exitEasing,
      // fill: 'forwards',
    },
  ];
  // TODO: fix element disappearing when exiting
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }
  // console.log('### enterAtoms', enterAtoms);
  // console.log('### exitAtoms', exitAtoms);
  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

const Wipe = createPresenceComponent(wipePresenceFn);

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
