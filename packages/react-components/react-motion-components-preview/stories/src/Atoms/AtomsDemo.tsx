import * as React from 'react';
import { makeStyles, tokens, Button, Select } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, scaleAtom, slideAtom, rotateAtom, blurAtom } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '24px',
    marginBottom: '24px',
    overflow: 'hidden',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '16px 20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  body: {
    display: 'flex',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px',
    flex: '0 0 200px',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '20px',
  },
  demoBox: {
    width: '100px',
    height: '80px',
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  codeArea: {
    flex: '1 1 auto',
    minWidth: '0',
    padding: '16px 20px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    overflow: 'auto',
    '@media (max-width: 600px)': {
      borderLeft: 'none',
      borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'pre',
    margin: '0',
    display: 'block',
  },
});

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
    default:
      return createMotionComponent(fadeAtom({ direction: 'enter', duration: demoDuration, easing }));
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
        <Button appearance="primary" onClick={() => setKey(k => k + 1)}>
          Replay
        </Button>
      </div>
      <div className={classes.body}>
        <div className={classes.demoArea}>
          <MotionComponent key={key}>
            <div className={classes.demoBox}>{atomLabels[atomType]}</div>
          </MotionComponent>
        </div>
        <div className={classes.codeArea}>
          <code className={classes.code}>{atomCodeSnippets[atomType]}</code>
        </div>
      </div>
    </div>
  );
};
