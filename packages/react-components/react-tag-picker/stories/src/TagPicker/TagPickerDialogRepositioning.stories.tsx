import * as React from 'react';
import type { JSXElement, PositioningImperativeRef, TagPickerProps } from '@fluentui/react-components';
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
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Dialog
      surfaceMotion={{
        onMotionFinish: (_, { direction }) => {
          if (direction === 'enter') {
            positioningRef.current?.updatePosition();
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
                positioning={{ positioningRef }}
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
        'animation finishes. Use surfaceMotion.onMotionFinish to call positioningRef.updatePosition() on entry ' +
        'and correct the final position without delaying suggestions. This does not keep the dropdown aligned ' +
        'during the animation. Open the dialog, select a person, close it, and reopen it to check that the ' +
        'selection is preserved and the remaining suggestions are aligned after entry finishes.',
    },
  },
};
