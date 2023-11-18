import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
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

const tokensUseCase = {
  usage: ['background', 'foreground', 'stencil', 'shadow', 'stroke', 'border'],
  state: ['hover', 'pressed', 'selected', 'focus', 'disabled'],
  styles: ['inverted', 'static', 'transparent', 'alpha', 'link', 'accessible', 'subtle'],
};

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
          {Object.entries(tokensUseCase).map(([key, useCases]) => (
            <>
              <MenuGroupHeader>{key.charAt(0).toUpperCase() + key.slice(1)}</MenuGroupHeader>
              <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
                {useCases.map((useCase, index) => (
                  <MenuItemRadio key={index} name="usecase" value={useCase}>
                    {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                  </MenuItemRadio>
                ))}
              </MenuList>
            </>
          ))}
        </MenuPopover>
      </Menu>
    </div>
  );
};
