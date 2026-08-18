import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { makeStyles, tokens } from '@fluentui/react-components';

import { TextField } from '@fluentui/react/lib/TextField';
import type { ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Field, Text, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Textarea Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXS,
  },
  value: {
    color: tokens.colorNeutralForeground3,
  },
});

const TextareaV8BasicExample = () => {
  return <TextField label="Release summary" multiline rows={4} />;
};

const TextareaV9BasicExample = () => {
  return (
    <Field label="Release summary" hint="Summaries appear in the deployment history.">
      <Textarea rows={4} />
    </Field>
  );
};

const TextareaV8ResizeAndRowsExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <TextField label="Non-resizable notes" multiline rows={4} resizable={false} />
      <TextField label="Tall notes" multiline rows={6} defaultValue="Ships with the weekly release." />
    </div>
  );
};

const TextareaV9ResizeAndRowsExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Field label="Non-resizable notes">
        <Textarea rows={4} resize="none" />
      </Field>
      <Field label="Tall notes">
        <Textarea rows={6} defaultValue="Ships with the weekly release." />
      </Field>
    </div>
  );
};

const TextareaV8ControlledExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('Ship the migration checklist.');

  const onChange: ITextFieldProps['onChange'] = (_event, nextValue) => {
    setValue(nextValue ?? '');
  };

  return (
    <div className={styles.section}>
      <TextField label="Controlled multiline TextField" multiline rows={4} value={value} onChange={onChange} />
      <Text className={styles.value}>Current value: {value}</Text>
    </div>
  );
};

const TextareaV9ControlledExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('Ship the migration checklist.');

  const onChange: TextareaProps['onChange'] = (_event, data) => {
    setValue(data.value);
  };

  return (
    <div className={styles.section}>
      <Field label="Controlled Textarea">
        <Textarea rows={4} value={value} onChange={onChange} />
      </Field>
      <Text className={styles.value}>Current value: {value}</Text>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <TextareaV8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <TextareaV9BasicExample />,
};

export const V8ResizeAndRows: Story = {
  render: () => <TextareaV8ResizeAndRowsExample />,
};

export const V9ResizeAndRows: Story = {
  render: () => <TextareaV9ResizeAndRowsExample />,
};

export const V8ControlledTextarea: Story = {
  render: () => <TextareaV8ControlledExample />,
};

export const V9ControlledTextarea: Story = {
  render: () => <TextareaV9ControlledExample />,
};
