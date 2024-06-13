import * as React from 'react';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

export const Freeform = (props: Partial<ComboboxProps>) => {
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
  const [customSearch, setCustomSearch] = React.useState<string | undefined>();
  const styles = useStyles();

  const onChange: ComboboxProps['onChange'] = event => {
    const value = event.target.value.trim();
    const matches = options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
    setMatchingOptions(matches);
    if (value.length && matches.length < 1) {
      setCustomSearch(value);
    } else {
      setCustomSearch(undefined);
    }
  };

  const onOptionSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    const matchingOption = data.optionText && options.includes(data.optionText);
    if (matchingOption) {
      setCustomSearch(undefined);
    } else {
      setCustomSearch(data.optionText);
    }
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Find pets</label>
      <Combobox
        aria-labelledby={comboId}
        freeform
        placeholder="Select an animal"
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        {...props}
      >
        {customSearch ? (
          <Option key="freeform" text={customSearch}>
            Search for "{customSearch}"
          </Option>
        ) : null}
        {matchingOptions.map(option => (
          <Option key={option}>{option}</Option>
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
        'Implementing filtering together with `freeform` is generally recommended.' +
        "We also recommend displaying a custom freeform string if the user input doesn't match an existing option.",
    },
  },
};
