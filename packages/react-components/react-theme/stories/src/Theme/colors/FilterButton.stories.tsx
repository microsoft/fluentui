import * as React from 'react';
import type {
  ForwardRefComponent,
  MenuCheckedValueChangeEvent,
  MenuCheckedValueChangeData,
} from '@fluentui/react-components';
import {
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  MenuGroupHeader,
  makeStyles,
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

const useStyles = makeStyles({
  indicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0,
  },
});

export const TokensFilterButton: ForwardRefComponent<FilterButtonInterface> = React.forwardRef((props, ref) => {
  const { checkedValues, onChange } = props;
  const styles = useStyles();

  return (
    <div ref={ref}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            icon={<FilterRegular />}
            menuIcon={{ className: styles.indicator }}
            size="large"
            appearance="secondary"
          >
            {checkedValues?.usecase?.[0] ? `Filter: ${checkedValues.usecase[0]}` : 'Filter'}
          </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          {Object.entries(tokensUseCase).map(([key, useCases]) => (
            <React.Fragment key={key}>
              <MenuGroupHeader>{key.charAt(0).toUpperCase() + key.slice(1)}</MenuGroupHeader>
              <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
                {useCases.map((useCase, index) => (
                  <MenuItemRadio key={index} name="usecase" value={useCase} checkmark={{ className: styles.indicator }}>
                    {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                  </MenuItemRadio>
                ))}
              </MenuList>
            </React.Fragment>
          ))}
        </MenuPopover>
      </Menu>
    </div>
  );
});

TokensFilterButton.displayName = 'TokensFilterButton';
