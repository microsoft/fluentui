import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import { Dropdown, Option, OptionGroup } from '@fluentui/react-combobox';
import type { DropdownProps } from '@fluentui/react-combobox';

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

export const Grouped = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={dropdownId}>Best pet</label>
      <Dropdown aria-labelledby={dropdownId} placeholder="Select an animal" {...props}>
        <OptionGroup label="Land">
          {land.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Dropdown>
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story:
        'Dropdown options can be semantically grouped with the `OptionGroup` element, with an optional group label.',
    },
  },
};
