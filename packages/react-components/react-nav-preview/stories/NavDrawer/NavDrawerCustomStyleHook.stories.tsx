import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerProps,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { DrawerBody, DrawerBodyState, DrawerFooter, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts/src/CustomStyleHooksContext';

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '480px', // arbitrary value, for demo purposes only
    // arbitrary value, for dramatic effect only
    // I know this is ugly and wrong, but styling is coming, I promise.
    backgroundColor: tokens.colorBackgroundOverlay,
  },
});

// This bit validates that the style hooks can be disagreed with.
const useNavDrawerBodyStyles = (state: unknown) => {
  const styles = useSharedNavBackgroundStyles();

  const drawerBodyState = state as DrawerBodyState;

  drawerBodyState.root.className = mergeClasses(drawerBodyState.root.className, styles.base);
};

const navCustomStyleHooks: CustomStyleHooksContextValue = {
  useDrawerBodyStyles_unstable: useNavDrawerBodyStyles,
};

const useSharedNavBackgroundStyles = makeStyles({
  base: {
    backgroundColor: 'green',
  },
});

export const NavDrawerCustomStyleHook = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue={'10'}
        customStyleHooks={navCustomStyleHooks}
        defaultSelectedCategoryValue={'8'}
        size="small"
        open={true}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Drawer with title</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <NavItem href="https://www.bing.com/" value="1">
            First
          </NavItem>
          <NavItem href="https://www.bing.com/" value="2">
            Second
          </NavItem>
          <NavItem href="https://www.bing.com/" value="3">
            Third
          </NavItem>
          <NavCategory value="4">
            <NavCategoryItem>NavCategoryItem 1</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href="https://www.bing.com/" value="5">
                Five
              </NavSubItem>
              <NavSubItem href="https://www.bing.com/" value="6">
                Six
              </NavSubItem>
              <NavSubItem href="https://www.bing.com/" value="7">
                Seven
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="8">
            <NavCategoryItem>NavCategoryItem2</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href="https://www.bing.com/" value="9">
                Nine
              </NavSubItem>
              <NavSubItem href="https://www.bing.com/" value="10">
                Ten
              </NavSubItem>
              <NavSubItem href="https://www.bing.com/" value="11">
                Eleven
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
        </DrawerBody>
        <DrawerFooter>I am a footer</DrawerFooter>
      </NavDrawer>
    </div>
  );
};
