import * as React from 'react';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Multiselect = (props: Partial<DropdownProps>) => {
  const comboId = useId('combo-multi');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

Multiselect.parameters = {
  docs: {
    description: {
      story: 'Dropdown supports multiselect, and options within a multiselect will display checkbox icons.',
    },
  },
};
