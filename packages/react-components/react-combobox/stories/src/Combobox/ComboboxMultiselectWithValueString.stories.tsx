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

export const MultiselectWithValueString = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-multi');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    // update selectedOptions
    setSelectedOptions(data.selectedOptions);

    // reset value to an empty string after selection
    setValue('');
  };

  // clear value on focus
  const onFocus = () => {
    setValue('');
  };

  // update value to selected options on blur
  const onBlur = () => {
    setValue(selectedOptions.join(', '));
  };

  // update value on input change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      <Combobox
        aria-labelledby={comboId}
        multiselect={true}
        placeholder="Select one or more animals"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onOptionSelect={onSelect}
        {...props}
      >
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};

MultiselectWithValueString.parameters = {
  docs: {
    description: {
      story:
        'Multiselect Combobox supports using a controlled value to' +
        'display selected options when not in focus, similar to v8 behavior.' +
        'We recommend using tags rather than the value string when possible,' +
        'since they have better UX and accessibility.',
    },
  },
};
