'use client';

import * as React from 'react';
import { Button } from '@fluentui/react-components';
import {
  FadeRelaxed,
  ScaleRelaxed,
  CollapseRelaxed,
  SlideRelaxed,
  Blur,
  Rotate,
} from '@fluentui/react-motion-components-preview';
import { useClasses } from './ComponentsGrid.styles';

interface ComponentCardProps {
  name: string;
  children: (visible: boolean) => React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ name, children }) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const toggleVisible = React.useCallback(() => setVisible(v => !v), []);

  return (
    <div className={classes.card}>
      <h4 className={classes.name}>{name}</h4>
      <div className={classes.demoArea}>{children(visible)}</div>
      <Button appearance="primary" size="small" onClick={toggleVisible}>
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
