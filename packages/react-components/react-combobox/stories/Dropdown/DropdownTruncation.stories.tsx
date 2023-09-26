import * as React from 'react';
import { Dropdown, makeStyles, Option, shorthands, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '200px',
  },
  listbox: {
    maxHeight: '200px',
  },
  valueText: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const TruncatedValue = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown');
  const options = [
    'Cat',
    'Caterpillar',
    'Corgi',
    'Chupacabra',
    'Dog',
    'Ferret',
    'Fish',
    'Fox',
    'Hamster',
    'Snake',
    'Screaming hairy armadillo (Chaetophractus vellerosus)',
  ];
  const styles = useStyles();

  const placeholder = 'Select an animal';
  const [value, setValue] = React.useState(placeholder);

  return (
    <div className={styles.root}>
      <label id={dropdownId}>Best pet</label>
      <Dropdown
        aria-labelledby={dropdownId}
        listbox={{ className: styles.listbox }}
        button={<span className={styles.valueText}>{value}</span>}
        onOptionSelect={(e, data) => setValue(data.optionText ?? placeholder)}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

TruncatedValue.parameters = {
  docs: {
    description: {
      story:
        'The Dropdown button slot can be customized to render child JSX, which can be used to truncate the value text.',
    },
  },
};
