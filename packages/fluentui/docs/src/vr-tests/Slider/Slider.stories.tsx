import { ComponentMeta } from '@storybook/react';
import { Slider } from '@fluentui/react-northstar';
import SliderExampleDisabledShorthand from '../../examples/components/Slider/States/SliderExampleDisabled.shorthand';
import SliderExampleActionShorthand from '../../examples/components/Slider/Usage/SliderExampleAction.shorthand';
import SliderExampleFormShorthand from '../../examples/components/Slider/Usage/SliderExampleForm.shorthand';
import SliderExampleFluidShorthand from '../../examples/components/Slider/Variations/SliderExampleFluid.shorthand';
import SliderExampleVerticalShorthand from '../../examples/components/Slider/Variations/SliderExampleVertical.shorthand';

export default { component: Slider, title: 'Slider' } as ComponentMeta<typeof Slider>;

export {
  SliderExampleDisabledShorthand,
  SliderExampleActionShorthand,
  SliderExampleFormShorthand,
  SliderExampleFluidShorthand,
  SliderExampleVerticalShorthand,
};
