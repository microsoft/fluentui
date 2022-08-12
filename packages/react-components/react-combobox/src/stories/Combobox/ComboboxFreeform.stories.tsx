import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import { Combobox, ComboboxProps, Option } from '@fluentui/react-combobox';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

export const Freeform = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} freeform placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

Freeform.parameters = {
  docs: {
    description: {
      story:
        'Combobox supports the `freeform` prop, which allows freeform text input. ' +
        'The input value will be reset on blur to reflect the selected options.',
    },
  },
};
