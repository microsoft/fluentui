import * as React from 'react';
import { Combobox, makeStyles, Option, typographyStyles, useId } from '@fluentui/react-components';
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
  description: {
    ...typographyStyles.caption1,
  },
});

export const Multiselect = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        onOptionSelect={onSelect}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
      {selectedOptions.length ? (
        <span id={selectedListId} className={styles.description}>
          Chosen pets: {selectedOptions.join(', ')}
        </span>
      ) : null}
    </div>
  );
};

Multiselect.parameters = {
  docs: {
    description: {
      story: 'Combobox supports multiselect, and options within a multiselect will display checkbox icons.',
    },
  },
};
