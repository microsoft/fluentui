import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import descriptionMd from './DatePickerDescription.md';
import './date-picker.module.css';

export { Default } from './DatePickerDefault.stories';
export { Editable } from './DatePickerEditable.stories';
export { Controlled } from './DatePickerControlled.stories';
export { Disabled } from './DatePickerDisabled.stories';
export { InitiallyOpen } from './DatePickerInitiallyOpen.stories';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { docs: { description: { component: descriptionMd } } },
};
