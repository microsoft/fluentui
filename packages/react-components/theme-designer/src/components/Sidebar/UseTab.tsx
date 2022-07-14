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
  MenuProps,
  tokens,
  Label,
  TabValue,
  Switch,
} from '@fluentui/react-components';

import type { CustomAttributes, DispatchTheme } from '../../useThemeDesignerReducer';
import { themeList } from '../../utils/themeList';
import { Form } from './Form';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
    alignItems: 'center',
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
  dispatchAppState: React.Dispatch<DispatchTheme>;
  sidebarId: string;
  setTab: React.Dispatch<TabValue>;
  formState: CustomAttributes;
  setFormState: React.Dispatch<CustomAttributes>;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UseTab: React.FC<UseTabProps> = props => {
  const styles = useStyles();

  const { theme, setTheme, dispatchAppState, sidebarId, formState, setFormState, isDark, setIsDark } = props;

  const handleThemeChange: MenuProps['onCheckedValueChange'] = (e, data) => {
    const newTheme = data.checkedItems[0] as string;
    if (!themeList[newTheme].brand) {
      dispatchAppState({ type: newTheme, customAttributes: formState, overrides: {} });
    } else {
      dispatchAppState({ type: newTheme, overrides: {} });
    }
    setTheme(newTheme);
  };

  const handleIsDarkChange = () => {
    setIsDark(!isDark);
    dispatchAppState({ type: 'isDark', isDark: !isDark });
  };

  return (
    <div className={styles.root} role="tabpanel" aria-labelledby="Use">
      <div className={styles.inlineInputs}>
        <Label htmlFor={sidebarId + 'theme'}>Theme</Label>
        <Menu>
          <MenuTrigger>
            <Button>{theme}</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList onCheckedValueChange={handleThemeChange}>
              {Object.keys(themeList).map(currTheme => (
                <div key={currTheme}>
                  <MenuItemRadio name={currTheme} value={currTheme}>
                    {currTheme}
                  </MenuItemRadio>
                </div>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <Switch checked={isDark} onChange={handleIsDarkChange} label={isDark ? 'dark theme' : 'light theme'} />
      {!themeList[theme].brand ? (
        <Form
          sidebarId={sidebarId}
          dispatchAppState={props.dispatchAppState}
          formState={formState}
          setFormState={setFormState}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
