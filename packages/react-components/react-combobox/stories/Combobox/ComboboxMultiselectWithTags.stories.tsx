import * as React from 'react';
import { Combobox, makeStyles, Option, shorthands, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';
import { Tag, TagGroup, TagGroupProps } from '@fluentui/react-tags';

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
});

export const MultiselectWithTags = (props: Partial<ComboboxProps>) => {
  // generate ids for handling labelling
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;

  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagDismiss: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setSelectedOptions(selectedOptions.filter(o => o !== dismissedTagValue));
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      {selectedOptions.length ? (
        <TagGroup id={selectedListId} onDismiss={onTagDismiss}>
          {selectedOptions.map(option => (
            <Tag key={option} value={option} aria-label={`remove ${option}`}>
              {option}
            </Tag>
          ))}
        </TagGroup>
      ) : null}
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        selectedOptions={selectedOptions}
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

MultiselectWithTags.parameters = {
  docs: {
    description: {
      story:
        'Combobox can display multiselect values in custom tags. ' +
        'This example uses a controlled selection so the tags can be used to remove selected options.',
    },
  },
};
