import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, makeStyles, mergeClasses, Field } from '@fluentui/react-components';

type Option = { value: string; fixedWidth?: boolean };
const options: Option[] = [
  { value: 'John Doe' },
  { value: 'Jane Doe' },
  { value: 'Max Mustermann' },
  { value: 'Erika Mustermann' },
  { value: 'Pierre Dupont' },
  { value: 'Amelie Dupont' },
  { value: 'Maria Rossi' },
  {
    value: 'This tag has text truncation based on a fixed width of 50px',
    fixedWidth: true,
  },
  {
    value:
      'This tag has text truncation based on its container width. This is a long text that will be truncated when it reaches the end of the container.',
  },
];

const useStyles = makeStyles({
  tagTruncatedPrimaryText: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  tagPrimaryTextFixedWidth: {
    width: '50px',
  },
  optionContent: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  optionSecondaryContent: {
    whiteSpace: 'nowrap',
  },
});

export const TruncatedText = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(options);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions.map(option => options.find(o => o.value === option)!));
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));
  const styles = useStyles();

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions.map(option => option.value)}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag
                key={option.value}
                shape="rounded"
                media={<Avatar aria-hidden name={option.value} color="colorful" />}
                value={option.value}
                title={option.value}
                primaryText={{
                  className: mergeClasses(
                    styles.tagTruncatedPrimaryText,
                    option.fixedWidth && styles.tagPrimaryTextFixedWidth,
                  ),
                }}
              >
                {option.value}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0
            ? tagPickerOptions.map(option => (
                <TagPickerOption
                  secondaryContent={{ children: 'Microsoft FTE', className: styles.optionSecondaryContent }}
                  media={<Avatar shape="square" aria-hidden name={option.value} color="colorful" />}
                  value={option.value}
                  key={option.value}
                  title={option.value}
                  text={option.value}
                >
                  <div className={styles.optionContent}>{option.value}</div>
                </TagPickerOption>
              ))
            : 'No options available'}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

TruncatedText.parameters = {
  docs: {
    description: {
      story: `
Text truncation is a common pattern used to handle long text that doesn't fit within the available space. There are all sorts of ways to truncate text, in this example we're show casing two ways to truncate text:
- Using CSS to truncate text with ellipsis when the element reaches the end of its container.
- Using fixed width to truncate text with ellipsis when the text is longer than a certain width (50px in this case).

We do not support text truncation out of the box, as it's a complex and opinionated problem. However, you can easily achieve text truncation by using patterns like the ones shown in this example.
      `,
    },
  },
};
