import * as React from 'react';
import type { JSXElement, TagPickerProps } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerOption,
  TagPickerGroup,
  Tag,
  Avatar,
  Field,
  DialogActions,
} from '@fluentui/react-components';

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

export const DialogWithTagPicker = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }

    setSelectedOptions(data.selectedOptions);
  };

  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Select People</DialogTitle>
          <DialogContent>
            <Field label="Select Employees" style={{ maxWidth: 400 }}>
              <TagPicker
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
                open={tagPickerOptions.length > 0}
              >
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
                  <TagPickerInput aria-label="Select Employees" />
                </TagPickerControl>

                <TagPickerList>
                  {tagPickerOptions.length > 0 ? (
                    tagPickerOptions.map(option => (
                      <TagPickerOption
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
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
