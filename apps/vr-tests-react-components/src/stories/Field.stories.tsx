import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
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

storiesOf('Field Converged', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px', width: '480px' }}>
        <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
      </div>
    </div>
  ))
  .addStory('base', () => <AllFields />)
  .addStory('required', () => <AllFields required />)
  .addStory('validation:error', () => <AllFields validationState="error" validationMessage="Error message" />)
  .addStory('validation:warning', () => <AllFields validationState="warning" validationMessage="Warning message" />)
  .addStory('validation:success', () => <AllFields validationState="success" validationMessage="Success message" />)
  .addStory('validation:custom', () => (
    <AllFields validationMessageIcon={<SparkleFilled />} validationMessage="Custom message" />
  ))
  .addStory('hint', () => <AllFields hint="Hint message" />)
  .addStory('horizontal', () => <AllFields orientation="horizontal" />)
  .addStory('horizontal+label:multiline', () => (
    <AllFields
      orientation="horizontal"
      label="This is a very long label that should wrap around to be multiple lines in height"
    />
  ))
  .addStory('horizontal+validation:error+hint', () => (
    <AllFields orientation="horizontal" validationState="error" validationMessage="Error message" hint="Hint text" />
  ))
  .addStory('size:small', () => (
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
  .addStory('size:large', () => (
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
