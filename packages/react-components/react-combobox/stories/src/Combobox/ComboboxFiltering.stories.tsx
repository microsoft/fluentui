import * as React from 'react';
import { Combobox, ComboboxProps, makeStyles, useComboboxFilter, useId } from '@fluentui/react-components';

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

const options = [
  { children: 'Alligator', value: 'Alligator' },
  { children: 'Bee', value: 'Bee' },
  { children: 'Bird', value: 'Bird' },
  { children: 'Cheetah', disabled: true, value: 'Cheetah' },
  { children: 'Dog', value: 'Dog' },
  { children: 'Dolphin', value: 'Dolphin' },
  { children: 'Ferret', value: 'Ferret' },
  { children: 'Firefly', value: 'Firefly' },
  { children: 'Fish', value: 'Fish' },
  { children: 'Goat', value: 'Goat' },
  { children: 'Horse', value: 'Horse' },
  { children: 'Lion', value: 'Lion' },
];

export const Filtering = () => {
  const comboId = useId();
  const styles = useStyles();

  const [query, setQuery] = React.useState<string>('');
  const children = useComboboxFilter(query, options, {
    noOptionsMessage: 'No animals match your search.',
  });
  const onOptionSelect: ComboboxProps['onOptionSelect'] = (e, data) => {
    setQuery(data.optionText ?? '');
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        onOptionSelect={onOptionSelect}
        aria-labelledby={comboId}
        placeholder="Select an animal"
        onChange={ev => setQuery(ev.target.value)}
        value={query}
      >
        {children}
      </Combobox>
    </div>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story: `
We provide "useComboboxFilter()" hook to filter the options based on the user-typed string. It can be configured for a custom filter function, custom message, and custom render function.

We recommend using filtering when creating a freeform Combobox.
      `.trim(),
    },
  },
};
