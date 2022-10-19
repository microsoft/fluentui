import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const UncontrolledValue = () => {
  const styles = useStyles();
  const labelId = useId('label');
  return (
    <div className={styles.field}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup defaultValue="pear" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
UncontrolledValue.parameters = {
  docs: {
    description: {
      story:
        'The initially selected item can be set by setting the `defaultValue` of RadioGroup. ' +
        'Alternatively, one Radio item can have `defaultChecked` set. ' +
        'Both methods have the same effect, but only one should be used in a given RadioGroup.',
    },
  },
};
