import { ComponentMeta } from '@storybook/react';
import { Flex } from '@fluentui/react-northstar';
import FlexExampleMediaCard from '../../examples/components/Flex/Rtl/FlexExample.rtl';
import FlexExampleColumns from '../../examples/components/Flex/Types/FlexExampleColumns.shorthand';
import FlexExampleInput from '../../examples/components/Flex/Types/FlexExampleInput.shorthand';
import FlexExampleItemsAlignment from '../../examples/components/Flex/Types/FlexExampleItemsAlignment.shorthand';
import FlexExampleMixedAlignment from '../../examples/components/Flex/Types/FlexExampleMixedAlignment.shorthand';
import FlexExampleNavMenu from '../../examples/components/Flex/Types/FlexExampleNavMenu.shorthand';

export default { component: Flex, title: 'Flex' } as ComponentMeta<typeof Flex>;

export {
  FlexExampleMediaCard,
  FlexExampleColumns,
  FlexExampleInput,
  FlexExampleItemsAlignment,
  FlexExampleMixedAlignment,
  FlexExampleNavMenu,
};
