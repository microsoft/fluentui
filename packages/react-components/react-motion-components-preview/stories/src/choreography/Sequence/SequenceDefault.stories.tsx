import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { Blur, ScaleRelaxed, SlideRelaxed, Sequence } from '@fluentui/react-motion-components-preview';

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

export const Default = () => {
  const classes = useClasses();
  const duration = 700;
  const animateOpacity = true;

  const sequence = (
    <Sequence iterations="infinite">
      <Blur.In duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.In>
      <Blur.Out duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.Out>

      <Blur.In duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.In>
      <Blur.Out duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'blue', width: '100px', height: '100px', borderRadius: '50%' }} />
      </Blur.Out>

      <ScaleRelaxed.In duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </ScaleRelaxed.In>
      <ScaleRelaxed.Out duration={duration} animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </ScaleRelaxed.Out>

      <SlideRelaxed.In fromY="100%" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.In>
      <SlideRelaxed.Out fromY="100%" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.Out>

      <SlideRelaxed.In fromX="100%" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.In>
      <SlideRelaxed.Out fromX="100%" animateOpacity={animateOpacity}>
        <div style={{ backgroundColor: 'purple', width: '100px', height: '100px', borderRadius: '50%' }} />
      </SlideRelaxed.Out>
    </Sequence>
  );

  return (
    <div className={classes.container}>
      <div className={classes.card}>{sequence}</div>
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
