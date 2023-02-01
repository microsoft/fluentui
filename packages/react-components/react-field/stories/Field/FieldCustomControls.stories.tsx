import * as React from 'react';

import {
  Checkbox,
  Combobox,
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
import { Field } from '@fluentui/react-components/unstable';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const CustomControls = () => (
  <div className={useStackClassName()}>
    <Field label="Combobox">
      <Combobox>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Combobox>
    </Field>
    <Field hint="Checkboxes should use their own label, not the Field label.">
      <Checkbox label="Checkbox" />
    </Field>
    <Field label="Input">
      <Input />
    </Field>
    <Field label="Radio group">
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
      </RadioGroup>
    </Field>
    <Field label="Textarea">
      <Textarea />
    </Field>
    <Field label="SpinButton">
      <SpinButton />
    </Field>
    <Field label="Switch">
      <Switch />
    </Field>
    <Field label="Slider">
      <Slider defaultValue={25} />
    </Field>
  </div>
);

CustomControls.parameters = {
  docs: {
    description: {
      story: `Field can be used with any of the form controls, including but not limited to these examples.`,
    },
  },
};
