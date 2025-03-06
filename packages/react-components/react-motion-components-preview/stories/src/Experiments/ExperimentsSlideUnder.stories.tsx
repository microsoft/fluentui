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

export type SlideOrientation = 'horizontal' | 'vertical';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SlideUnderVariantParams = {
  /** Time (ms) for the enter transition. Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition. Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition. Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition. Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SlideUnderRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /**
   * The orientation of the slide animation: 'horizontal' or 'vertical'
   * @default 'vertical'
   */
  orientation?: SlideOrientation;

  /**
   * The distance of the slide, relative to the content's natural position.
   * Can be positive or negative, in pixels or other length units.
   * @default '10px'
   */
  distance?: string;
};

export const createSlideUnderPresence: PresenceMotionFnCreator<SlideUnderVariantParams, SlideUnderRuntimeParams> =
  ({
    enterDuration = motionTokens.durationNormal,
    enterEasing = motionTokens.curveDecelerateMid,
    exitDuration = enterDuration, // defaults to the enter duration for symmetry
    exitEasing = motionTokens.curveAccelerateMid,
  } = {}) =>
  ({ animateOpacity = !true, orientation = 'vertical', distance = '100%' }) => {
    // ----- ENTER -----
    const enterAtoms: AtomMotion[] = [
      slideAtom({
        direction: 'enter',
        orientation,
        distance,
        duration: enterDuration,
        easing: enterEasing,
      }),
      // { keyframes: [{ clipPath }, { clipPath }], duration: enterDuration, easing: enterEasing },
    ];
    if (animateOpacity) {
      enterAtoms.push(
        fadeAtom({
          direction: 'enter',
          duration: enterDuration,
          easing: enterEasing,
        }),
      );
    }

    // ----- EXIT -----
    const exitAtoms: AtomMotion[] = [
      slideAtom({
        direction: 'exit',
        orientation,
        distance,
        duration: exitDuration,
        easing: exitEasing,
      }),
      // { keyframes: [{ clipPath }, { clipPath }], duration: exitDuration, easing: exitEasing },
    ];
    if (animateOpacity) {
      exitAtoms.push(
        fadeAtom({
          direction: 'exit',
          duration: exitDuration,
          easing: exitEasing,
        }),
      );
    }

    return {
      enter: enterAtoms,
      exit: exitAtoms,
    };
  };

/** A React component that applies slide in/out transitions to its children. */
const SlideUnderInner = createPresenceComponent(createSlideUnderPresence());
export const SlideUnder = (props: React.ComponentProps<typeof SlideUnderInner>) => {
  return (
    // Wrapper to crop to the bounding box
    <div style={{ overflow: 'hidden' }}>
      <SlideUnderInner {...props} />
    </div>
  );
};

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

        <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field>
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
