import * as React from 'react';
import { Checkbox, Input, makeStyles, Radio, RadioGroup, SpinButton, Switch, tokens } from '@fluentui/react-components';
import { Combobox, Option } from '@fluentui/react-components/unstable';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const LabelBefore = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field
        label="Input"
        labelPosition="before"
        status="success"
        statusText="Status text appears below the input"
        helperText="Helper text does too"
      >
        <Input />
      </Field>
      <Field label="Spin button" labelPosition="before">
        <SpinButton min={1} max={99} />
      </Field>
      <Field label="Combobox" labelPosition="before">
        <Combobox>
          <Option>Option one</Option>
          <Option>Option two</Option>
          <Option>Option three</Option>
        </Combobox>
      </Field>
      <Field labelPosition="before" helperText="Prefer Checkbox's built-in label instead of the Field label">
        <Checkbox label="Checkbox" />
      </Field>
      <Field labelPosition="before" helperText="Prefer Switch's built-in label instead of the Field label">
        <Switch label="Switch" />
      </Field>
      <Field label="Radio" labelPosition="before">
        <RadioGroup>
          <Radio label="Option one" defaultChecked />
          <Radio label="Option two" />
          <Radio label="Option three" />
        </RadioGroup>
      </Field>
    </div>
  );
};
