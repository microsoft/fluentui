import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import { Combobox, Dropdown } from '@fluentui/react-combobox';
import { Field } from '@fluentui/react-field';
import { Dismiss12Filled } from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { ProgressBar } from '@fluentui/react-progress';
import { Radio, RadioGroup } from '@fluentui/react-radio';
import { Select } from '@fluentui/react-select';
import { Slider } from '@fluentui/react-slider';
import { SpinButton } from '@fluentui/react-spinbutton';
import { Switch } from '@fluentui/react-switch';
import { Textarea } from '@fluentui/react-textarea';
import type { Meta, Decorator } from '@storybook/react';
import { Steps } from 'storywright';

import { withStoryWrightSteps } from '../utilities';

const TestWrapperDecoratorFixedWidth400: Decorator = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '400px' }}>
      {story()}
    </div>
  </div>
);

export default {
  title: 'Field',
  decorators: [
    TestWrapperDecoratorFixedWidth400,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Field>;

export const Base = () => (
  <Field label="Example field">
    <Input />
  </Field>
);
Base.storyName = 'base';

export const Required = () => (
  <Field label="Required field" required>
    <Input />
  </Field>
);
Required.storyName = 'required';

export const SizeSmall = () => (
  <Field label="Small field" size="small">
    <Input />
  </Field>
);
SizeSmall.storyName = 'size:small';

export const SizeLarge = () => (
  <Field label="Large field" size="large">
    <Input />
  </Field>
);
SizeLarge.storyName = 'size:large';

export const ValidationError = () => (
  <Field label="Validation error" validationMessage="Error message">
    <Input />
  </Field>
);
ValidationError.storyName = 'validation:error';

export const ValidationWarning = () => (
  <Field label="Validation warning" validationState="warning" validationMessage="Warning message">
    <Input />
  </Field>
);
ValidationWarning.storyName = 'validation:warning';

export const ValidationSuccess = () => (
  <Field
    label="Validation success"
    validationState="success"
    validationMessage={`This success message wraps to multiple lines. All lines of this message should be left aligned
        with each other, and the icon should be in its own column to the left of the message. None of the text of the
        message should be directly below the icon.`}
  >
    <Input />
  </Field>
);
ValidationSuccess.storyName = 'validation:success';

export const ValidationNone = () => (
  <Field label="Validation none" validationState="none" validationMessage="Custom validation message">
    <Input />
  </Field>
);
ValidationNone.storyName = 'validation:none';

export const ValidationMessageIcon = () => (
  <Field
    label="Custom validation icon"
    validationMessage="Error message with custom icon"
    validationMessageIcon={<Dismiss12Filled />}
  >
    <Input />
  </Field>
);
ValidationMessageIcon.storyName = 'validationMessageIcon';

export const Hint = () => (
  <Field
    label="Field with Hint"
    hint={'This hint message wraps to multiple lines. It should all be left-aligned without an extra indentation.'}
  >
    <Input />
  </Field>
);
Hint.storyName = 'hint';

export const Horizontal = () => (
  <Field orientation="horizontal" label="Horizontal field">
    <Input />
  </Field>
);
Horizontal.storyName = 'horizontal';

export const HorizontalLongLabel = () => (
  <Field
    orientation="horizontal"
    label="A long label should wrap around to multiple lines without affecting the layout of the control"
    validationState="warning"
    validationMessage="Warning message"
    hint="Hint text"
  >
    <Input />
  </Field>
);
HorizontalLongLabel.storyName = 'horizontal+longLabel';

export const HorizontalNoLabel = () => (
  <Field
    orientation="horizontal"
    hint={`The gap to the left is expected. With no Field label, the control is indented to vertically align with
        other horizontal fields.`}
  >
    <Checkbox label="Checkbox in a horizontal field" />
  </Field>
);
HorizontalNoLabel.storyName = 'horizontal+noLabel';

export const InputHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Small Field" size="small" orientation="horizontal">
      <Input placeholder="Input" />
    </Field>
    <Field label="Medium Field" size="medium" orientation="horizontal">
      <Input placeholder="Input" />
    </Field>
    <Field label="Large Field" size="large" orientation="horizontal">
      <Input placeholder="Input" />
    </Field>
  </div>
);
InputHorizontal.storyName = 'Input+horizontal';

export const WithCheckbox = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Checkbox in a Field with a label">
      <Checkbox />
    </Field>
    <Field validationMessage="Error message">
      <Checkbox label="Checkbox in a Field with an error" />
    </Field>
  </div>
);
WithCheckbox.storyName = 'Checkbox';

export const WithCombobox = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Combobox in a small Field" size="small">
      <Combobox />
    </Field>
    <Field label="Combobox in a medium Field" size="medium">
      <Combobox />
    </Field>
    <Field label="Combobox in a large Field" size="large">
      <Combobox />
    </Field>
    <Field label="Combobox in a Field with an error" validationMessage="Error message">
      <Combobox />
    </Field>
  </div>
);
WithCombobox.storyName = 'Combobox';

export const ComboboxHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Small Field" size="small" orientation="horizontal">
      <Combobox placeholder="Combobox" />
    </Field>
    <Field label="Medium Field" size="medium" orientation="horizontal">
      <Combobox placeholder="Combobox" />
    </Field>
    <Field label="Large Field" size="large" orientation="horizontal">
      <Combobox placeholder="Combobox" />
    </Field>
  </div>
);
ComboboxHorizontal.storyName = 'Combobox+horizontal';

export const WithDropdown = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Dropdown in a small Field" size="small">
      <Dropdown />
    </Field>
    <Field label="Dropdown in a medium Field" size="medium">
      <Dropdown />
    </Field>
    <Field label="Dropdown in a large Field" size="large">
      <Dropdown />
    </Field>
    <Field label="Dropdown in a Field with an error" validationMessage="Error message">
      <Dropdown />
    </Field>
  </div>
);
WithDropdown.storyName = 'Dropdown';

export const DropdownHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Small Field" size="small" orientation="horizontal">
      <Dropdown placeholder="Dropdown" />
    </Field>
    <Field label="Medium Field" size="medium" orientation="horizontal">
      <Dropdown placeholder="Dropdown" />
    </Field>
    <Field label="Large Field" size="large" orientation="horizontal">
      <Dropdown placeholder="Dropdown" />
    </Field>
  </div>
);
DropdownHorizontal.storyName = 'Dropdown+horizontal';

export const WithProgressBar = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="ProgressBar in a Field with a hint" hint="Hint message">
      <ProgressBar value={0.5} />
    </Field>
    <Field label="ProgressBar in a Field with success" validationMessage="Success message" validationState="success">
      <ProgressBar value={0.5} />
    </Field>
    <Field label="ProgressBar in a Field with a warning" validationMessage="Warning message" validationState="warning">
      <ProgressBar value={0.5} />
    </Field>
    <Field label="ProgressBar in a Field with an error" validationMessage="Error message">
      <ProgressBar value={0.5} />
    </Field>
  </div>
);
WithProgressBar.storyName = 'ProgressBar';

export const WithRadioGroup = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="RadioGroup in a Field">
      <RadioGroup>
        <Radio label="Option one" />
        <Radio label="Option two" />
        <Radio label="Option three" />
      </RadioGroup>
    </Field>
    <Field label="RadioGroup in a Field with an error" validationMessage="Error message">
      <RadioGroup>
        <Radio label="Option one" />
        <Radio label="Option two" />
        <Radio label="Option three" />
      </RadioGroup>
    </Field>
  </div>
);
WithRadioGroup.storyName = 'RadioGroup';

export const RadioGroupHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Horizontal Field" orientation="horizontal">
      <RadioGroup layout="horizontal">
        <Radio label="Option one" />
        <Radio label="Option two" />
      </RadioGroup>
    </Field>
  </div>
);
RadioGroupHorizontal.storyName = 'RadioGroup+horizontal';

export const WithSelect = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Select in a small Field" size="small">
      <Select />
    </Field>
    <Field label="Select in a medium Field" size="medium">
      <Select />
    </Field>
    <Field label="Select in a large Field" size="large">
      <Select />
    </Field>
    <Field label="Select in a Field with an error" validationMessage="Error message">
      <Select />
    </Field>
  </div>
);
WithSelect.storyName = 'Select';

export const SelectHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Small Field" size="small" orientation="horizontal">
      <Select value="Select">
        <option>Select</option>
      </Select>
    </Field>
    <Field label="Medium Field" size="medium" orientation="horizontal">
      <Select value="Select">
        <option>Select</option>
      </Select>
    </Field>
    <Field label="Large Field" size="large" orientation="horizontal">
      <Select value="Select">
        <option>Select</option>
      </Select>
    </Field>
  </div>
);
SelectHorizontal.storyName = 'Select+horizontal';

export const WithSlider = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Slider in a Field">
      <Slider />
    </Field>
    <Field label="Slider in a Field with an error" validationMessage="Error message">
      <Slider />
    </Field>
  </div>
);
WithSlider.storyName = 'Slider';

export const WithSpinButton = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="SpinButton in a small Field" size="small">
      <SpinButton />
    </Field>
    <Field label="SpinButton in a medium Field" size="medium">
      <SpinButton />
    </Field>
    <Field label="SpinButton in a large Field" size="large">
      <SpinButton />
    </Field>
    <Field label="SpinButton in a Field with an error" validationMessage="Error message">
      <SpinButton />
    </Field>
  </div>
);
WithSpinButton.storyName = 'SpinButton';

export const SpinButtonHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Horizontal Field" size="medium" orientation="horizontal">
      <SpinButton />
    </Field>
  </div>
);
SpinButtonHorizontal.storyName = 'SpinButton+horizontal';

export const WithSwitch = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Switch in a Field">
      <Switch />
    </Field>
    <Field label="Switch in a Field with an error" validationMessage="Error message">
      <Switch />
    </Field>
  </div>
);
WithSwitch.storyName = 'Switch';

export const WithTextarea = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Textarea in a small Field" size="small">
      <Textarea />
    </Field>
    <Field label="Textarea in a medium Field" size="medium">
      <Textarea />
    </Field>
    <Field label="Textarea in a large Field" size="large">
      <Textarea />
    </Field>
    <Field label="Textarea in a Field with an error" validationMessage="Error message">
      <Textarea />
    </Field>
  </div>
);
WithTextarea.storyName = 'Textarea';

export const TextareaHorizontal = () => (
  <div style={{ display: 'grid', gap: '10px' }}>
    <Field label="Small Field" size="small" orientation="horizontal">
      <Textarea placeholder="Textarea" />
    </Field>
    <Field label="Medium Field" size="medium" orientation="horizontal">
      <Textarea placeholder="Textarea" />
    </Field>
    <Field label="Large Field" size="large" orientation="horizontal">
      <Textarea placeholder="Textarea" />
    </Field>
  </div>
);
TextareaHorizontal.storyName = 'Textarea+horizontal';
