import * as React from 'react';
import { Listbox, makeStyles, Option, shorthands } from '@fluentui/react-components';
import type { ListboxProps } from '@fluentui/react-components';

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

export const Default = (props: Partial<ListboxProps>) => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Listbox {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Listbox>
    </div>
  );
};
