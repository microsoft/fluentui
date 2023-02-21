import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const Required = () => {
  const styles = useStyles();
  const labelId = useId('label-');
  return (
    <div className={styles.field}>
      <Label id={labelId} required>
        Favorite Fruit
      </Label>
      <RadioGroup aria-labelledby={labelId} required>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
Required.parameters = {
  docs: {
    description: {
      story: 'Use the `required` prop on `RadioGroup` to indicate that one of the radio items must be selected.',
    },
  },
};
