import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  Label,
  Select,
  AtomMotion,
  createMotionComponent,
  motionTokens,
  createPresenceComponent,
  useId,
} from '@fluentui/react-components';

import { MotionComponentProps, PresenceComponent } from '@fluentui/react-motion/src/index';
import { Fade, Scale } from '@fluentui/react-motion-components-preview';
import { Series, Hold } from './Series';
import { PresenceStagger, Stagger } from './Stagger';

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
    visibility: 'hidden',
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
  carouselContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    perspective: '400px',
    overflow: 'hidden',
    // width: '500px',
    minHeight: '700px',
    // gap: '10px',
    gridArea: 'card',
    // padding: '10px',
    backgroundColor: 'black',
  },
  albumTitle: {
    color: 'white',
    fontSize: '60px',
    fontWeight: 'bold',
    fontFamily: 'OpenSans, Arial, sans-serif',
    // textAlign: 'left',
    marginTop: '80px',
    marginLeft: '50px',
  },
  photo: {
    color: 'white',
    fontSize: '40px',
    fontWeight: 'bold',
    fontFamily: 'OpenSans, Arial, sans-serif',
    borderRadius: '20px',
    backgroundColor: 'grey',
    padding: '20px',
    // width: '70px',
    height: '100%',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.8)', // Added drop shadow
  },
  photo3Up: {
    display: 'grid',
    width: '500px',
    height: '400px',
    marginLeft: '100px',
    marginTop: '150px',

    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(2, auto)',
    gap: '10px',
    gridTemplateAreas: `
      "photo1 photo1"
      "photo2 photo3"
    `,
    '& > :nth-child(1)': {
      gridArea: 'photo1',
    },
    '& > :nth-child(2)': {
      gridArea: 'photo2',
    },
    '& > :nth-child(3)': {
      gridArea: 'photo3',
    },
  },
  photo4Up: {
    display: 'grid',
    width: '500px',
    height: '400px',
    marginLeft: '100px',
    marginTop: '150px',

    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, auto)',
    gap: '10px',
    gridTemplateAreas: `
      "photo1 photo2"
      "photo3 photo4"
    `,
    '& > :nth-child(1)': {
      gridArea: 'photo1',
    },
    '& > :nth-child(2)': {
      gridArea: 'photo2',
    },
    '& > :nth-child(3)': {
      gridArea: 'photo3',
    },
    '& > :nth-child(4)': {
      gridArea: 'photo4',
    },
  },
});

// A motion component that fades in and slides in from the top over 1 second,
// holds in place for 3 seconds, and then fades out and slides out to the bottom over 1 second.
const TitleMotion = createMotionComponent({
  keyframes: [
    { transform: 'translateY(-100px)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'translateY(0)', opacity: 1, offset: 0.2 },
    { transform: 'translateY(0)', opacity: 1, offset: 0.8, easing: motionTokens.curveAccelerateMin },
    { transform: 'translateY(100px)', opacity: 0 },
  ],
  duration: 5000,
});

const PhotoMotion = createMotionComponent({
  keyframes: [
    { transform: 'scale(0.5)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'scale(1)', opacity: 1, offset: 0.1 },
    { transform: 'scale(1)', opacity: 1, offset: 0.9, easing: motionTokens.curveAccelerateMin },
    { transform: 'scale(0.5)', opacity: 0 },
  ],
  duration: 5000,
});

export const ExperimentsCarousel = () => {
  const classes = useClasses();
  // const [visible, setVisible] = React.useState<boolean>(false);
  // const [autoplay, setAutoplay] = React.useState<boolean>(false);
  // const [duration, setDuration] = React.useState<number>(1000);
  // const [animateOpacity, setAnimateOpacity] = React.useState(true);
  // const [orientation, setOrientation] = React.useState<'vertical' | 'horizontal'>('vertical');
  // const [distance, setDistance] = React.useState<string>('100%');

  // const orientationSelectId = useId();
  // const distanceSelectId = useId();
  // const durationSliderId = useId();
  // const durationMin = 200;
  // const durationMax = 2000;

  const photo3Stagger = (
    <Stagger delay={100}>
      <PhotoMotion>
        <div className={classes.photo}>A1</div>
      </PhotoMotion>

      <PhotoMotion>
        <div className={classes.photo}>A2</div>
      </PhotoMotion>

      <PhotoMotion>
        <div className={classes.photo}>A3</div>
      </PhotoMotion>
    </Stagger>
  );

  const photo4Stagger = (
    <Stagger delay={100}>
      <PhotoMotion>
        <div className={classes.photo}>B1</div>
      </PhotoMotion>

      <PhotoMotion>
        <div className={classes.photo}>B2</div>
      </PhotoMotion>

      <PhotoMotion>
        <div className={classes.photo}>B3</div>
      </PhotoMotion>

      <PhotoMotion>
        <div className={classes.photo}>B4</div>
      </PhotoMotion>
    </Stagger>
  );

  const screenA = (
    <>
      <TitleMotion>
        <div className={classes.albumTitle}>Album A</div>
      </TitleMotion>

      <div className={classes.photo3Up}>{photo3Stagger}</div>
    </>
  );

  const screenB = (
    <>
      <TitleMotion>
        <div className={classes.albumTitle}>Album B</div>
      </TitleMotion>

      <div className={classes.photo4Up}>{photo4Stagger}</div>
    </>
  );

  const screenSeries = (
    <Series autoloop>
      <Hold duration={6000}>{screenA}</Hold>
      <Hold duration={6000}>{screenB}</Hold>
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
      {/* <div className={classes.carouselContainer}>{screenA}</div> */}
      <div className={classes.carouselContainer}>{screenSeries}</div>
    </div>
  );
};

ExperimentsCarousel.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
