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

// import description from './ExperimentsSpiral.stories.md';

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
    position: 'relative',
    left: '200px',
    top: '100px',
    height: '200px',
    // backgroundColor: tokens.colorNeutralBackground1Hover,
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

const curveSpringRelaxed = `linear(
  0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017,
  1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
  1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%,
  0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1
)`;

type AngleDegrees = number;

type SpiralRuntimeParams = {
  outRadius?: number;
  inRadius?: number;
  angle?: AngleDegrees;
  revolutions?: number;
  enterDuration?: number;
  exitDuration?: number;
  enterEasing?: string;
  exitEasing?: string;
  animateOpacity?: boolean;
};

/**
 * Creates a lerp function for linear interpolation between two values.
 * @param a
 * @param b
 * @returns A function that takes a value t between 0 and 1 and returns the interpolated value.
 * @example
 * const valueAtT = lerper(0, 100);
 * const valueA = valueAtT(0); // 0
 * const valueB = valueAtT(0.5); // 50
 * const valueC = valueAtT(1); // 100
 */
const lerper =
  (a = 0, b = 1) =>
  (t: number) =>
    a * (1 - t) + b * t;

const toDegrees = (radians: number) => {
  return (radians * 180) / Math.PI;
};

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

type Range = [number, number];

const mapRange = (value: number, [inMin, inMax]: Range, [outMin, outMax]: Range) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Generates a custom range mapping function that
 * maps a value from one range to another.
 *
 * @example
 * const valueAtT = mapper([0, 1], [0, 100]);
 * const valueA = valueAtT(0); // 0
 * const valueB = valueAtT(0.5); // 50
 * const valueC = valueAtT(1); // 100
 */
const mapper =
  ([inMin, inMax]: Range, [outMin, outMax]: Range) =>
  (value: number) =>
    mapRange(value, [inMin, inMax], [outMin, outMax]);

// Create a Spiral presence motion component that moves the element in a spiral path,
// from a starting radius to a target radius, and from a starting angle to a target angle.
const spiralPresenceFn: PresenceMotionFn<SpiralRuntimeParams> = ({
  // element,
  outRadius = 200,
  inRadius = 50,
  angle = 0,
  revolutions = 0.5,
  enterDuration = 500,
  exitDuration = enterDuration,
  // enterEasing = motionTokens.curveDecelerateMin,
  enterEasing = curveSpringRelaxed,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}: SpiralRuntimeParams) => {
  // calculate the keyframes for the spiral motion
  const keyframes = [];
  const numFrames = 100;
  const angleChange = revolutions * 360;
  const inAngle = angle;
  const outAngle = inAngle - angleChange;

  const radiusAtT = mapper([0, 1], [outRadius, inRadius]);
  const angleAtT = mapper([0, 1], [outAngle, inAngle]);

  for (let i = 0; i <= numFrames; i++) {
    const t = i / numFrames;
    const r = radiusAtT(t);
    const angleRad = toRadians(angleAtT(t));
    const x = r * Math.cos(angleRad);
    const y = r * Math.sin(angleRad);

    keyframes.push({ transform: `translate(${x}px, ${y}px)` });
  }
  // create the enter and exit atoms
  const enterAtoms: AtomMotion[] = [
    {
      keyframes,
      duration: enterDuration,
      easing: enterEasing,
      fill: 'both',
    },
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: enterDuration, easing: enterEasing }));
  }
  const exitAtoms: AtomMotion[] = [
    {
      keyframes: [...keyframes].reverse(),
      duration: exitDuration,
      easing: exitEasing,
      fill: 'both',
    },
  ];
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }
  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

const Spiral = createPresenceComponent(spiralPresenceFn);

const avatarItems = [
  { name: 'Lydia Bauer', status: 'available' },
  { name: 'Amanda Brady', status: 'busy' },
  { name: 'Henry Brill', status: 'out-of-office' },
  { name: 'Robin Counts', status: 'away' },
  { name: 'Tim Deboer', status: 'blocked' },
  { name: 'Cameron Evans', status: 'do-not-disturb' },
  { name: 'Wanda Howard', status: 'blocked' },
];

// generalize avatarSpiral3 and avatarSpiral5 to accept a number of items
// and a radius, and use the number of items to calculate the angles
const AvatarSpiral = ({
  numItems = 3,
  visible,
  duration,
  autoplay,
  setVisible,
  classes,
  inRadius = 50,
}: {
  visible: boolean;
  duration: number;
  autoplay: boolean;
  setVisible: (visible: boolean) => void;
  classes: ReturnType<typeof useClasses>;
  numItems?: number;
  inRadius?: number;
}) => {
  const angleIncrement = 360 / numItems;

  return (
    <>
      {Array.from({ length: numItems }, (_, i) => {
        const name = avatarItems[i % avatarItems.length].name;
        const status = avatarItems[i % avatarItems.length].status;
        return (
          <Spiral
            key={i}
            visible={visible}
            appear
            angle={i * angleIncrement}
            inRadius={inRadius}
            enterDuration={duration}
            onMotionFinish={() => autoplay && setVisible(v => !v)}
          >
            <div className={classes.itemWrapper}>
              <Avatar key={name} name={name} badge={{ status: status as any }} />
            </div>
          </Spiral>
        );
      })}
    </>
  );
};

export const ExperimentsSpiral = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<number>(50);
  const [duration, setDuration] = React.useState<number>(500);
  const [quantity, setQuantity] = React.useState<number>(5);
  const radiusSliderId = useId();
  const durationSliderId = useId();
  const quantitySliderId = useId();
  const radiusMin = 30;
  const radiusMax = 70;
  const durationMin = 50;
  const durationMax = 1000;
  const quantityMin = 3;
  const quantityMax = 8;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        <Label weight="semibold" htmlFor={quantitySliderId}>
          quantity: {quantity}
        </Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{quantityMin}</Label>
          <Slider
            min={quantityMin}
            max={quantityMax}
            defaultValue={5}
            // step={1}
            id={quantitySliderId}
            onChange={(_, data) => {
              setQuantity(data.value);
            }}
          />
          <Label aria-hidden>{quantityMax}</Label>
        </div>

        <Label weight="semibold" htmlFor={durationSliderId}>
          duration: {duration}
        </Label>
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

        <Label weight="semibold" htmlFor={radiusSliderId}>
          radius: {radius}
        </Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{radiusMin}</Label>
          <Slider
            min={radiusMin}
            max={radiusMax}
            defaultValue={radius}
            id={radiusSliderId}
            onChange={(_, data) => {
              setRadius(data.value);
            }}
          />
          <Label aria-hidden>{radiusMax}</Label>
        </div>
      </div>

      <div className={classes.card}>
        <AvatarSpiral
          {...{
            numItems: quantity,
            visible,
            inRadius: radius,
            duration,
            autoplay,
            setVisible,
            classes,
          }}
        />
      </div>
    </div>
  );
};

ExperimentsSpiral.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
