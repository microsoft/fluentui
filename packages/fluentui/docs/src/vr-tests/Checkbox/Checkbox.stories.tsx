import { ComponentMeta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import CheckboxExampleRtl from '../../examples/components/Checkbox/Rtl/CheckboxExample.rtl';
import CheckboxExampleLabel from '../../examples/components/Checkbox/Slots/CheckboxExampleLabel.shorthand';
import CheckboxExampleChecked from '../../examples/components/Checkbox/States/CheckboxExampleChecked.shorthand';
import CheckboxExampleDisabled from '../../examples/components/Checkbox/States/CheckboxExampleDisabled.shorthand';
import CheckboxExampleLabelFlexColumn from '../../examples/components/Checkbox/Visual/CheckboxExampleLabelFlexColumn.shorthand';

export default { component: Checkbox, title: 'Checkbox' } as ComponentMeta<typeof Checkbox>;

export {
  CheckboxExampleRtl,
  CheckboxExampleLabel,
  CheckboxExampleChecked,
  CheckboxExampleDisabled,
  CheckboxExampleLabelFlexColumn,
};
