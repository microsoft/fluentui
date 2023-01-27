import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { CheckboxField_unstable as CheckboxField } from '@fluentui/react-checkbox';
import { ComboboxField_unstable as ComboboxField } from '@fluentui/react-combobox';
import { SparkleFilled } from '@fluentui/react-icons';
import type { InputFieldProps_unstable as InputFieldProps } from '@fluentui/react-input';
import { InputField_unstable as InputField } from '@fluentui/react-input';
import { ProgressField_unstable as ProgressField } from '@fluentui/react-progress';
import { Radio, RadioGroupField_unstable as RadioGroupField } from '@fluentui/react-radio';
import { SelectField_unstable as SelectField } from '@fluentui/react-select';
import { SliderField_unstable as SliderField } from '@fluentui/react-slider';
import { SpinButtonField_unstable as SpinButtonField } from '@fluentui/react-spinbutton';
import { SwitchField_unstable as SwitchField } from '@fluentui/react-switch';
import { TextareaField_unstable as TextareaField } from '@fluentui/react-textarea';

type FieldControlProps = Pick<
  InputFieldProps,
  'orientation' | 'required' | 'label' | 'validationState' | 'validationMessage' | 'validationMessageIcon' | 'hint'
>;

/**
 * Common VR tests for all field components. Pass the given Field component (or a wrapper around it).
 */
const storiesOfField = (name: string, Field: React.VoidFunctionComponent<FieldControlProps>) =>
  storiesOf(name, module)
    .addDecorator(story => <StoryWright steps={new Steps().snapshot('default').end()}>{story()}</StoryWright>)
    .addDecorator(story => (
      <div style={{ display: 'flex' }}>
        <div className="testWrapper" style={{ padding: '10px', width: '480px' }}>
          <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
        </div>
      </div>
    ))
    .addStory('base', () => <Field label="Example field" />)
    .addStory('required', () => <Field label="Example field" required />)
    .addStory('validation', () => (
      <div style={{ display: 'grid', rowGap: '10px' }}>
        <Field label="Validation error" validationState="error" validationMessage="Error message" />
        <Field label="Validation warning" validationState="warning" validationMessage="Warning message" />
        <Field label="Validation success" validationState="success" validationMessage="Success message" />
        <Field
          label="Custom validation state"
          validationMessageIcon={<SparkleFilled />}
          validationMessage="Custom message"
        />
      </div>
    ))
    .addStory('hint', () => <Field label="Example field" hint="Hint message" />)
    .addStory('horizontal', () => (
      <Field
        label="This is a very long label that should wrap around to be multiple lines in height"
        orientation="horizontal"
        validationState="error"
        validationMessage="Error message"
        hint="Hint text"
      />
    ));

/**
 * Same as storiesOfField, but with extra stories for Field components that support the size prop.
 */
const storiesOfFieldWithSize = (
  name: string,
  Field: React.VoidFunctionComponent<FieldControlProps & { size?: 'small' | 'medium' | 'large' }>,
) =>
  storiesOfField(name, Field)
    .addStory('size:small', () => <Field label="Example field" size="small" />)
    .addStory('size:large', () => <Field label="Example field" size="large" />);

//
// CheckboxField
//
storiesOfField('CheckboxField converged', CheckboxField)
  .addStory('size:large', () => <CheckboxField label="Example field" size="large" />)
  .addStory('fieldLabel', () => <CheckboxField label="Label for the checkbox" fieldLabel="Field label" required />);

//
// ComboboxField
//
storiesOfFieldWithSize('ComboboxField converged', ComboboxField);

//
// InputField
//
storiesOfFieldWithSize('InputField converged', InputField);

//
// ProgressField
//
storiesOfField('ProgressField converged', props => (
  <ProgressField
    value={0.5}
    {...props}
    validationState={props.validationState === 'none' ? undefined : props.validationState}
  />
));

//
// RadioGroupField
//
storiesOfField('RadioGroupField converged', props => (
  <RadioGroupField {...props}>
    <Radio label="Option one" />
    <Radio label="Option two" />
    <Radio label="Option three" />
  </RadioGroupField>
));

//
// SelectField
//
storiesOfFieldWithSize('SelectField converged', props => (
  <SelectField {...props}>
    <option>Option one</option>
  </SelectField>
));

//
// SliderField
//
storiesOfField('SliderField converged', SliderField);

//
// SpinButtonField
//
storiesOfField('SpinButtonField converged', SpinButtonField);

//
// SwitchField
//
storiesOfField('SwitchField converged', SwitchField);

//
// TextareaField
//
storiesOfFieldWithSize('TextareaField converged', TextareaField);
