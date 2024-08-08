import { Meta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import MenuPlayground from '../../examples/components/Menu/Playground';

import MenuExampleKind from '../../examples/components/Menu/Slots/MenuExampleDivider.shorthand';
import MenuExampleDividerHorizontal from '../../examples/components/Menu/Slots/MenuExampleDividerHorizontal';

import MenuExampleSlot from '../../examples/components/Menu/Slots/MenuExampleSlot';

import MenuControlledExampleDisabled from '../../examples/components/Menu/States/MenuControlledExample.shorthand';
import MenuItemExampleDisabled from '../../examples/components/Menu/States/MenuItemExampleDisabled.shorthand';

import MenuExampleTabShorthand from '../../examples/components/Menu/Usage/MenuExampleTabList.shorthand';
import MenuWithSubmenuControlledExample from '../../examples/components/Menu/Usage/MenuExampleWithSubmenuControlled.shorthand';

import MenuExampleFluid from '../../examples/components/Menu/Variations/MenuExampleFluid.shorthand';

export default { component: Menu, title: 'Menu' } as Meta<typeof Menu>;

export {
  MenuPlayground,
  MenuExampleKind,
  MenuExampleDividerHorizontal,
  MenuExampleSlot,
  MenuControlledExampleDisabled,
  MenuItemExampleDisabled,
  MenuExampleTabShorthand,
  MenuWithSubmenuControlledExample,
  MenuExampleFluid,
};
