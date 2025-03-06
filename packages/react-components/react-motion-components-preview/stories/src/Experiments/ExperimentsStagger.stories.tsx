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

const isFragment = (child: React.ReactNode): child is React.ReactElement => {
  return React.isValidElement(child) && child.type === React.Fragment;
};

// Convert children that is either React.Fragment or regular React.Children to an array of React elements
const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  if (isFragment(children)) {
    return React.Children.toArray(children.props.children) as React.ReactElement[];
  }
  return React.Children.toArray(children) as React.ReactElement[];
};

// A Stagger is a component that accepts JSX children and renders them in a staggered manner with a set delay
const Stagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  autoloop?: boolean;
}> = ({ children, delay = 500, autoloop = false }) => {
  const [index, setIndex] = React.useState(0);
  const components = childrenOrFragmentToArray(children);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index < components.length - 1) {
        setIndex(index + 1);
      } else if (autoloop) {
        setIndex(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, delay, components.length]);

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        if (i <= index) {
          return React.cloneElement(component, { key: i });
        }
        return null;
      })}
    </>
  );
};

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
    Component = Slide.In,
    props = {},
  }: {
    numItems: number;
    Component?: Function;
    props?: Record<string, any>;
  }) => {
    return Array.from({ length: numItems }, (_, i) => {
      const t = i / numItems;
      const backgroundColor = `hsl(${Math.floor(200 + t * 100)}, 100%, 50%)`;
      return (
        <Component key={i} animateOpacity={animateOpacity} enterDuration={duration} {...props}>
          <div style={{ backgroundColor, width: '25px', height: '25px', borderRadius: '0%' }} />
        </Component>
      );
    });
  };

  const stagger = (
    <Stagger delay={5}>
      {createMotionComponents({ numItems: 400, props: { orientation: 'horizontal', distance: '-200%' } })}
    </Stagger>
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

      <div className={classes.card}>{stagger}</div>
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
