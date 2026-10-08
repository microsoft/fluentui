import * as React from 'react';
import type { JSXElement, TagPickerProps } from '@fluentui/react-components';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
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
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Dialog
      onOpenChange={(_, data) => {
        if (!data.open) {
          setOpen(false);
        }
      }}
      surfaceMotion={{
        onMotionFinish: (_, { direction }) => {
          if (direction === 'enter') {
            setOpen(true);
          }
        },
      }}
    >
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Select People</DialogTitle>
          <DialogContent>
            <Field label="Select Employees" style={{ maxWidth: '75%' }}>
              <TagPicker
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
                open={open && tagPickerOptions.length > 0}
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
                  {tagPickerOptions.map(option => (
                    <TagPickerOption
                      key={option}
                      value={option}
                      media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                    >
                      {option}
                    </TagPickerOption>
                  ))}
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

DialogWithTagPicker.parameters = {
  docs: {
    description: {
      story:
        'When suggestions are available immediately, the dropdown can be positioned before the Dialog entry ' +
        'animation finishes. Use surfaceMotion.onMotionFinish to open suggestions after entry finishes, and ' +
        'reset that state when the dialog closes. Open the dialog, select a person, close it, and reopen it ' +
        'to check that the selection is preserved and the remaining suggestions open in the correct position ' +
        'after each entry animation.',
    },
  },
};
