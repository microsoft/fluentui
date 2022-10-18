import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const Horizontal = () => {
  const styles = useStyles();
  const labelId = useId('label');
  return (
    <div className={styles.field}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup layout="horizontal" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
Horizontal.storyName = 'Layout: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story: 'The `horizontal` layout places each radio item in a row, with labels after the radio indicator.',
    },
  },
};
