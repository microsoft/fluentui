import { fluentCombobox } from './index';

export default {
  title: 'Components/Combobox',
  component: fluentCombobox,
  argTypes: {
    appearance: {
      options: ['filled', 'outline'],
      control: { type: 'radio' },
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

const ComboboxTemplate = ({ appearance, autocomplete, position, required }) => `
  <fluent-combobox
    ${appearance ? `appearance="${appearance}"` : ''}
    ${appearance ? `autocomplete="${autocomplete}"` : ''}
    ${required ? 'required' : ''}
    ${position ? `position="${position}"` : ''}
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
