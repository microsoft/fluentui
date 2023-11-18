import { ComponentMeta } from '@storybook/react';
import { Layout } from '@fluentui/react-northstar';
import LayoutExample from '../../examples/components/Layout/Types/LayoutExample.shorthand';
import LayoutExampleVertical from '../../examples/components/Layout/Types/LayoutExampleVertical.shorthand';
import LayoutExampleDisappearing from '../../examples/components/Layout/Variations/LayoutExampleDisappearing.shorthand';
import LayoutExampleGap from '../../examples/components/Layout/Variations/LayoutExampleGap.shorthand';
import LayoutExampleReducing from '../../examples/components/Layout/Variations/LayoutExampleReducing.shorthand';

export default { component: Layout, title: 'Layout' } as ComponentMeta<typeof Layout>;

export { LayoutExample, LayoutExampleVertical, LayoutExampleDisappearing, LayoutExampleGap, LayoutExampleReducing };
