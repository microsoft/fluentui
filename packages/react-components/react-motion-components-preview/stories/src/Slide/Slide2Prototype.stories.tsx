import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Slide2 } from '@fluentui/react-motion-components-preview';

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

export const Slide2Prototype = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.root}>
      <Button onClick={() => setVisible(value => !value)}>Toggle Slide2</Button>
      <Slide2 visible={visible} fromX="-40px" restX="10px" toX="40px">
        <div className={classes.target}>from → rest → to</div>
      </Slide2>
    </div>
  );
};
