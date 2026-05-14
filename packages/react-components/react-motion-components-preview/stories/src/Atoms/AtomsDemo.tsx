'use client';

import * as React from 'react';
import { Button, Select } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, scaleAtom, slideAtom, rotateAtom, blurAtom } from '@fluentui/react-motion-components-preview';
import { useClasses } from './AtomsDemo.styles';

type AtomType = 'fade' | 'scale' | 'slide' | 'rotate' | 'blur';

const demoDuration = 600;

const createAtomMotion = (type: AtomType) => {
  const easing = motionTokens.curveDecelerateMid;

  switch (type) {
    case 'fade':
      return createMotionComponent(fadeAtom({ direction: 'enter', duration: demoDuration, easing }));
    case 'scale':
      return createMotionComponent(scaleAtom({ direction: 'enter', duration: demoDuration, easing, outScale: 0.5 }));
    case 'slide':
      return createMotionComponent(slideAtom({ direction: 'enter', duration: demoDuration, easing, outY: '30px' }));
    case 'rotate':
      return createMotionComponent(
        rotateAtom({ direction: 'enter', duration: demoDuration, easing, axis: 'z', outAngle: -90 }),
      );
    case 'blur':
      return createMotionComponent(blurAtom({ direction: 'enter', duration: demoDuration, easing, outRadius: '10px' }));
    default: {
      const _exhaustive: never = type;
      throw new Error(`Unhandled atom type: ${_exhaustive}`);
    }
  }
};

const atomLabels: Record<AtomType, string> = {
  fade: 'fadeAtom',
  scale: 'scaleAtom',
  slide: 'slideAtom',
  rotate: 'rotateAtom',
  blur: 'blurAtom',
};

const atomCodeSnippets: Record<AtomType, string> = {
  fade: `fadeAtom({
  direction: 'enter',
  duration: 600,
  outOpacity: 0,
  inOpacity: 1,
})`,
  scale: `scaleAtom({
  direction: 'enter',
  duration: 600,
  outScale: 0.5,
  inScale: 1,
})`,
  slide: `slideAtom({
  direction: 'enter',
  duration: 600,
  outY: '30px',
  inY: '0px',
})`,
  rotate: `rotateAtom({
  direction: 'enter',
  duration: 600,
  axis: 'z',
  outAngle: -90,
  inAngle: 0,
})`,
  blur: `blurAtom({
  direction: 'enter',
  duration: 600,
  outRadius: '10px',
  inRadius: '0px',
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
          <option value="fade">fadeAtom</option>
          <option value="scale">scaleAtom</option>
          <option value="slide">slideAtom</option>
          <option value="rotate">rotateAtom</option>
          <option value="blur">blurAtom</option>
        </Select>
        <Button appearance="primary" onClick={handleReplay}>
          Replay
        </Button>
      </div>
      <div className={classes.body}>
        <div className={classes.demoArea}>
          <MotionComponent key={key}>
            <div className={classes.demoBox}>{atomLabels[atomType]}</div>
          </MotionComponent>
        </div>
        <pre className={classes.codeArea}>{atomCodeSnippets[atomType]}</pre>
      </div>
    </div>
  );
};
