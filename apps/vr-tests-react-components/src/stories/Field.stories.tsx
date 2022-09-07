import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Radio } from '@fluentui/react-radio';
import {
  CheckboxField,
  ComboboxField,
  InputField,
  InputFieldProps,
  RadioGroupField,
  SelectField,
  SliderField,
  SpinButtonField,
  SwitchField,
  TextareaField,
} from '@fluentui/react-field';
import { SparkleFilled } from '@fluentui/react-icons';

const AllFields = (
  props: Pick<
    InputFieldProps,
    'orientation' | 'required' | 'label' | 'validationState' | 'validationMessage' | 'validationMessageIcon' | 'hint'
  >,
) => {
  return (
    <div style={{ display: 'grid', rowGap: '12px' }}>
      <CheckboxField label="Checkbox" {...props} />
      <ComboboxField label="Combo box field" {...props} />
      <InputField label="Input field" {...props} />
      <RadioGroupField label="Radio group field" {...props}>
        <Radio label="Option one" />
        <Radio label="Option two" />
        <Radio label="Option three" />
      </RadioGroupField>
      <SelectField label="Select field" {...props}>
        <option>Option</option>
      </SelectField>
      <SliderField label="Slider field" {...props} />
      <SpinButtonField label="Spin button field" {...props} />
      <SwitchField label="Switch field" {...props} />
      <TextareaField label="Textarea field" {...props} />
    </div>
  );
};

const AllFieldsWithValidationMessage = (
  props: Pick<InputFieldProps, 'orientation' | 'required' | 'label' | 'hint'>,
) => {
  type ValidationProps = Pick<InputFieldProps, 'validationState' | 'validationMessage' | 'validationMessageIcon'>;
  const error: ValidationProps = { validationState: 'error', validationMessage: 'Error message' };
  const warning: ValidationProps = { validationState: 'warning', validationMessage: 'Warning message' };
  const success: ValidationProps = { validationState: 'success', validationMessage: 'Success message' };
  const custom: ValidationProps = { validationMessage: 'Custom message', validationMessageIcon: <SparkleFilled /> };

  return (
    <div style={{ display: 'grid', rowGap: '12px' }}>
      <CheckboxField label="Checkbox" {...error} {...props} />
      <ComboboxField label="Combo box field" {...warning} {...props} />
      <InputField label="Input field" {...success} {...props} />
      <RadioGroupField label="Radio group field" {...custom} {...props}>
        <Radio label="Option one" />
        <Radio label="Option two" />
        <Radio label="Option three" />
      </RadioGroupField>
      <SelectField label="Select field" {...error} {...props}>
        <option>Option</option>
      </SelectField>
      <SliderField label="Slider field" {...warning} {...props} />
      <SpinButtonField label="Spin button field" {...success} {...props} />
      <SwitchField label="Switch field" {...custom} {...props} />
      <TextareaField label="Textarea field" {...error} {...props} />
    </div>
  );
};

storiesOf('Field Converged', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px', width: '480px' }}>
        <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
      </div>
    </div>
  ))
  .addStory('base', () => <AllFields />)
  .addStory('required', () => <AllFields required />)
  .addStory('validationMessage', () => <AllFieldsWithValidationMessage />)
  .addStory('hint', () => <AllFields hint="Hint message" />)
  .addStory('horizontal', () => <AllFields orientation="horizontal" />)
  .addStory('horizontal+long-label', () => (
    <AllFields
      orientation="horizontal"
      label="This is a very long label that should wrap around to be multiple lines in height"
    />
  ))
  .addStory('Horizontal+validationMessage+hint', () => (
    <AllFieldsWithValidationMessage orientation="horizontal" hint="Hint text" />
  ))
  .addStory('size=small', () => (
    <div style={{ display: 'grid', rowGap: '12px' }}>
      <ComboboxField label="Combo box field" size="small" />
      <InputField label="Input field" size="small" />
      <SelectField label="Select field" size="small">
        <option>Option</option>
      </SelectField>
      <SliderField label="Slider field" size="small" />
      <SpinButtonField label="Spin button field" size="small" />
      <TextareaField label="Textarea field" size="small" />
    </div>
  ))
  .addStory('size=large', () => (
    <div style={{ display: 'grid', rowGap: '12px' }}>
      <CheckboxField label="Checkbox" size="large" />
      <ComboboxField label="Combo box field" size="large" />
      <InputField label="Input field" size="large" />
      <SelectField label="Select field" size="large">
        <option>Option</option>
      </SelectField>
      <TextareaField label="Textarea field" size="large" />
    </div>
  ))
  .addStory('CheckboxField+fieldLabel', () => (
    <CheckboxField label="Label for the checkbox" fieldLabel="Field label" required />
  ));
