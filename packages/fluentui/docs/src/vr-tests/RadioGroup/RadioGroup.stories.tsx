// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { RadioGroup } from '@fluentui/react-northstar';
import RadioGroupItemExample from '../../examples/components/RadioGroup/Item/RadioGroupItemExample.shorthand';
import RadioGroupItemExampleCheckedShorthand from '../../examples/components/RadioGroup/Item/RadioGroupItemExampleChecked.shorthand';
import RadioGroupItemExampleDisabledShorthand from '../../examples/components/RadioGroup/Item/RadioGroupItemExampleDisabled.shorthand';
import RadioGroupExampleRtl from '../../examples/components/RadioGroup/Rtl/RadioGroupExample.rtl';
import RadioGroupColorPickerExample from '../../examples/components/RadioGroup/Types/RadioGroupColorPickerExample.shorthand';
import RadioGroupVerticalExample from '../../examples/components/RadioGroup/Types/RadioGroupVerticalExample.shorthand';
import RadioGroupCustomExample from '../../examples/components/RadioGroup/Usage/RadioGroupCustomExample.shorthand';

export default { component: RadioGroup, title: 'RadioGroup' } as ComponentMeta<typeof RadioGroup>;

export {
  RadioGroupItemExample,
  RadioGroupItemExampleCheckedShorthand,
  RadioGroupItemExampleDisabledShorthand,
  RadioGroupExampleRtl,
  RadioGroupColorPickerExample,
  RadioGroupVerticalExample,
  RadioGroupCustomExample,
};
