import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const MinMax = (): JSXElement => {
  const styles = useStyles();
  const id = useId();
  const min = 10;
  const max = 50;
  return (
    <>
      <Label htmlFor={id}>Min/Max Example</Label>
      <div className={styles.wrapper}>
        <Label aria-hidden>{min}</Label>
        <Slider min={min} max={max} defaultValue={20} id={id} />
        <Label aria-hidden>{max}</Label>
      </div>
    </>
  );
};

MinMax.parameters = {
  docs: {
    description: {
      story: 'A slider with min and max values displayed',
    },
  },
};
