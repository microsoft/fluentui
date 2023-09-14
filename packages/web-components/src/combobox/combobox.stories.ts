import { fluentCombobox } from './index';

export default {
  title: 'Components/Combobox',
  component: fluentCombobox,
  argTypes: {
    appearance: {
      options: ['filled', 'outline'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    autocomplete: {
      options: ['inline', 'list', 'none', 'both'],
      control: { type: 'radio' },
    },
    position: {
      options: ['above', 'below'],
      control: { type: 'radio' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

const ComboboxTemplate = ({ appearance, disabled, autocomplete, position, required }) => `
  <style>
    div.docs-story>div:first-child {
      height: 32em !important;
    }
  </style>
  <fluent-combobox
    ${appearance ? `appearance="${appearance}"` : ''}
    ${disabled ? 'disabled' : ''} 
    ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
    ${required ? 'required' : ''}
    ${position ? `position="${position}"` : ''}
    style="margin-bottom: 500px;"
  >
    <fluent-option>Please Please Me</fluent-option>
    <fluent-option>With The Beatles</fluent-option>
    <fluent-option>A Hard Day's Night</fluent-option>
    <fluent-option>Beatles for Sale</fluent-option>
    <fluent-option>Help!</fluent-option>
    <fluent-option>Rubber Soul</fluent-option>
    <fluent-option>Revolver</fluent-option>
    <fluent-option>Sgt. Pepper's Lonely Hearts Club Band</fluent-option>
    <fluent-option>Magical Mystery Tour</fluent-option>
    <fluent-option>The Beatles</fluent-option>
    <fluent-option>Yellow Submarine</fluent-option>
    <fluent-option>Abbey Road</fluent-option>
    <fluent-option>Let It Be</fluent-option>
  </fluent-combobox>
`;

export const Combobox = ComboboxTemplate.bind({});

Combobox.args = {
  value: 'Christopher Eccleston',
  appearance: 'outline',
  disabled: false,
};

const example = `
<fluent-combobox>
  <fluent-option>Please Please Me</fluent-option>
  <fluent-option>With The Beatles</fluent-option>
  <fluent-option>A Hard Day's Night</fluent-option>
  <fluent-option>Beatles for Sale</fluent-option>
  <fluent-option>Help!</fluent-option>
  <fluent-option>Rubber Soul</fluent-option>
  <fluent-option>Revolver</fluent-option>
  <fluent-option>Sgt. Pepper's Lonely Hearts Club Band</fluent-option>
  <fluent-option>Magical Mystery Tour</fluent-option>
  <fluent-option>The Beatles</fluent-option>
  <fluent-option>Yellow Submarine</fluent-option>
  <fluent-option>Abbey Road</fluent-option>
  <fluent-option>Let It Be</fluent-option>
</fluent-combobox>
`;
Combobox.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
