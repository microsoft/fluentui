import { fluentTextArea } from './index';

export default {
  title: 'Components/Text Area',
  component: fluentTextArea,
  argTypes: {
    appearance: {
      options: ['filled'],
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
  appearance="${appearance}"
  ${autoFocus ? 'autofocus' : ''}
  ${disabled ? 'disabled' : ''}
  placeholder="${placeholder}"
  ${readonly ? 'readonly' : ''}
  resize="${resize}"
  ${required ? 'required' : ''}
></fluent-text-area>`;

export const TextArea = TextAreaTemplate.bind({});

TextArea.args = {
  placeholder: '',
};
