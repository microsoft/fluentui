import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Radio } from '@fluentui/react-radio';
import {
  CheckboxField,
  ComboboxField,
  InputField,
  ProgressField,
  RadioGroupField,
  SelectField,
  SliderField,
  SpinButtonField,
  SwitchField,
  TextareaField,
} from '@fluentui/react-field';
import { SparkleFilled } from '@fluentui/react-icons';
import { FieldComponent, FieldPropsWithOptionalComponentProps } from '@fluentui/react-field/src/Field';

type FieldComponentProps = Pick<
  FieldPropsWithOptionalComponentProps<FieldComponent>,
  'orientation' | 'required' | 'label' | 'validationState' | 'validationMessage' | 'validationMessageIcon' | 'hint'
>;

/**
 * Common VR tests for all field components. Pass the given Field component (or a wrapper around it).
 */
const storiesOfField = (name: string, Field: React.VoidFunctionComponent<FieldComponentProps>) =>
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
  Field: React.VoidFunctionComponent<FieldComponentProps & { size?: 'small' | 'medium' | 'large' }>,
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
storiesOfField('ProgressField converged', props => <ProgressField value={0.5} {...props} />);

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
