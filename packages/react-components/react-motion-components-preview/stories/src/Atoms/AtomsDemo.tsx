'use client';

import * as React from 'react';
import { Button, Select } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motion';
import { fade, scale, slide, rotate, blur } from '@fluentui/react-motion-components-preview';
import { useClasses } from './AtomsDemo.styles';

type AtomType = 'fade' | 'scale' | 'slide' | 'rotate' | 'blur';

const demoDuration = 600;

const createAtomMotion = (type: AtomType) => {
  const easing = motionTokens.curveDecelerateMid;

  switch (type) {
    case 'fade':
      return createMotionComponent(fade({ duration: demoDuration, easing, from: 0, to: 1 }));
    case 'scale':
      return createMotionComponent(scale({ duration: demoDuration, easing, from: 0.5, to: 1 }));
    case 'slide':
      return createMotionComponent(slide({ duration: demoDuration, easing, from: { y: '30px' }, to: { y: '0px' } }));
    case 'rotate':
      return createMotionComponent(rotate({ duration: demoDuration, easing, axis: 'z', from: -90, to: 0 }));
    case 'blur':
      return createMotionComponent(blur({ duration: demoDuration, easing, from: '10px', to: '0px' }));
    default: {
      const _exhaustive: never = type;
      throw new Error(`Unhandled atom type: ${_exhaustive}`);
    }
  }
};

const atomLabels: Record<AtomType, string> = {
  fade: 'fade',
  scale: 'scale',
  slide: 'slide',
  rotate: 'rotate',
  blur: 'blur',
};

const atomCodeSnippets: Record<AtomType, string> = {
  fade: `fade({
  duration: 600,
  from: 0,
  to: 1,
})`,
  scale: `scale({
  duration: 600,
  from: 0.5,
  to: 1,
})`,
  slide: `slide({
  duration: 600,
  from: { y: '30px' },
  to: { y: '0px' },
})`,
  rotate: `rotate({
  duration: 600,
  axis: 'z',
  from: -90,
  to: 0,
})`,
  blur: `blur({
  duration: 600,
  from: '10px',
  to: '0px',
})`,
};

export const AtomsDemo: React.FC = () => {
  const classes = useClasses();
  const [atomType, setAtomType] = React.useState<AtomType>('fade');
  const [key, setKey] = React.useState(0);

  const MotionComponent = React.useMemo(() => createAtomMotion(atomType), [atomType]);

  const handleAtomChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setAtomType(event.target.value as AtomType);
    setKey(k => k + 1);
  }, []);
  const handleReplay = React.useCallback(() => setKey(k => k + 1), []);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Select value={atomType} onChange={handleAtomChange}>
          <option value="fade">fade</option>
          <option value="scale">scale</option>
          <option value="slide">slide</option>
          <option value="rotate">rotate</option>
          <option value="blur">blur</option>
        </Select>
        <Button appearance="primary" onClick={handleReplay}>
          Replay
        </Button>
      </div>
      <div className={classes.body}>
        <div className={classes.demoArea}>
          {/* eslint-disable-next-line react-hooks/static-components */}
          <MotionComponent key={key}>
            <div className={classes.demoBox}>{atomLabels[atomType]}</div>
          </MotionComponent>
        </div>
        <pre className={classes.codeArea}>{atomCodeSnippets[atomType]}</pre>
      </div>
    </div>
  );
};
