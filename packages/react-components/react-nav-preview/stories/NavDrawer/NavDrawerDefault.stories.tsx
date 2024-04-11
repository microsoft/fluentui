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
import { DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Folder20Filled, Folder20Regular, bundleIcon } from '@fluentui/react-icons';
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

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

export const Default = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={styles.root}>
      <NavDrawer defaultSelectedValue={'10'} defaultSelectedCategoryValue={'8'} size="small" open={true}>
        <DrawerHeader>
          <DrawerHeaderTitle>Drawer with title</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="1">
            First
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="2">
            Second
          </NavItem>
          <NavItem icon={<Folder />} target="_blank" onClick={someClickHandler} value="3">
            Third
          </NavItem>
          <NavCategory value="4">
            <NavCategoryItem icon={<Folder />}>NavCategoryItem 1</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="5">
                Five
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="6">
                Six
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="7">
                Seven
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="8">
            <NavCategoryItem icon={<Folder />}>NavCategoryItem2</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="9">
                Nine
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="10">
                Ten
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="11">
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
