import * as React from 'react';
import { makeStyles, tokens, Button, Select } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, scaleAtom, slideAtom, rotateAtom, blurAtom } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '24px',
    marginBottom: '24px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    padding: '20px',
  },
  demoBox: {
    width: '100px',
    height: '80px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
    boxShadow: tokens.shadow8,
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

type AtomType = 'fade' | 'scale' | 'slide' | 'rotate' | 'blur';

const createAtomMotion = (type: AtomType) => {
  const duration = motionTokens.durationNormal;
  const easing = motionTokens.curveDecelerateMid;

  switch (type) {
    case 'fade':
      return createMotionComponent(fadeAtom({ direction: 'enter', duration, easing }));
    case 'scale':
      return createMotionComponent(scaleAtom({ direction: 'enter', duration, easing, fromScale: 0.5 }));
    case 'slide':
      return createMotionComponent(slideAtom({ direction: 'enter', duration, easing, fromY: '30px' }));
    case 'rotate':
      return createMotionComponent(
        rotateAtom({ direction: 'enter', duration: 400, easing, axis: 'y', fromAngle: -180 }),
      );
    case 'blur':
      return createMotionComponent(blurAtom({ direction: 'enter', duration, easing, fromRadius: '10px' }));
    default:
      return createMotionComponent(fadeAtom({ direction: 'enter', duration, easing }));
  }
};

const atomLabels: Record<AtomType, string> = {
  fade: 'fadeAtom',
  scale: 'scaleAtom',
  slide: 'slideAtom',
  rotate: 'rotateAtom',
  blur: 'blurAtom',
};

export const AtomsDemo: React.FC = () => {
  const classes = useClasses();
  const [atomType, setAtomType] = React.useState<AtomType>('fade');
  const [key, setKey] = React.useState(0);

  const MotionComponent = React.useMemo(() => createAtomMotion(atomType), [atomType]);

  const handleAtomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAtomType(event.target.value as AtomType);
    setKey(k => k + 1);
  };

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
        <Button onClick={() => setKey(k => k + 1)}>Replay</Button>
        <span className={classes.label}>Select an atom to see its effect</span>
      </div>
      <div className={classes.demoArea}>
        <MotionComponent key={key}>
          <div className={classes.demoBox}>{atomLabels[atomType]}</div>
        </MotionComponent>
      </div>
    </div>
  );
};
