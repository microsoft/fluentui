import { createMotionComponent, Image, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import * as React from 'react';

import { createSequenceComponent, Hold, Scale, Sequence, Slide } from '@fluentui/react-motion-components-preview';

import description from './CarouselStep3.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    gridArea: 'card',
    padding: '10px',
  },
  solidBackground: {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    padding: '20px',
  },
  controls: {
    display: 'none',
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
  },
  staggerContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    perspective: '400px',
    overflow: 'hidden',
    minHeight: '500px',
    gridArea: 'card',
  },
  carouselContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    perspective: '400px',
    overflow: 'hidden',
    minHeight: '700px',
    gridArea: 'card',
    backgroundColor: 'black',
  },
  albumTitle: {
    color: 'white',
    fontSize: '60px',
    fontWeight: 'bold',
    fontFamily: 'OpenSans, Arial, sans-serif',
    marginTop: '80px',
    marginLeft: '50px',
  },
  photo: {
    borderRadius: '20px',
    backgroundColor: 'grey',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.8)', // Added drop shadow
  },

  photo3Up: {
    display: 'grid',
    width: '500px',
    height: '400px',
    marginLeft: '100px',
    marginTop: '100px',

    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '200px 200px',
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
    marginTop: '100px',

    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '200px 200px',
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

const imageUrls = [
  'https://picsum.photos/id/15/800/800',
  'https://picsum.photos/id/16/800/800',
  'https://picsum.photos/id/17/800/800',
  'https://picsum.photos/id/18/800/800',
  'https://picsum.photos/id/19/800/800',
  'https://picsum.photos/id/20/800/800',
  'https://picsum.photos/id/21/800/800',
  'https://picsum.photos/id/22/800/800',
];

// A motion component that fades in and slides in from the top over 1 second,
// holds in place for 3 seconds, and then fades out and slides out to the bottom over 1 second.
const TitleMotion = createMotionComponent({
  keyframes: [
    { transform: 'translateY(-100px)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'translateY(0)', opacity: 1, offset: 0.2 },
    { transform: 'translateY(0)', opacity: 1, offset: 0.8, easing: motionTokens.curveAccelerateMin },
    { transform: 'translateY(100px)', opacity: 0 },
  ],
  duration: 2000,
});

const PhotoMotion = createMotionComponent({
  keyframes: [
    { transform: 'scale(0.5)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'scale(1)', opacity: 1, offset: 0.1 },
    { transform: 'scale(1)', opacity: 1, offset: 0.9, easing: motionTokens.curveAccelerateMin },
    { transform: 'scale(0.5)', opacity: 0 },
  ],
  duration: 2000,
});

const TitleSequence = createSequenceComponent({
  motions: [
    <Slide.In fromY="-100px" duration={400} easing={motionTokens.curveDecelerateMin} />,
    <Hold duration={1200} />,
    <Slide.Out fromY="100px" duration={400} easing={motionTokens.curveAccelerateMin} />,
  ],
});

const PhotoSequence = createSequenceComponent({
  motions: [
    <Scale.In fromScale={0.5} duration={200} easing={motionTokens.curveDecelerateMin} />,
    <Hold duration={1600} />,
    <Scale.Out fromScale={0.5} duration={200} easing={motionTokens.curveAccelerateMin} />,
  ],
});

export const CarouselStep3 = () => {
  const classes = useClasses();

  const titleA = <div className={classes.albumTitle}>Album A</div>;
  const sceneA = (
    <Hold duration={3000}>
      <TitleSequence>{titleA}</TitleSequence>

      <div className={classes.photo3Up}>
        <PhotoSequence>
          <Image block fit="cover" src={imageUrls[0]} className={`${classes.photo}`} />
        </PhotoSequence>

        <PhotoSequence>
          <Image block fit="cover" src={imageUrls[1]} className={`${classes.photo}`} />
        </PhotoSequence>

        <PhotoSequence>
          <Image block fit="cover" src={imageUrls[2]} className={`${classes.photo}`} />
        </PhotoSequence>
      </div>
    </Hold>
  );

  const titleB = <div className={classes.albumTitle}>Album B</div>;
  const sceneB = (
    <Hold duration={3000}>
      <TitleSequence>{titleB}</TitleSequence>

      <div className={classes.photo4Up}>
        <PhotoSequence>
          <Image fit="cover" src={imageUrls[3]} className={`${classes.photo}`} />
        </PhotoSequence>

        <PhotoSequence>
          <Image fit="cover" src={imageUrls[4]} className={`${classes.photo}`} />
        </PhotoSequence>

        <PhotoSequence>
          <Image fit="cover" src={imageUrls[5]} className={`${classes.photo}`} />
        </PhotoSequence>

        <PhotoSequence>
          <Image fit="cover" src={imageUrls[6]} className={`${classes.photo}`} />
        </PhotoSequence>
      </div>
    </Hold>
  );

  const sceneSequence = (
    <Sequence iterations={Infinity}>
      {sceneA}
      {sceneB}
    </Sequence>
  );

  return (
    <div className={classes.container}>
      <div className={classes.carouselContainer}>{sceneSequence}</div>
    </div>
  );
};

CarouselStep3.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
