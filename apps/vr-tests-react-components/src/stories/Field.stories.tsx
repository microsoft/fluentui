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
import { storiesOf } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';

storiesOf('Field', module)
  .addDecorator(story => (
    <div className="testWrapper" style={{ padding: '10px', width: '400px' }}>
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    </div>
  ))
  .addStory('base', () => (
    <Field label="Example field">
      <Input />
    </Field>
  ))
  .addStory('required', () => (
    <Field label="Required field" required>
      <Input />
    </Field>
  ))
  .addStory('size:small', () => (
    <Field label="Small field" size="small">
      <Input size="small" />
    </Field>
  ))
  .addStory('size:large', () => (
    <Field label="Large field" size="large">
      <Input size="large" />
    </Field>
  ))
  .addStory('validation:error', () => (
    <Field label="Validation error" validationMessage="Error message">
      <Input />
    </Field>
  ))
  .addStory('validation:warning', () => (
    <Field label="Validation warning" validationState="warning" validationMessage="Warning message">
      <Input />
    </Field>
  ))
  .addStory('validation:success', () => (
    <Field
      label="Validation success"
      validationState="success"
      validationMessage={`This success message wraps to multiple lines. All lines of this message should be left aligned
        with each other, and the icon should be in its own column to the left of the message. None of the text of the
        message should be directly below the icon.`}
    >
      <Input />
    </Field>
  ))
  .addStory('validation:none', () => (
    <Field label="Validation none" validationState="none" validationMessage="Custom validation message">
      <Input />
    </Field>
  ))
  .addStory('validationMessageIcon', () => (
    <Field
      label="Custom validation icon"
      validationMessage="Error message with custom icon"
      validationMessageIcon={<Dismiss12Filled />}
    >
      <Input />
    </Field>
  ))
  .addStory('hint', () => (
    <Field
      label="Field with Hint"
      hint={'This hint message wraps to multiple lines. It should all be left-aligned without an extra indentation.'}
    >
      <Input />
    </Field>
  ))
  .addStory('horizontal', () => (
    <Field orientation="horizontal" label="Horizontal field">
      <Input />
    </Field>
  ))
  .addStory('horizontal+longLabel', () => (
    <Field
      orientation="horizontal"
      label="A long label should wrap around to multiple lines without affecting the layout of the control"
      validationState="warning"
      validationMessage="Warning message"
      hint="Hint text"
    >
      <Input />
    </Field>
  ))
  .addStory('horizontal+noLabel', () => (
    <Field
      orientation="horizontal"
      hint={`The gap to the left is expected. With no Field label, the control is indented to vertically align with
        other horizontal fields.`}
    >
      <Checkbox label="Checkbox in a horizontal field" />
    </Field>
  ))
  .addStory('Checkbox:error', () => (
    <Field validationMessage="Error message">
      <Checkbox label="Checkbox in a Field with an error" />
    </Field>
  ))
  .addStory('Combobox:error', () => (
    <Field label="Combobox in a Field with an error" validationMessage="Error message">
      <Combobox />
    </Field>
  ))
  .addStory('Dropdown:error', () => (
    <Field label="Dropdown in a Field with an error" validationMessage="Error message">
      <Dropdown />
    </Field>
  ))
  .addStory('ProgressBar:error', () => (
    <Field label="ProgressBar in a Field with an error" validationMessage="Error message">
      <ProgressBar value={0.5} validationState="error" />
    </Field>
  ))
  .addStory('RadioGroup:error', () => (
    <Field label="RadioGroup in a Field with an error" validationMessage="Error message">
      <RadioGroup>
        <Radio label="Option one" />
        <Radio label="Option two" />
        <Radio label="Option three" />
      </RadioGroup>
    </Field>
  ))
  .addStory('Select:error', () => (
    <Field label="Select in a Field with an error" validationMessage="Error message">
      <Select />
    </Field>
  ))
  .addStory('Slider:error', () => (
    <Field label="Slider in a Field with an error" validationMessage="Error message">
      <Slider />
    </Field>
  ))
  .addStory('SpinButton:error', () => (
    <Field label="SpinButton in a Field with an error" validationMessage="Error message">
      <SpinButton />
    </Field>
  ))
  .addStory('Switch:error', () => (
    <Field label="Switch in a Field with an error" validationMessage="Error message">
      <Switch />
    </Field>
  ))
  .addStory('Textarea:error', () => (
    <Field label="Textarea in a Field with an error" validationMessage="Error message">
      <Textarea />
    </Field>
  ));
