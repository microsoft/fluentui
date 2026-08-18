import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Caption1,
  Combobox,
  Dropdown,
  Field,
  Option,
  Select,
  Text,
  makeStyles,
  tokens,
  useComboboxFilter,
} from '@fluentui/react-components';
import type { ComboboxProps, DropdownProps } from '@fluentui/react-components';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { Dropdown as V8Dropdown } from '@fluentui/react/lib/Dropdown';
import type { IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Dropdown Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type OwnerOption = {
  key: string;
  secondaryText: string;
  text: string;
};

type ChoiceOption = {
  key: string;
  text: string;
};

const ownerOptions: OwnerOption[] = [
  { key: 'elvia', text: 'Elvia Atkins', secondaryText: 'Design systems' },
  { key: 'katri', text: 'Katri Athokas', secondaryText: 'Accessibility review' },
  { key: 'wanda', text: 'Wanda Howard', secondaryText: 'Release planning' },
];

const choiceOptions: ChoiceOption[] = [
  { key: 'production', text: 'Production' },
  { key: 'preview', text: 'Preview' },
  { key: 'prototype', text: 'Prototype' },
];

const channelOptions: ChoiceOption[] = [
  { key: 'desktop', text: 'Desktop' },
  { key: 'web', text: 'Web' },
  { key: 'mobile', text: 'Mobile' },
  { key: 'kiosk', text: 'Kiosk' },
];

const v8OwnerOptions: IDropdownOption<Pick<OwnerOption, 'secondaryText'>>[] = ownerOptions.map(option => ({
  key: option.key,
  text: option.text,
  data: { secondaryText: option.secondaryText },
}));

const v8ChoiceOptions: IDropdownOption[] = choiceOptions.map(option => ({ key: option.key, text: option.text }));
const v8ChannelOptions: IDropdownOption[] = channelOptions.map(option => ({ key: option.key, text: option.text }));

const choiceValueMap = new Map(choiceOptions.map(option => [option.key, option.text]));
const channelValueMap = new Map(channelOptions.map(option => [option.key, option.text]));

const getChannelSummary = (selectedOptions: string[]) =>
  selectedOptions.map(value => channelValueMap.get(value) ?? value).join(', ');

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  optionContent: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },
  optionText: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXS,
  },
  supportingText: {
    margin: 0,
    color: tokens.colorNeutralForeground3,
  },
  styledListbox: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const OwnerOptionContent = ({ option }: { option: OwnerOption }) => {
  const styles = useStyles();

  return (
    <div className={styles.optionContent}>
      <Avatar aria-hidden="true" name={option.text} />
      <div className={styles.optionText}>
        <Text>{option.text}</Text>
        <Caption1>{option.secondaryText}</Caption1>
      </div>
    </div>
  );
};

const renderV8OwnerOption = (option?: IDropdownOption<Pick<OwnerOption, 'secondaryText'>>) => {
  if (!option) {
    return null;
  }

  const ownerOption = ownerOptions.find(candidate => candidate.key === option.key);

  return ownerOption ? <OwnerOptionContent option={ownerOption} /> : <Text>{option.text}</Text>;
};

const renderV8OwnerTitle = (selectedOptions?: IDropdownOption<Pick<OwnerOption, 'secondaryText'>>[]) => {
  const selectedOption = selectedOptions?.[0];
  return renderV8OwnerOption(selectedOption);
};

const V8BasicExample = () => {
  return (
    <V8Dropdown
      ariaLabel="Project stage"
      label="Project stage"
      options={v8ChoiceOptions}
      placeholder="Select a stage"
    />
  );
};

const V9BasicExample = () => {
  return (
    <Field label="Project stage" hint="Dropdown is the primary v9 migration for custom or multi-select scenarios.">
      <Dropdown placeholder="Select a stage">
        {choiceOptions.map(option => (
          <Option key={option.key} value={option.key} text={option.text}>
            {option.text}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};

const V9NativeSelectAlternativeExample = () => {
  return (
    <Field label="Project stage" hint="Choose Select when native single-select semantics are sufficient.">
      <Select defaultValue="">
        <option value="">Select a stage</option>
        {choiceOptions.map(option => (
          <option key={option.key} value={option.key}>
            {option.text}
          </option>
        ))}
      </Select>
    </Field>
  );
};

const V8MultiSelectExample = () => {
  return (
    <V8Dropdown
      defaultSelectedKeys={['desktop', 'web']}
      label="Enabled channels"
      multiSelect
      options={v8ChannelOptions}
      placeholder="Select channels"
    />
  );
};

const V9MultiSelectExample = () => {
  return (
    <Field label="Enabled channels" hint="Use the explicit multiselect prop for v8 multiSelect scenarios.">
      <Dropdown
        defaultSelectedOptions={['desktop', 'web']}
        defaultValue={getChannelSummary(['desktop', 'web'])}
        multiselect
        placeholder="Select channels"
      >
        {channelOptions.map(option => (
          <Option key={option.key} value={option.key} text={option.text}>
            {option.text}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};

const V8ControlledSelectionExample = () => {
  const styles = useStyles();
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>('preview');

  const onChange: IDropdownProps['onChange'] = (_event, option) => {
    setSelectedKey(option?.key);
  };

  return (
    <div className={styles.section}>
      <V8Dropdown
        label="Controlled v8 selection"
        onChange={onChange}
        options={v8ChoiceOptions}
        placeholder="Select a stage"
        selectedKey={selectedKey}
      />
      <p className={styles.supportingText}>selectedKey: {selectedKey ?? 'none'}</p>
    </div>
  );
};

const V9ControlledSelectionExample = () => {
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['preview']);
  const [value, setValue] = React.useState(choiceValueMap.get('preview') ?? 'Preview');

  const onOptionSelect: DropdownProps['onOptionSelect'] = (_event, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  };

  return (
    <div className={styles.section}>
      <Field
        label="Controlled v9 selection"
        hint="Dropdown selection state moves to selectedOptions and onOptionSelect."
      >
        <Dropdown onOptionSelect={onOptionSelect} selectedOptions={selectedOptions} value={value}>
          {choiceOptions.map(option => (
            <Option key={option.key} value={option.key} text={option.text}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>
      <p className={styles.supportingText}>selectedOptions: {selectedOptions.join(', ') || 'none'}</p>
      <p className={styles.supportingText}>value: {value || 'none'}</p>
    </div>
  );
};

const V8CustomOptionRenderExample = () => {
  return (
    <V8Dropdown
      ariaLabel="Assignee"
      label="Assignee"
      onRenderCaretDown={() => <ChevronDownRegular aria-hidden="true" />}
      onRenderOption={renderV8OwnerOption}
      onRenderTitle={renderV8OwnerTitle}
      options={v8OwnerOptions}
      placeholder="Select an owner"
    />
  );
};

const V9OptionCompositionExample = () => {
  const styles = useStyles();

  return (
    <Field label="Assignee" hint="Use Option children and the text prop instead of v8 render callbacks.">
      <Dropdown expandIcon={<ChevronDownRegular aria-hidden="true" />} listbox={{ className: styles.styledListbox }}>
        {ownerOptions.map(option => (
          <Option key={option.key} text={option.text} value={option.key}>
            <OwnerOptionContent option={option} />
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};

const V9ComboboxSearchAlternativeExample = () => {
  const [query, setQuery] = React.useState('');
  const filteredOptions = useComboboxFilter(
    query,
    ownerOptions.map(option => ({
      children: option.text,
      text: option.text,
      value: option.key,
    })),
    {
      noOptionsMessage: 'No matching owner.',
      optionToText: option => option.text,
    },
  );

  const onOptionSelect: ComboboxProps['onOptionSelect'] = (_event, data) => {
    setQuery(data.optionText ?? '');
  };

  return (
    <Field
      hint="Move search, filtering, and freeform input to Combobox instead of Dropdown or Select."
      label="Search owners"
    >
      <Combobox freeform onChange={event => setQuery(event.target.value)} onOptionSelect={onOptionSelect} value={query}>
        {filteredOptions}
      </Combobox>
    </Field>
  );
};

const V9FieldIntegrationExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Field
        hint="Field handles the visible label, hint, and validation wiring for Dropdown."
        label="Review owner"
        required
        validationMessage="Choose a single owner before publishing."
        validationState="warning"
      >
        <Dropdown placeholder="Select an owner">
          {ownerOptions.map(option => (
            <Option key={option.key} value={option.key} text={option.text}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>
      <Field label="Native review stage" hint="Select also composes with Field when native option rendering is enough.">
        <Select defaultValue="">
          <option value="">Select a stage</option>
          {choiceOptions.map(option => (
            <option key={option.key} value={option.key}>
              {option.text}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicExample />,
};

export const V9NativeSelectAlternative: Story = {
  render: () => <V9NativeSelectAlternativeExample />,
};

export const V8MultiSelect: Story = {
  render: () => <V8MultiSelectExample />,
};

export const V9MultiSelect: Story = {
  render: () => <V9MultiSelectExample />,
};

export const V8ControlledSelection: Story = {
  render: () => <V8ControlledSelectionExample />,
};

export const V9ControlledSelection: Story = {
  render: () => <V9ControlledSelectionExample />,
};

export const V8CustomOptionRender: Story = {
  render: () => <V8CustomOptionRenderExample />,
};

export const V9OptionComposition: Story = {
  render: () => <V9OptionCompositionExample />,
};

export const V9ComboboxSearchAlternative: Story = {
  render: () => <V9ComboboxSearchAlternativeExample />,
};

export const V9FieldIntegration: Story = {
  render: () => <V9FieldIntegrationExample />,
};
