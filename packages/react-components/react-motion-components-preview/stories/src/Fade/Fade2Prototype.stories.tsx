import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Fade2 } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalM,
  },
  target: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

export const Fade2Prototype = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.root}>
      <Button onClick={() => setVisible(value => !value)}>Toggle Fade2</Button>
      <Fade2 visible={visible} fromOpacity={0.1} restOpacity={0.8} toOpacity={0.3}>
        <div className={classes.target}>0.1 → 0.8 → 0.3</div>
      </Fade2>
    </div>
  );
};
