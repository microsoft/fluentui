import { fluentTextArea } from './index';

export default {
  title: 'Components/Text Area',
  component: fluentTextArea,
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
    readonly: {
      control: { type: 'boolean' },
    },
    rows: {
      control: { type: 'number' },
    },
    cols: {
      control: { type: 'number' },
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

const TextAreaTemplate = ({ appearance, autoFocus, disabled, placeholder, readonly, rows, cols, resize, required }) => `
<fluent-text-area
  ${appearance ? `appearance="${appearance}"` : ''}
  ${autoFocus ? 'autofocus' : ''}
  ${disabled ? 'disabled' : ''}
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${readonly ? 'readonly' : ''}
  ${rows ? `rows="${rows}"` : ''}
  ${cols ? `cols="${cols}"` : ''}
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
