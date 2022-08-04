import * as React from 'react';
import {
  Checkbox,
  Input,
  makeStyles,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  tokens,
} from '@fluentui/react-components';
import { Combobox, Option } from '@fluentui/react-components/unstable';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const LabelAbove = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Input">
        <Input />
      </Field>
      <Field label="Slider">
        <Slider defaultValue={20} />
      </Field>
      <Field label="Spin button">
        <SpinButton />
      </Field>
      <Field label="Combobox">
        <Combobox>
          <Option>Option one</Option>
          <Option>Option two</Option>
          <Option>Option three</Option>
        </Combobox>
      </Field>
      <Field helperText="Prefer Checkbox's built-in label instead of the Field label">
        <Checkbox label="Checkbox" />
      </Field>
      <Field helperText="Prefer Switch's built-in label instead of the Field label">
        <Switch label="Switch" />
      </Field>
      <Field label="Radio">
        <RadioGroup>
          <Radio label="Option one" defaultChecked />
          <Radio label="Option two" />
          <Radio label="Option three" />
        </RadioGroup>
      </Field>
    </div>
  );
};
