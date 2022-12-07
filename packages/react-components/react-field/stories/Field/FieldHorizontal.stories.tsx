import * as React from 'react';
import {
  Checkbox,
  Input,
  makeStyles,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Textarea,
  tokens,
} from '@fluentui/react-components';
import { Combobox, Option, Progress, Select } from '@fluentui/react-components/unstable';
import { Field } from '../../src/index';

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Horizontal = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field
        label="Horizontal"
        orientation="horizontal"
        validationState="success"
        validationMessage="Validation message appears below the input."
        hint="Hint text does too."
      >
        <Input />
      </Field>
      <Field label="Longer labels will wrap to multiple lines" orientation="horizontal">
        <Input />
      </Field>
      <Field label="First Name" orientation="horizontal">
        <Input />
      </Field>
      <Field label="Last Name" orientation="horizontal">
        <Input />
      </Field>
      <Field required validationState="error" orientation="horizontal">
        <Checkbox label="This is the checkbox label" />
      </Field>
      <Field required validationState="error" label="RadioGroup" orientation="horizontal">
        <RadioGroup>
          <Radio label="Option 1" value="1" />
          <Radio label="Option 2" value="2" />
          <Radio label="Option 3" value="3" />
        </RadioGroup>
      </Field>
      <Field required validationState="error" label="Slider" orientation="horizontal">
        <Slider />
      </Field>
      <Field required validationState="error" label="Switch" orientation="horizontal">
        <Switch />
      </Field>
      <Field required validationState="error" label="Textarea" orientation="horizontal">
        <Textarea />
      </Field>
      <Field required validationState="error" label="Combobox" orientation="horizontal">
        <Combobox>
          <Option>Option 1</Option>
          <Option>Option 2</Option>
          <Option>Option 3</Option>
        </Combobox>
      </Field>
      <Field required validationState="error" label="Select" orientation="horizontal">
        <Select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Select>
      </Field>
      <Field required validationState="error" label="Progress" orientation="horizontal">
        <Progress validationState="error" />
      </Field>
    </div>
  );
};

Horizontal.storyName = 'Field orientation: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story:
        'The field can have a horizontal orientation. If multiple fields are stacked together and all the same ' +
        'width, the inputs will be vertically aligned as well.',
    },
  },
};
