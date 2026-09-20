import * as React from 'react';
import type { ComboboxProps } from '@fluentui/react-modern-components-preview/combobox';
import { Combobox, Option, useComboboxFilter } from '@fluentui/react-modern-components-preview/combobox';
import { makeStyles, useId } from '@fluentui/react-components';

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
  'Alligator',
  'Bee',
  'Bird',
  'Cheetah',
  'Dog',
  'Dolphin',
  'Ferret',
  'Firefly',
  'Fish',
  'Goat',
  'Horse',
  'Lion',
];

export const Filtering = (): React.ReactNode => {
  const comboId = useId();
  const styles = useStyles();

  const [query, setQuery] = React.useState<string>('');
  const children = useComboboxFilter({
    query,
    options,
    noOptionsElement: <Option disabled>No animals match your search.</Option>,
    renderOption: option => (
      <Option key={option} disabled={option === 'Cheetah'}>
        {option}
      </Option>
    ),
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
