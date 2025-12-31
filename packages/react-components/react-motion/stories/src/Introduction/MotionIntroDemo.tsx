import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: '24px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '100px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
    boxShadow: tokens.shadow8,
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export const MotionIntroDemo: React.FC = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.container}>
      <Fade visible={visible}>
        <div className={classes.card}>Hello, Motion!</div>
      </Fade>
      <Button appearance="primary" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      <span className={classes.label}>Click to toggle visibility with a fade animation</span>
    </div>
  );
};
