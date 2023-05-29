import * as React from 'react';
import { Combobox, makeStyles, Option, shorthands, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';
import { TagButton, TagGroup, TagGroupProps } from '@fluentui/react-tags';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
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
  hilightedTag: {
    backgroundColor: 'pink',
  },
});

export const MultiselectWithTagButtons = (props: Partial<ComboboxProps>) => {
  // generate ids for handling labelling
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;

  // refs for managing focus when removing tags
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagDismiss: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    if (hilightedTagValues.includes(dismissedTagValue)) {
      // bulk delete
      const newSelectionOptions = selectedOptions.filter(o => !hilightedTagValues.includes(o));
      setSelectedOptions(newSelectionOptions);
      setHilightedTagValues([]);
      if (!newSelectionOptions.length) {
        // focus on input
        comboboxInputRef.current?.focus();
      }
    } else {
      // delete one
      const newSelectionOptions = selectedOptions.filter(o => o !== dismissedTagValue);
      setSelectedOptions(newSelectionOptions);
      if (!newSelectionOptions.length) {
        // focus on input
        comboboxInputRef.current?.focus();
      }
    }
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  const [hilightedTagValues, setHilightedTagValues] = React.useState<string[]>([]);

  const toggleHilightedTag = (value: string) => {
    const newHilightedTagValues = [...hilightedTagValues];
    if (hilightedTagValues.includes(value)) {
      newHilightedTagValues.splice(newHilightedTagValues.indexOf(value), 1);
      setHilightedTagValues(newHilightedTagValues);
    } else {
      newHilightedTagValues.push(value);
      setHilightedTagValues(newHilightedTagValues);
    }
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      {selectedOptions.length ? (
        <TagGroup id={selectedListId} onDismiss={onTagDismiss}>
          {selectedOptions.map(option => (
            <TagButton
              key={option}
              value={option}
              content={{
                onClick: () => {
                  toggleHilightedTag(option);
                },
              }}
              className={hilightedTagValues.includes(option) ? styles.hilightedTag : undefined}
              aria-selected={hilightedTagValues.includes(option) ? 'true' : 'false'}
              dismissButton={{
                'aria-label':
                  hilightedTagValues.length && hilightedTagValues.includes(option)
                    ? 'remove selection'
                    : `remove ${option}`,
              }}
            >
              {option}
            </TagButton>
          ))}
        </TagGroup>
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

MultiselectWithTagButtons.parameters = {
  docs: {
    description: {
      story:
        'Combobox can display multiselect values in custom tags. ' +
        'This example uses a controlled selection so the tags can be used to remove selected options.',
    },
  },
};
