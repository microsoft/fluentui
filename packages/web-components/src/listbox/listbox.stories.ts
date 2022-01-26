import { fluentListbox } from './index';

export default {
  title: 'Components/Listbox',
  component: fluentListbox,
};

const listBoxTemplate = () => `
  <fluent-listbox>
    <fluent-option>This option has no value</fluent-option>
    <fluent-option disabled>This option is disabled</fluent-option>
    <fluent-option value="hi">This option has a value</fluent-option>
    <fluent-option selected>This option is selected by default</fluent-option>
  </fluent-listbox>
`;

export const Listbox = listBoxTemplate.bind({});

const example = `
<fluent-listbox>
  <fluent-option>This option has no value</fluent-option>
  <fluent-option disabled>This option is disabled</fluent-option>
  <fluent-option value="hi">This option has a value</fluent-option>
  <fluent-option selected>This option is selected by default</fluent-option>
</fluent-listbox>
`;

Listbox.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
