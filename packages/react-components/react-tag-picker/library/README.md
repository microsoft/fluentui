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
TagPickerInput, and TagPickerList. Griffel remains the default. Opt in with a
bundler replacement of those `use*Styles.styles` modules by their
`use*Styles.styles.css` alternatives, handling both source imports and built
`.styles.js` → `.styles.css.js` imports. The bundler must process CSS Modules and
retain CSS assets in the `fluentui` layer.

TagPickerGroup, TagPickerOption, and TagPickerOptionGroup still compose style hooks
from other packages and are not included in this alternative. Selecting the four
standalone hooks does not make the entire TagPicker composition Griffel-free.
