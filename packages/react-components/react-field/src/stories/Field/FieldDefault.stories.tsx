import * as React from 'react';
import { makeStyles, tokens, Input, Slider, SpinButton, RadioGroup, Radio } from '@fluentui/react-components';
import { Combobox, Option } from '@fluentui/react-components/unstable';
import { Field, FieldProps } from '@fluentui/react-field';
import { SparkleFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  stack: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'start',
    rowGap: tokens.spacingVerticalM,
  },
});

export const Default = (props: Partial<FieldProps>) => {
  return (
    <Field label="Example Field" helperText="This is just an example">
      <Input id="example-input-123" defaultValue="Some text" />
    </Field>
  );
};

export const AllControls = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Slider Field" status="error" statusText="Sample error message">
        <Slider min={0} max={50} />
      </Field>
      <Field label="Input Field" status="error" statusText="Sample error message">
        <Input />
      </Field>
      <Field label="SpinButton Field" status="error" statusText="Sample error message">
        <SpinButton />
      </Field>
      <Field label="Combobox Field" status="error" statusText="Sample error message">
        <Combobox>
          <Option>First option</Option>
          <Option>Second option</Option>
        </Combobox>
      </Field>
      <Field label="RadioGroup Field" status="error" statusText="Sample error message">
        <RadioGroup>
          <Radio label="Hello" />
          <Radio label="Radio" />
          <Radio label="World" />
        </RadioGroup>
      </Field>
    </div>
  );
};

export const LabelBefore = () => {
  return (
    <Field
      labelPosition="before"
      label="Label before the input"
      statusText="This is status"
      statusIcon={<SparkleFilled />}
      helperText="This is some help text"
    >
      <Input />
    </Field>
  );
};

export const Required = () => {
  return (
    <Field required label="Required input">
      <Input />
    </Field>
  );
};

export const Status = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Input with error" status="error" statusText="This is an error message" labelPosition="before">
        <Input defaultValue="This is invalid input" />
      </Field>
      <Field label="Input with error" status="error" statusText="This is an error message" labelPosition="before">
        <Input defaultValue="This is invalid input" appearance="underline" />
      </Field>
      <Field label="Input with error" status="error" statusText="This is an error message" labelPosition="before">
        <Input defaultValue="This is invalid input" appearance="filled-darker" />
      </Field>
      <Field label="Input with error" status="error" statusText="This is an error message" labelPosition="before">
        <Input defaultValue="This is invalid input" appearance="filled-lighter" />
      </Field>
      <Field label="Input with warning" status="warning" statusText="This is a warning message" labelPosition="before">
        <Input defaultValue="This input causes a warning" />
      </Field>
      <Field label="Input with success" status="success" statusText="This is a success message" labelPosition="before">
        <Input defaultValue="This is valid input" />
      </Field>
      <Field
        label="Input with custom status"
        statusIcon={<SparkleFilled />}
        statusText="This is a message for a custom status"
        labelPosition="before"
      >
        <Input />
      </Field>
    </div>
  );
};

export const HelperText = () => {
  return (
    <Field label="Channel name" helperText="Letters, numbers, and spaces are allowed">
      <Input defaultValue="Example name" />
    </Field>
  );
};
