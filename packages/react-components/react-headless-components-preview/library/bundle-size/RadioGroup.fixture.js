// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Radio,
  RadioGroup,
  renderRadio,
  renderRadioGroup,
  useRadio,
  useRadioGroup,
  useRadioGroupContextValue,
  useRadioGroupContextValues,
} from '@fluentui/react-headless-components-preview/radio-group';

console.log(
  Radio,
  RadioGroup,
  renderRadio,
  renderRadioGroup,
  useRadio,
  useRadioGroup,
  useRadioGroupContextValue,
  useRadioGroupContextValues,
);

export default {
  name: '@fluentui/react-headless-components-preview/radio-group',
};
