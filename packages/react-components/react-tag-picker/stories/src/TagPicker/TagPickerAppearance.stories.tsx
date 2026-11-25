import * as React from 'react';
import type { JSXElement, TagPickerProps } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, tokens, makeStyles, mergeClasses, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

const Example = ({ appearance, label }: Pick<TagPickerProps, 'appearance'> & { label: string }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label={label}>
      <TagPicker appearance={appearance} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label={label}
            placeholder={selectedOptions.length === 0 ? 'Select employees' : undefined}
          />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    gap: tokens.spacingVerticalMNudge,
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    paddingBlock: tokens.spacingVerticalMNudge,
  },
  filledFields: {
    padding: tokens.spacingVerticalXXL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Example appearance="outline" label="Outline appearance (default)" />
      </div>
      <div className={styles.field}>
        <Example appearance="underline" label="Underline appearance" />
      </div>
      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledDarker)}>
        <Example appearance="filled-darker" label="Filled darker appearance (on Background 1)" />
      </div>
      <div className={mergeClasses(styles.field, styles.filledFields, styles.filledLighter)}>
        <Example appearance="filled-lighter" label="Filled lighter appearance (on Background 3)" />
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `
A \`TagPicker\` can have the following appearance variants:

* \`outline\` (default): has a border around all four sides.
* \`underline\`: only has a bottom border.
* \`filled-darker\`: no border, only a subtle background color difference against a white page. All tags will be by default \`outline\`.
* \`filled-lighter\`: no border, and a white background.

Place \`filled-lighter\` on \`colorNeutralBackground3\` and \`filled-darker\` on \`colorNeutralBackground1\`.
Without another identifying visual cue, keep selected tags visible and provide a descriptive placeholder when there are no selections.
Placeholder and value text must contrast at least 4.5:1 against their background.

This is equivalent to the [\`Combobox\`](https://react.fluentui.dev/?path=/docs/components-combobox--default#appearance) \`appearance\` property.
      `,
    },
  },
};
