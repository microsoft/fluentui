import * as React from 'react';
import { Combobox, Option, useComboboxFilter } from '@fluentui/react-headless-components-preview/combobox';
import type { ComboboxProps } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular } from '@fluentui/react-icons';
import styles from './combobox.module.css';

const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

export const Filtering = (): React.ReactNode => {
  const [query, setQuery] = React.useState('');

  const children = useComboboxFilter({
    query,
    options,
    noOptionsElement: (
      <Option value="no-matches" disabled className={styles.option}>
        No animals match your search
      </Option>
    ),
    renderOption: option => (
      <Option
        key={option}
        value={option}
        className={styles.option}
        checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
      >
        {option}
      </Option>
    ),
  });

  const onOptionSelect: ComboboxProps['onOptionSelect'] = (_event, data) => {
    setQuery(data.optionText ?? '');
  };

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="combobox-filtering">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-filtering"
        placeholder="Select an animal"
        value={query}
        onChange={event => setQuery(event.target.value)}
        onOptionSelect={onOptionSelect}
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
      >
        {children}
      </Combobox>
    </div>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story: 'The `useComboboxFilter` hook filters options by the typed query and renders headless options.',
    },
  },
};
