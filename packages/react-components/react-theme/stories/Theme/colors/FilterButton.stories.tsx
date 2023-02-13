import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuDivider,
  MenuItemRadio,
  MenuGroupHeader,
  MenuCheckedValueChangeEvent,
  MenuCheckedValueChangeData,
} from '@fluentui/react-components';

import { FilterRegular } from '@fluentui/react-icons';

interface FilterButtonInterface {
  checkedValues?: Record<string, string[]>;
  onChange: (e: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => void;
}

export const TokensFilterButton = (props: FilterButtonInterface) => {
  const { checkedValues, onChange } = props;
  return (
    <div>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton icon={<FilterRegular />} appearance="transparent">
            Filter
          </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuGroupHeader>Usage</MenuGroupHeader>
          <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
            <MenuItemRadio name="usecase" value="background">
              Background
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="foreground">
              Foreground
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="stencil">
              Stencil
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="shadow">
              Shadow
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="stroke">
              Stroke
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="border">
              Border
            </MenuItemRadio>
            <MenuDivider />
            <MenuGroupHeader>State</MenuGroupHeader>
            <MenuItemRadio name="usecase" value="rest">
              Rest
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="hover">
              Hover
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="pressed">
              Pressed
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="selected">
              Selected
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="focus">
              Focused
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="disabled">
              Disabled
            </MenuItemRadio>
            <MenuDivider />
            <MenuGroupHeader>Styles</MenuGroupHeader>
            <MenuItemRadio name="usecase" value="inverted">
              Inverted
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="static">
              Static
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="transparent">
              Transparent
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="alpha">
              Alpha
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="link">
              Link
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="accessible">
              Accessible
            </MenuItemRadio>
            <MenuItemRadio name="usecase" value="subtle">
              Subtle
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
