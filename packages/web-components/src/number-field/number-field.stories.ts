import { fluentNumberField } from './index';

export default {
  title: 'Components/Number Field',
  component: fluentNumberField,
  argTypes: {
    appearance: {
      defaultValue: 'outline',
      options: ['filled', 'outline'],
      control: { type: 'radio' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    hideStep: {
      control: { type: 'boolean' },
    },
    maxlength: {
      control: { type: 'number' },
    },
    minlength: {
      control: { type: 'number' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    step: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

const numberFieldTemplate = ({
  appearance,
  autoFocus,
  disabled,
  hideStep,
  label,
  maxlength,
  minlength,
  placeholder,
  readonly,
  required,
  size,
  step,
  value,
}) => `
  <fluent-number-field
    ${appearance ? `appearance="${appearance}"` : ''}
    ${autoFocus ? 'autofocus' : ''}
    ${disabled ? 'disabled' : ''}
    ${hideStep ? 'hide-step' : ''}
    ${maxlength ? `maxlength="${maxlength}"` : ''}
    ${minlength ? `minlength="${minlength}"` : ''}
    ${placeholder ? `placeholder="${placeholder}"` : ''}
    ${readonly ? 'readonly' : ''}
    ${required ? 'required' : ''}
    ${size ? `size="${size}"` : ''}
    ${step ? `step="${step}"` : ''}
    ${value ? `value="${value}"` : ''}
  >
    ${label ? `${label}` : ''}
  </fluent-number-field>
`;

export const NumberField = numberFieldTemplate.bind({});

// export const NumberField = () => NumberFieldTemplate;

NumberField.args = {
  placeholder: '',
};
