'use client';

import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import {
  FadeRelaxed,
  ScaleRelaxed,
  CollapseRelaxed,
  SlideRelaxed,
  Blur,
  Rotate,
} from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  name: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
  },
  demoBox: {
    width: '50px',
    height: '50px',
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
});

interface ComponentCardProps {
  name: string;
  children: (visible: boolean) => React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ name, children }) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.card}>
      <h4 className={classes.name}>{name}</h4>
      <div className={classes.demoArea}>{children(visible)}</div>
      <Button appearance="primary" size="small" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};

export const ComponentsGrid: React.FC = () => {
  const classes = useClasses();

  return (
    <div className={classes.grid}>
      <ComponentCard name="Fade">
        {visible => (
          <FadeRelaxed visible={visible}>
            <div className={classes.demoBox}>Fade</div>
          </FadeRelaxed>
        )}
      </ComponentCard>

      <ComponentCard name="Scale">
        {visible => (
          <ScaleRelaxed visible={visible}>
            <div className={classes.demoBox}>Scale</div>
          </ScaleRelaxed>
        )}
      </ComponentCard>

      <ComponentCard name="Collapse">
        {visible => (
          <CollapseRelaxed visible={visible}>
            <div className={classes.demoBox}>Collapse</div>
          </CollapseRelaxed>
        )}
      </ComponentCard>

      <ComponentCard name="Slide">
        {visible => (
          <SlideRelaxed visible={visible}>
            <div className={classes.demoBox}>Slide</div>
          </SlideRelaxed>
        )}
      </ComponentCard>

      <ComponentCard name="Blur">
        {visible => (
          <Blur visible={visible}>
            <div className={classes.demoBox}>Blur</div>
          </Blur>
        )}
      </ComponentCard>

      <ComponentCard name="Rotate">
        {visible => (
          <Rotate visible={visible} outAngle={-90} inAngle={0} axis="z">
            <div className={classes.demoBox}>Rotate</div>
          </Rotate>
        )}
      </ComponentCard>
    </div>
  );
};
