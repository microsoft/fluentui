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
  { children: <em>Alligator</em>, value: '1' },
  { children: 'Bee', value: '2' },
  { children: 'Bird', value: '3' },
  { children: 'Cheetah', disabled: true, value: '4' },
  { children: 'Dog', value: '5' },
  { children: 'Dolphin', value: '6' },
  { children: 'Ferret', value: '7' },
  { children: 'Firefly', value: '8' },
  { children: 'Fish', value: '9' },
  { children: 'Goat', value: '10' },
  { children: 'Horse', value: '11' },
  { children: 'Lion', value: '12' },
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
