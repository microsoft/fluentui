import * as React from 'react';
import { Combobox, makeStyles, Option, shorthands, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

export const Filtering = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = [
    'Cat',
    'Caterpillar',
    'Catfish',
    'Cheetah',
    'Chicken',
    'Cockatiel',
    'Cow',
    'Dog',
    'Dolphin',
    'Ferret',
    'Firefly',
    'Fish',
    'Fox',
    'Fox Terrier',
    'Frog',
    'Hamster',
    'Snake',
  ];
  const [matchingOptions, setMatchingOptions] = React.useState([...options]);
  const styles = useStyles();

  const onChange: ComboboxProps['onChange'] = event => {
    const value = event.target.value.trim();
    const matches = options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
    setMatchingOptions(matches);
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" onChange={onChange} {...props}>
        {matchingOptions.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
        {matchingOptions.length === 0 ? (
          <Option key="no-results" text="">
            No results found
          </Option>
        ) : null}
      </Combobox>
    </div>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story:
        'Filtering based on the user-typed string can be achieved by modifying the child Options directly.' +
        'We recommend implementing filtering when creating a freeform Combobox.',
    },
  },
};
