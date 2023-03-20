import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const Labeled = () => {
  const styles = useStyles();
  const labelId = useId('label-');
  return (
    <div className={styles.field}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
Labeled.parameters = {
  docs: {
    description: {
      story:
        'Use the `aria-labelledby` property on RadioGroup to associate a label with the group.<br />' +
        '**Note**: The `<label>` attribute `htmlFor` does _not_ work with RadioGroup, as the group is not ' +
        'an input element. You must use `aria-labelledby` instead.',
    },
  },
};
