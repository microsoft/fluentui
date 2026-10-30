# @fluentui/react-tag-picker

**React TagPicker components for [Fluent UI React](https://react.fluentui.dev)**

To import React TagPicker components:

```jsx
import * as React from 'react';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-tag-picker';
import { Tag, Avatar } from '@fluentui/react-components';

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

export const Example = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <Tag key={option} shape="rounded" media={<Avatar name={option} color="colorful" />} value={option}>
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => !selectedOptions.includes(option))
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};
```

## Opt-in CSS Modules styles

CSS Modules alternatives are available for TagPickerButton, TagPickerControl,
TagPickerInput, TagPickerList, TagPickerGroup, TagPickerOption, and
TagPickerOptionGroup. Griffel remains the default. Opt in with a
bundler replacement of those `use*Styles.styles` modules by their
`use*Styles.styles.css` alternatives, handling both source imports and built
`.styles.js` → `.styles.css.js` imports. The bundler must process CSS Modules and
retain CSS assets in the `fluentui` layer.

TagPickerGroup, TagPickerOption, and TagPickerOptionGroup keep calling the public
TagGroup, Option, and OptionGroup style hooks from `@fluentui/react-tags` and
`@fluentui/react-combobox`. The resolver must also swap those packages' style
modules, including public re-exports, rather than only local TagPicker imports.
Base imports precede derived stylesheets so derived rules win equal-specificity
conflicts. TagPickerOptionGroup adds only stable slot classes and needs no own
stylesheet. Missing base replacements retain Griffel; selecting these alternatives
alone does not make the composition Griffel-free or establish mixed-mode parity.
