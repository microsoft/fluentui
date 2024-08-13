import * as React from 'react';
import { Button, Combobox, makeStyles, Option, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';
import { Dismiss12Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
});

export const MultiselectWithTags = (props: Partial<ComboboxProps>) => {
  // generate ids for handling labelling
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;

  // refs for managing focus when removing tags
  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagClick = (option: string, index: number) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter(o => o !== option));

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(`#${comboId}-remove-${indexToFocus}`);
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      {selectedOptions.length ? (
        <ul id={selectedListId} className={styles.tagsList} ref={selectedListRef}>
          {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
          <span id={`${comboId}-remove`} hidden>
            Remove
          </span>
          {selectedOptions.map((option, i) => (
            <li key={option}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<Dismiss12Regular />}
                iconPosition="after"
                onClick={() => onTagClick(option, i)}
                id={`${comboId}-remove-${i}`}
                aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        selectedOptions={selectedOptions}
        onOptionSelect={onSelect}
        ref={comboboxInputRef}
        {...props}
      >
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};

MultiselectWithTags.parameters = {
  docs: {
    description: {
      story:
        'Combobox can display multiselect values in custom tags. ' +
        'This example uses a controlled selection so the tags can be used to remove selected options.',
    },
  },
};
