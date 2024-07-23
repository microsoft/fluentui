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
import { Tag, Avatar, tokens, makeStyles, Field } from '@fluentui/react-components';

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

const Example = ({ appearance }: Pick<TagPickerProps, 'appearance'>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker appearance={appearance} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
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
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0
            ? tagPickerOptions.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))
            : 'No options available'}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

const useStyles = makeStyles({
  darkBG: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted2,
    padding: '20px',
    marginBlock: '10px',
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const Appearance = () => {
  const styles = useStyles();
  return (
    <>
      <div>
        <h1>Outline</h1>
        <Example appearance="outline" />
      </div>
      <div>
        <h1>Underline</h1>
        <Example appearance="underline" />
      </div>
      <div className={styles.darkBG}>
        <h1>Filled Darker</h1>
        <Example appearance="filled-darker" />
      </div>
      <div className={styles.darkBG}>
        <h1>Filled Lighter</h1>
        <Example appearance="filled-lighter" />
      </div>
    </>
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

This is equivalent to the [\`Combobox\`](https://react.fluentui.dev/?path=/docs/components-combobox--default#appearance) \`appearance\` property.
      `,
    },
  },
};
