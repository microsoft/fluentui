import { fluentRadioGroup } from './index';

export default {
  title: 'Components/Radio Group',
  component: fluentRadioGroup,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

const RadioGroupTemplate = ({ disabled, required }) => `
  <fluent-radio-group
    ${disabled ? 'disabled' : ''}
    ${required ? 'required' : ''}
  >
    <fluent-radio>Apples</fluent-radio>
    <fluent-radio>Bananas</fluent-radio>
    <fluent-radio>Tomatoes</fluent-radio>
  </fluent-radio-group>`;

export const RadioGroup = RadioGroupTemplate.bind({});

RadioGroup.args = {
  disabled: false,
  required: false,
};

const example = `
<fluent-radio-group name="fruits" >
  <label style="color: --var(neutral-foreground-rest)" slot="label"> Numbers </label>
  <fluent-radio>Apples</fluent-radio>
  <fluent-radio>Bananas</fluent-radio>
  <fluent-radio>Bananas</fluent-radio>
</fluent-radio-group>
`;

RadioGroup.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
