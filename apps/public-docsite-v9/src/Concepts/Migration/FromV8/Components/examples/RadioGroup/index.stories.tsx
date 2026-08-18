import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field, Radio, RadioGroup, Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ChoiceGroup } from '@fluentui/react';
import type { IChoiceGroupOption, IChoiceGroupProps } from '@fluentui/react';
import type { RadioGroupProps } from '@fluentui/react-components';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/RadioGroup Migration',
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
  radioRoot: {
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  radioLabel: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXXS,
  },
  radioDescription: {
    color: tokens.colorNeutralForeground3,
  },
});

const basicOptions: IChoiceGroupOption[] = [
  { key: 'standard', text: 'Standard' },
  { key: 'priority', text: 'Priority' },
  { key: 'overnight', text: 'Overnight', disabled: true },
];

const RadioGroupV8BasicExample = () => {
  return <ChoiceGroup defaultSelectedKey="priority" label="Delivery speed" options={basicOptions} required />;
};

const RadioGroupV9BasicExample = () => {
  return (
    <Field label="Delivery speed" hint="Choose the default shipping promise." required>
      <RadioGroup defaultValue="priority">
        <Radio value="standard" label="Standard" />
        <Radio value="priority" label="Priority" />
        <Radio value="overnight" label="Overnight" disabled />
      </RadioGroup>
    </Field>
  );
};

const controlledOptions: IChoiceGroupOption[] = [
  { key: 'daily', text: 'Daily digest' },
  { key: 'weekly', text: 'Weekly summary' },
  { key: 'never', text: 'Only urgent updates' },
];

const RadioGroupV8ControlledSelectionExample = () => {
  const styles = useStyles();
  const [selectedKey, setSelectedKey] = React.useState('weekly');

  const onChange: IChoiceGroupProps['onChange'] = (_event, option) => {
    setSelectedKey(option?.key ?? '');
  };

  return (
    <div className={styles.section}>
      <ChoiceGroup
        label="Notification cadence"
        options={controlledOptions}
        selectedKey={selectedKey}
        onChange={onChange}
      />
      <Text className={styles.value}>Current selection: {selectedKey}</Text>
    </div>
  );
};

const RadioGroupV9ControlledSelectionExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('weekly');

  const onChange: RadioGroupProps['onChange'] = (_event, data) => {
    setValue(data.value);
  };

  return (
    <div className={styles.section}>
      <Field label="Notification cadence">
        <RadioGroup value={value} onChange={onChange}>
          <Radio value="daily" label="Daily digest" />
          <Radio value="weekly" label="Weekly summary" />
          <Radio value="never" label="Only urgent updates" />
        </RadioGroup>
      </Field>
      <Text className={styles.value}>Current selection: {value}</Text>
    </div>
  );
};

const customRenderOptions: IChoiceGroupOption[] = [
  {
    key: 'digest',
    text: 'Daily digest',
    onRenderLabel: () => (
      <div>
        <div>Daily digest</div>
        <div>Receive one summary every morning.</div>
      </div>
    ),
  },
  {
    key: 'alerts',
    text: 'Urgent alerts',
    onRenderLabel: () => (
      <div>
        <div>Urgent alerts</div>
        <div>Only interrupt the team for high-priority issues.</div>
      </div>
    ),
  },
];

const RadioGroupV8CustomOptionRenderExample = () => {
  return <ChoiceGroup defaultSelectedKey="digest" label="Notification style" options={customRenderOptions} />;
};

const RadioGroupV9ComposedRadioLabelExample = () => {
  const styles = useStyles();

  return (
    <Field label="Notification style">
      <RadioGroup defaultValue="digest">
        <Radio
          className={styles.radioRoot}
          value="digest"
          label={{
            className: styles.radioLabel,
            children: (
              <>
                <Text block weight="semibold">
                  Daily digest
                </Text>
                <Text className={styles.radioDescription} size={200}>
                  Receive one summary every morning.
                </Text>
              </>
            ),
          }}
        />
        <Radio
          className={styles.radioRoot}
          value="alerts"
          label={{
            className: styles.radioLabel,
            children: (
              <>
                <Text block weight="semibold">
                  Urgent alerts
                </Text>
                <Text className={styles.radioDescription} size={200}>
                  Only interrupt the team for high-priority issues.
                </Text>
              </>
            ),
          }}
        />
      </RadioGroup>
    </Field>
  );
};

const horizontalOptions: IChoiceGroupOption[] = [
  { key: 'compact', text: 'Compact' },
  { key: 'default', text: 'Default' },
  { key: 'comfortable', text: 'Comfortable' },
];

const RadioGroupV8HorizontalExample = () => {
  return (
    <ChoiceGroup
      defaultSelectedKey="default"
      label="Density"
      options={horizontalOptions}
      styles={{ flexContainer: { display: 'flex' } }}
    />
  );
};

const RadioGroupV9HorizontalExample = () => {
  return (
    <Field label="Density">
      <RadioGroup defaultValue="default" layout="horizontal">
        <Radio value="compact" label="Compact" />
        <Radio value="default" label="Default" />
        <Radio value="comfortable" label="Comfortable" />
      </RadioGroup>
    </Field>
  );
};

export const V8Basic: Story = {
  render: () => <RadioGroupV8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <RadioGroupV9BasicExample />,
};

export const V8ControlledSelection: Story = {
  render: () => <RadioGroupV8ControlledSelectionExample />,
};

export const V9ControlledSelection: Story = {
  render: () => <RadioGroupV9ControlledSelectionExample />,
};

export const V8CustomOptionRender: Story = {
  render: () => <RadioGroupV8CustomOptionRenderExample />,
};

export const V9ComposedRadioLabel: Story = {
  render: () => <RadioGroupV9ComposedRadioLabelExample />,
};

export const V8Horizontal: Story = {
  render: () => <RadioGroupV8HorizontalExample />,
};

export const V9Horizontal: Story = {
  render: () => <RadioGroupV9HorizontalExample />,
};
