'use client';

import * as React from 'react';
import { Button, Card } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';
import { useClasses } from './MotionIntroDemo.styles';

export const MotionIntroDemo: React.FC = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  const handleToggle = React.useCallback(() => {
    setVisible(v => !v);
  }, []);

  return (
    <div className={classes.demo}>
      <Fade visible={visible}>
        <Card appearance="filled" className={classes.card}>
          Hello, Motion! ✨
        </Card>
      </Fade>
      <Button appearance="primary" onClick={handleToggle}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};
