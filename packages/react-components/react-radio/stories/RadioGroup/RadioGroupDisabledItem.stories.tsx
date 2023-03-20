import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const DisabledItem = () => {
  const styles = useStyles();
  const labelId = useId('label');
  return (
    <div className={styles.field}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup defaultValue="apple" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" disabled />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
DisabledItem.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled individually.',
    },
  },
};
