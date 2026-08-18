import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { makeStyles, tokens } from '@fluentui/react-components';

import { TextField } from '@fluentui/react/lib/TextField';
import type { ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Field, Input, Text } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Input Migration',
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
  slotText: {
    color: tokens.colorNeutralForeground3,
  },
});

const InputV8BasicExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <TextField label="Project name" required />
      <TextField label="Disabled" disabled defaultValue="Contoso migration" />
      <TextField label="Error state" defaultValue="ct" errorMessage="Use at least three characters." />
    </div>
  );
};

const InputV9BasicExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Field label="Project name" hint="Used in release notes." required>
        <Input required />
      </Field>
      <Field label="Disabled" hint="Disable the input when editing is not allowed.">
        <Input disabled defaultValue="Contoso migration" />
      </Field>
      <Field label="Error state" validationState="error" validationMessage="Use at least three characters.">
        <Input defaultValue="ct" />
      </Field>
    </div>
  );
};

const InputV8PrefixSuffixExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <TextField label="Budget" prefix="$" suffix="USD" defaultValue="25" />
      <TextField label="Search" iconProps={{ iconName: 'Search' }} defaultValue="Keyboard shortcuts" />
    </div>
  );
};

const InputV9ContentSlotsExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Field label="Budget">
        <Input
          contentBefore={<span className={styles.slotText}>$</span>}
          contentAfter={<span className={styles.slotText}>USD</span>}
          defaultValue="25"
        />
      </Field>
      <Field label="Search">
        <Input contentBefore={<SearchRegular aria-hidden="true" />} defaultValue="Keyboard shortcuts" />
      </Field>
    </div>
  );
};

const InputV8ControlledExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('contoso');

  const onChange: ITextFieldProps['onChange'] = (_event, nextValue) => {
    setValue(nextValue ?? '');
  };

  return (
    <div className={styles.section}>
      <TextField label="Controlled TextField" value={value} onChange={onChange} />
      <Text className={styles.value}>Current value: {value}</Text>
    </div>
  );
};

const InputV9ControlledExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('contoso');

  const onChange: InputProps['onChange'] = (_event, data) => {
    setValue(data.value);
  };

  return (
    <div className={styles.section}>
      <Field label="Controlled Input">
        <Input value={value} onChange={onChange} />
      </Field>
      <Text className={styles.value}>Current value: {value}</Text>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <InputV8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <InputV9BasicExample />,
};

export const V8PrefixSuffix: Story = {
  render: () => <InputV8PrefixSuffixExample />,
};

export const V9ContentSlots: Story = {
  render: () => <InputV9ContentSlotsExample />,
};

export const V8Controlled: Story = {
  render: () => <InputV8ControlledExample />,
};

export const V9Controlled: Story = {
  render: () => <InputV9ControlledExample />,
};
