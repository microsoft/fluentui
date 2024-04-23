import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { DrawerBody } from '@fluentui/react-drawer';
import { Folder20Filled, Folder20Regular, bundleIcon } from '@fluentui/react-icons';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { useIsSSR } from '@fluentui/react-utilities';

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

export const NavDrawerOverlay = () => {
  const isSSR = useIsSSR();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    if (!isSSR) {
      setOpen(true);
    }
  }, [isSSR]);
  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div>
      <NavDrawer defaultSelectedValue={'10'} defaultSelectedCategoryValue={'8'} type={'overlay'} open={open}>
        <DrawerBody>
          some text
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
    </div>
  );
};
