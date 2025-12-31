import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, scaleAtom, slideAtom } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '24px',
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
  description: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80px',
  },
  demoBox: {
    width: '80px',
    height: '60px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  button: {
    minWidth: 'auto',
    padding: '4px 12px',
    fontSize: tokens.fontSizeBase200,
  },
});

// Custom "Pop" effect: fade + scale
const Pop = createPresenceComponent({
  enter: [
    fadeAtom({ direction: 'enter', duration: motionTokens.durationNormal }),
    scaleAtom({ direction: 'enter', duration: motionTokens.durationNormal, fromScale: 0.7 }),
  ],
  exit: [
    fadeAtom({ direction: 'exit', duration: motionTokens.durationFast }),
    scaleAtom({ direction: 'exit', duration: motionTokens.durationFast, fromScale: 0.7 }),
  ],
});

// Custom "FadeSlide" effect: fade + slide from bottom
const FadeSlide = createPresenceComponent({
  enter: [
    fadeAtom({ direction: 'enter', duration: motionTokens.durationNormal }),
    slideAtom({ direction: 'enter', duration: motionTokens.durationNormal, fromY: '20px' }),
  ],
  exit: [
    fadeAtom({ direction: 'exit', duration: motionTokens.durationFast }),
    slideAtom({ direction: 'exit', duration: motionTokens.durationFast, fromY: '20px' }),
  ],
});

// Custom "ScaleSlide" effect: scale + slide from left
const ScaleSlide = createPresenceComponent({
  enter: [
    scaleAtom({ direction: 'enter', duration: motionTokens.durationNormal, fromScale: 0.8 }),
    slideAtom({ direction: 'enter', duration: motionTokens.durationNormal, fromX: '-30px' }),
  ],
  exit: [
    scaleAtom({ direction: 'exit', duration: motionTokens.durationFast, fromScale: 0.8 }),
    slideAtom({ direction: 'exit', duration: motionTokens.durationFast, fromX: '-30px' }),
  ],
});

interface DemoPanelProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PresenceComponent: any;
}

const DemoPanel: React.FC<DemoPanelProps> = ({ title, description, PresenceComponent }) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.panel}>
      <h4 className={classes.title}>{title}</h4>
      <p className={classes.description}>{description}</p>
      <div className={classes.demoArea}>
        <PresenceComponent visible={visible}>
          <div className={classes.demoBox}>{title}</div>
        </PresenceComponent>
      </div>
      <Button className={classes.button} size="small" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};

export const ComposingAtomsDemo: React.FC = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <DemoPanel title="Pop" description="fade + scale" PresenceComponent={Pop} />
      <DemoPanel title="FadeSlide" description="fade + slide" PresenceComponent={FadeSlide} />
      <DemoPanel title="ScaleSlide" description="scale + slide" PresenceComponent={ScaleSlide} />
    </div>
  );
};
