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
import { Folder20Filled, Folder20Regular, bundleIcon } from '@fluentui/react-icons';
import { Button } from '../../../react-button/src/Button';

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

export const NavDrawerOverlay = (props: Partial<NavDrawerProps>) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  console.log(isOpen);

  return (
    <>
      <NavDrawer
        defaultSelectedValue={'10'}
        defaultSelectedCategoryValue={'8'}
        type={'overlay'}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
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
      </NavDrawer>
      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>
    </>
  );
};
