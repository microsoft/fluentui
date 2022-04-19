import { fluentTextArea } from './index';

export default {
  title: 'Components/Text Area',
  component: fluentTextArea,
  argTypes: {
    appearance: {
      defaultValue: 'outlined',
      options: ['filled', 'outlined'],
      control: { type: 'radio' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    resize: {
      options: ['both', 'horizontal', 'vertical'],
      control: { type: 'select' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

const TextAreaTemplate = ({ appearance, autoFocus, disabled, placeholder, readonly, resize, required }) => `
<fluent-text-area
  ${appearance ? `appearance="${appearance}"` : ''}
  ${autoFocus ? 'autofocus' : ''}
  ${disabled ? 'disabled' : ''}
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${readonly ? 'readonly' : ''}
  ${resize ? `resize="${resize}"` : ''}
  ${required ? 'required' : ''}
></fluent-text-area>`;

export const TextArea = TextAreaTemplate.bind({});

TextArea.args = {
  placeholder: '',
  autoFocus: false,
  disabled: false,
  readonly: false,
  required: false,
};

const example = `
<fluent-text-area appearance="outline"></fluent-text-area>
`;

TextArea.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
