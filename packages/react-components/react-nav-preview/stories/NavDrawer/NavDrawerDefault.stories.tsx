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
import { DrawerBody } from '@fluentui/react-drawer';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
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

export const Default = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <NavDrawer defaultSelectedValue={'10'} defaultSelectedCategoryValue={'8'} size="small" open={true}>
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
      </NavDrawer>
    </div>
  );
};
