import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field, SpinButton, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { SpinButtonChangeEvent, SpinButtonOnChangeData, SpinButtonProps } from '@fluentui/react-components';
import { SpinButton as SpinButtonV8 } from '@fluentui/react/lib/SpinButton';
import type { ISpinButtonProps } from '@fluentui/react/lib/SpinButton';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/SpinButton Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const storageQuotaMin = 5;
const storageQuotaMax = 50;
const storageQuotaStep = 5;
const storageQuotaUnit = 'GB';

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

const formatStorageQuota = (value: number): string => `${value} ${storageQuotaUnit}`;

const parseCommittedNumber = (displayValue: string): number | undefined => {
  const trimmedValue = displayValue.trim();

  if (trimmedValue === '') {
    return undefined;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const parseStorageQuota = (displayValue: string): number | undefined => {
  const match = displayValue.trim().match(/^-?\d+(\.\d+)?/);

  if (!match) {
    return undefined;
  }

  const parsedValue = Number(match[0]);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const clampStorageQuota = (value: number): number => Math.min(storageQuotaMax, Math.max(storageQuotaMin, value));

const SpinButtonV8BasicExample = () => {
  return (
    <SpinButtonV8
      label="Seats"
      defaultValue="4"
      min={1}
      max={10}
      step={1}
      incrementButtonAriaLabel="Increase seats"
      decrementButtonAriaLabel="Decrease seats"
    />
  );
};

const SpinButtonV9BasicExample = () => {
  return (
    <Field label="Seats" orientation="horizontal" hint="Buttons and arrow keys step within the configured bounds.">
      <SpinButton
        defaultValue={4}
        min={1}
        max={10}
        step={1}
        incrementButton={{ 'aria-label': 'Increase seats' }}
        decrementButton={{ 'aria-label': 'Decrease seats' }}
      />
    </Field>
  );
};

const SpinButtonV8StringValueExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <SpinButtonV8
        label="Storage quota"
        defaultValue={formatStorageQuota(25)}
        min={storageQuotaMin}
        max={storageQuotaMax}
        step={storageQuotaStep}
        incrementButtonAriaLabel="Increase storage quota"
        decrementButtonAriaLabel="Decrease storage quota"
      />
      <Text className={styles.value}>V8 stores the committed value as a formatted string.</Text>
    </div>
  );
};

const SpinButtonV9NumericAndDisplayValueExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <Field label="Storage quota" hint="Keep a numeric source of truth and format the rendered text separately.">
        <SpinButton
          value={25}
          displayValue={formatStorageQuota(25)}
          readOnly
          min={storageQuotaMin}
          max={storageQuotaMax}
          step={storageQuotaStep}
        />
      </Field>
      <Text className={styles.value}>V9 separates numeric state from the formatted display string.</Text>
    </div>
  );
};

const SpinButtonV8FormattedStringCallbacksExample = () => {
  const onIncrement: ISpinButtonProps['onIncrement'] = currentValue => {
    const parsedValue = parseStorageQuota(currentValue);

    if (parsedValue === undefined) {
      return;
    }

    return formatStorageQuota(clampStorageQuota(parsedValue + storageQuotaStep));
  };

  const onDecrement: ISpinButtonProps['onDecrement'] = currentValue => {
    const parsedValue = parseStorageQuota(currentValue);

    if (parsedValue === undefined) {
      return;
    }

    return formatStorageQuota(clampStorageQuota(parsedValue - storageQuotaStep));
  };

  const onValidate: ISpinButtonProps['onValidate'] = currentValue => {
    const parsedValue = parseStorageQuota(currentValue);

    if (parsedValue === undefined) {
      return;
    }

    return formatStorageQuota(clampStorageQuota(parsedValue));
  };

  return (
    <SpinButtonV8
      label="Formatted storage quota"
      defaultValue={formatStorageQuota(20)}
      min={storageQuotaMin}
      max={storageQuotaMax}
      step={storageQuotaStep}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onValidate={onValidate}
      incrementButtonAriaLabel="Increase storage quota"
      decrementButtonAriaLabel="Decrease storage quota"
    />
  );
};

const SpinButtonV9DisplayValueFormattingExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState<number | null>(20);
  const [displayValue, setDisplayValue] = React.useState(formatStorageQuota(20));

  const onChange = React.useCallback((_event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
    if (data.value !== undefined && data.value !== null) {
      const clampedValue = clampStorageQuota(data.value);

      setValue(clampedValue);
      setDisplayValue(formatStorageQuota(clampedValue));
      return;
    }

    if (data.displayValue !== undefined) {
      const parsedValue = parseStorageQuota(data.displayValue);

      if (parsedValue === undefined) {
        setValue(null);
        setDisplayValue(data.displayValue);
        return;
      }

      const clampedValue = clampStorageQuota(parsedValue);

      setValue(clampedValue);
      setDisplayValue(formatStorageQuota(clampedValue));
    }
  }, []);

  return (
    <div className={styles.section}>
      <Field label="Formatted storage quota" hint="Parse committed text, then update value and displayValue together.">
        <SpinButton
          value={value}
          displayValue={displayValue}
          min={storageQuotaMin}
          max={storageQuotaMax}
          step={storageQuotaStep}
          onChange={onChange}
          incrementButton={{ 'aria-label': 'Increase storage quota' }}
          decrementButton={{ 'aria-label': 'Decrease storage quota' }}
        />
      </Field>
      <Text className={styles.value}>Current numeric value: {value === null ? 'no committed number' : value}</Text>
    </div>
  );
};

const SpinButtonV8ControlledChangeExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('12');

  const onChange: ISpinButtonProps['onChange'] = (_event, nextValue) => {
    setValue(nextValue ?? '');
  };

  return (
    <div className={styles.section}>
      <SpinButtonV8
        label="Controlled seats"
        value={value}
        min={1}
        max={25}
        onChange={onChange}
        incrementButtonAriaLabel="Increase controlled seats"
        decrementButtonAriaLabel="Decrease controlled seats"
      />
      <Text className={styles.value}>Current string value: {value}</Text>
    </div>
  );
};

const SpinButtonV9ControlledChangeExample = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState<number | null>(12);

  const onChange: SpinButtonProps['onChange'] = (_event, data) => {
    if (data.value !== undefined) {
      setValue(data.value);
      return;
    }

    if (data.displayValue !== undefined) {
      const parsedValue = parseCommittedNumber(data.displayValue);

      if (parsedValue !== undefined) {
        setValue(parsedValue);
      }
    }
  };

  return (
    <div className={styles.section}>
      <Field label="Controlled seats">
        <SpinButton value={value} min={1} max={25} onChange={onChange} />
      </Field>
      <Text className={styles.value}>Current numeric value: {value === null ? 'none' : value}</Text>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <SpinButtonV8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <SpinButtonV9BasicExample />,
};

export const V8StringValue: Story = {
  render: () => <SpinButtonV8StringValueExample />,
};

export const V9NumericAndDisplayValue: Story = {
  render: () => <SpinButtonV9NumericAndDisplayValueExample />,
};

export const V8FormattedStringCallbacks: Story = {
  render: () => <SpinButtonV8FormattedStringCallbacksExample />,
};

export const V9DisplayValueFormatting: Story = {
  render: () => <SpinButtonV9DisplayValueFormattingExample />,
};

export const V8ControlledChange: Story = {
  render: () => <SpinButtonV8ControlledChangeExample />,
};

export const V9ControlledChange: Story = {
  render: () => <SpinButtonV9ControlledChangeExample />,
};
