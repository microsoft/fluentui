/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import {
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  MenuDivider,
  MenuProps,
  tokens,
  Label,
  TabValue,
} from '@fluentui/react-components';

import type { DispatchTheme } from '../../useThemeDesignerReducer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
  },
  inlineInputs: {
    display: 'flex',
    columnGap: '1em',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export interface UseTabProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  dispatchState: DispatchTheme;
  sidebarId: string;
  setTab: React.Dispatch<TabValue>;
}

export const UseTab: React.FC<UseTabProps> = props => {
  const styles = useStyles();

  const { theme, setTheme, dispatchState, sidebarId } = props;

  const handleThemeChange: MenuProps['onCheckedValueChange'] = (e, data) => {
    const newTheme = data.checkedItems[0] as string;
    if (newTheme === 'Custom') {
      props.setTab('edit');
    } else {
      dispatchState({ type: newTheme });
    }
    setTheme(newTheme);
  };

  return (
    <div className={styles.root}>
      <div className={styles.inlineInputs} role="tabpanel" aria-labelledby="Use">
        <Label htmlFor={sidebarId + 'theme'}>Theme</Label>
        <Menu>
          <MenuTrigger>
            <Button>{theme}</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList onCheckedValueChange={handleThemeChange}>
              <MenuItemRadio name="Teams Light" value="Teams Light">
                Teams Light
              </MenuItemRadio>
              <MenuItemRadio name="Teams Dark" value="Teams Dark">
                Teams Dark
              </MenuItemRadio>
              <MenuItemRadio name="Web Light" value="Web Light">
                Web Light
              </MenuItemRadio>
              <MenuItemRadio name="Web Dark" value="Web Dark">
                Web Dark
              </MenuItemRadio>
              <MenuDivider />
              <MenuItemRadio name="Custom" value="Custom">
                Custom
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );
};
