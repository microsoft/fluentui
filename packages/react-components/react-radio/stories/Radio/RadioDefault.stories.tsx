import * as React from 'react';
import type { RadioProps } from '@fluentui/react-components';
import { makeStyles, Radio, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const Default = (props: Partial<RadioProps>) => {
  const radioName = useId('radio');
  const styles = useStyles();
  const labelId = useId('label');
  return (
    <div className={styles.field}>
      <label id={labelId}>Favorite Color</label>
      <div role="radiogroup" aria-labelledby={labelId}>
        <Radio name={radioName} value="apple" label="Apple" {...props} />
        <Radio name={radioName} value="pear" label="Pear" {...props} />
        <Radio name={radioName} value="banana" label="Banana" {...props} />
        <Radio name={radioName} value="orange" label="Orange" {...props} />
      </div>
    </div>
  );
};
