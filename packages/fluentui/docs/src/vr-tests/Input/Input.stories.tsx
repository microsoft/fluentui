import { ComponentMeta } from '@storybook/react';
import { Input } from '@fluentui/react-northstar';
import InputExampleRtl from '../../examples/components/Input/Rtl/InputExample.rtl';
import InputExampleDisabled from '../../examples/components/Input/State/InputExampleDisabled.shorthand';
import InputExampleFluid from '../../examples/components/Input/Variations/InputExampleFluid.shorthand';
import InputExampleIcon from '../../examples/components/Input/Variations/InputExampleIcon.shorthand';
import InputExampleIconClearableShorthand from '../../examples/components/Input/Variations/InputExampleIconClearable.shorthand';
import InputExampleIconPosition from '../../examples/components/Input/Variations/InputExampleIconPosition.shorthand';
import InputExampleInline from '../../examples/components/Input/Variations/InputExampleInline.shorthand';
import InputExampleInputSlot from '../../examples/components/Input/Variations/InputExampleInputSlot.shorthand';
import InputExampleTargeting from '../../examples/components/Input/Variations/InputExampleTargeting.shorthand';
import InputExampleWrapperSlot from '../../examples/components/Input/Variations/InputExampleWrapperSlot.shorthand';

export default { component: Input, title: 'Input' } as ComponentMeta<typeof Input>;

export {
  InputExampleRtl,
  InputExampleDisabled,
  InputExampleFluid,
  InputExampleIcon,
  InputExampleIconClearableShorthand,
  InputExampleIconPosition,
  InputExampleInline,
  InputExampleInputSlot,
  InputExampleTargeting,
  InputExampleWrapperSlot,
};
