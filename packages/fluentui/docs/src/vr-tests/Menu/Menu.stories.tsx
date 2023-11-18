import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import MenuPlayground from '../../examples/components/Menu/Playground';
import MenuExample from '../../examples/components/Menu/Rtl/MenuExample.rtl';
import MenuExampleKind from '../../examples/components/Menu/Slots/MenuExampleDivider.shorthand';
import MenuExampleDividerHorizontal from '../../examples/components/Menu/Slots/MenuExampleDividerHorizontal';
import MenuExampleIconOnly from '../../examples/components/Menu/Slots/MenuExampleIconOnly';
import MenuExampleSlot from '../../examples/components/Menu/Slots/MenuExampleSlot';
import MenuExampleWithIcons from '../../examples/components/Menu/Slots/MenuExampleWithIcons';
import MenuControlledExampleDisabled from '../../examples/components/Menu/States/MenuControlledExample.shorthand';
import MenuItemExampleDisabled from '../../examples/components/Menu/States/MenuItemExampleDisabled.shorthand';
import MenuExamplePointing from '../../examples/components/Menu/Types/MenuExamplePointing';
import MenuExampleUnderlined from '../../examples/components/Menu/Types/MenuExampleUnderlined';
import MenuExampleTabShorthand from '../../examples/components/Menu/Usage/MenuExampleTabList.shorthand';
import MenuWithSubmenuControlledExample from '../../examples/components/Menu/Usage/MenuExampleWithSubmenuControlled.shorthand';
import MenuExampleWithTooltip from '../../examples/components/Menu/Usage/MenuExampleWithTooltip';
import MenuExampleFluid from '../../examples/components/Menu/Variations/MenuExampleFluid.shorthand';
import MenuExampleVerticalPointing from '../../examples/components/Menu/Variations/MenuExampleVerticalPointing';
import MenuExampleVertical from '../../examples/components/Menu/Visual/MenuExampleVertical';

export default { component: Menu, title: 'Menu' } as ComponentMeta<typeof Menu>;

export {
  MenuPlayground,
  MenuExample,
  MenuExampleKind,
  MenuExampleDividerHorizontal,
  MenuExampleIconOnly,
  MenuExampleSlot,
  MenuExampleWithIcons,
  MenuControlledExampleDisabled,
  MenuItemExampleDisabled,
  MenuExamplePointing,
  MenuExampleUnderlined,
  MenuExampleTabShorthand,
  MenuWithSubmenuControlledExample,
  MenuExampleWithTooltip,
  MenuExampleFluid,
  MenuExampleVerticalPointing,
  MenuExampleVertical,
};
