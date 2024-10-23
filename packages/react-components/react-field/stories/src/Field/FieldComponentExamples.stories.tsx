import * as React from 'react';

import {
  Checkbox,
  Combobox,
  Field,
  Input,
  makeResetStyles,
  Option,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  Textarea,
  tokens,
} from '@fluentui/react-components';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const ComponentExamples = () => (
  <div className={useStackClassName()}>
    <Field label="Input">
      <Input />
    </Field>
    <Field label="Textarea">
      <Textarea />
    </Field>
    <Field label="Combobox">
      <Combobox>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Combobox>
    </Field>
    <Field label="SpinButton">
      <SpinButton />
    </Field>
    <Field hint="Checkboxes use their own label instead of the Field label.">
      <Checkbox label="Checkbox" />
    </Field>
    <Field label="Slider">
      <Slider defaultValue={25} />
    </Field>
    <Field label="Switch">
      <Switch />
    </Field>
    <Field label="RadioGroup">
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
      </RadioGroup>
    </Field>
  </div>
);

ComponentExamples.storyName = 'Component Examples';
ComponentExamples.parameters = {
  docs: {
    description: {
      story: `Field can be used with any input components in this library. This story shows some examples.
        It can also be used to add a label or error text to components like ProgressBar.`,
    },
  },
};
