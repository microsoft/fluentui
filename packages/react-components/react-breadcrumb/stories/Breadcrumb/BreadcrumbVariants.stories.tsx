import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbLink,
  BreadcrumbDivider,
} from '@fluentui/react-breadcrumb';
import { MenuButton, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
const items = [
  {
    key: 0,
    item: 'Item',
  },
  {
    key: 1,
    item: 'Item',
  },
  {
    key: 2,
    item: 'Item',
  },
];
const buttonItems = [
  {
    key: 0,
    item: 'Item',
    onClick: () => console.log('item 0 was clicked'),
  },
  {
    key: 1,
    item: 'Item',
    onClick: () => console.log('item 1 was clicked'),
  },
  {
    key: 2,
    item: 'Item',
    onClick: () => console.log('item 2 was clicked'),
  },
  {
    key: 3,
    item: 'Item',
    onClick: () => console.log('item 3 was clicked'),
  },
  {
    key: 4,
    item: 'Item',
    onClick: () => console.log('item 4 was clicked'),
  },
  {
    key: 5,
    item: 'Item',
    onClick: () => console.log('item 5 was clicked'),
  },
];
const linkItems = [
  {
    key: 0,
    item: 'Item',
    href: '#',
  },
  {
    key: 1,
    item: 'Item',
    href: '#',
  },
  {
    key: 2,
    item: 'Item',
    href: '#',
  },
];
const maxDisplayedItems = 4;
const overflowIndex = 2;
const buttonItemsCount = buttonItems.length;
const showOverflowButton = buttonItemsCount > maxDisplayedItems;
let overflowItems: { key: number; item: string; onClick?: () => void }[] = [];
if (showOverflowButton && maxDisplayedItems) {
  const numberItemsToHide = buttonItemsCount - maxDisplayedItems;
  const overflowItem = { key: overflowIndex, item: 'overflow-button' };
  overflowItems = buttonItems.splice(overflowIndex, numberItemsToHide, overflowItem);
}

export const Default = () => (
  <>
    <Breadcrumb size="small">
      {items.map((el, i) => {
        return (
          <React.Fragment key={`${el.key}-item`}>
            <BreadcrumbItem>{el.item}</BreadcrumbItem>
            {el.key !== items.length - 1 && <BreadcrumbDivider />}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
    <Breadcrumb>
      {linkItems.map((el, i) => {
        return (
          <React.Fragment key={`${el.key}-link`}>
            <BreadcrumbItem>
              <BreadcrumbLink href={el.href}>{el.item}</BreadcrumbLink>
              {el.key !== linkItems.length - 1 && <BreadcrumbDivider />}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </Breadcrumb>
    <Breadcrumb size="large">
      {buttonItems.map((el, i) => {
        if (el.item === 'overflow-button') {
          return (
            <BreadcrumbItem>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton>...</MenuButton>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    {overflowItems.map(overflowItem => (
                      <MenuItem key={`menu-${overflowItem.key}`}>
                        <BreadcrumbButton onClick={overflowItem.onClick}>{overflowItem.item}</BreadcrumbButton>
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            </BreadcrumbItem>
          );
        }
        return (
          <React.Fragment key={`${el.key}-button`}>
            <BreadcrumbItem>
              <BreadcrumbButton onClick={el.onClick}>{el.item}</BreadcrumbButton>
              {el.key !== buttonItems.length - 1 && <BreadcrumbDivider />}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  </>
);

// const EditorLayoutSubMenu = () => {
//   return (
//     <Menu>
//       <MenuTrigger disableButtonEnhancement>
//         <MenuItem>Editor Layout</MenuItem>
//       </MenuTrigger>

//       <MenuPopover>
//         <MenuList>
//           <MenuItem>Split Up</MenuItem>
//           <MenuItem>Split Down</MenuItem>
//           <MenuItem>Single</MenuItem>
//         </MenuList>
//       </MenuPopover>
//     </Menu>
//   );
// };

// const AppearanceSubMenu = () => {
//   return (
//     <Menu>
//       <MenuTrigger disableButtonEnhancement>
//         <MenuItem>Appearance</MenuItem>
//       </MenuTrigger>

//       <MenuPopover>
//         <MenuList>
//           <MenuItem>Centered Layout</MenuItem>
//           <MenuItem>Zen</MenuItem>
//           <MenuItem disabled>Zoom In</MenuItem>
//           <MenuItem>Zoom Out</MenuItem>
//         </MenuList>
//       </MenuPopover>
//     </Menu>
//   );
// };

// const PreferencesSubMenu = () => {
//   return (
//     <Menu>
//       <MenuTrigger disableButtonEnhancement>
//         <MenuItem>Preferences</MenuItem>
//       </MenuTrigger>

//       <MenuPopover>
//         <MenuList>
//           <MenuItem>Settings</MenuItem>
//           <MenuItem>Online Services Settings</MenuItem>
//           <MenuItem>Extensions</MenuItem>
//           <AppearanceSubMenu />
//           <EditorLayoutSubMenu />
//         </MenuList>
//       </MenuPopover>
//     </Menu>
//   );
// };

// export const NestedSubmenus = () => {
//   return (
//     <Menu>
//       <MenuTrigger disableButtonEnhancement>
//         <Button>Toggle menu</Button>
//       </MenuTrigger>

//       <MenuPopover>
//         <MenuList>
//           <MenuItem>New </MenuItem>
//           <MenuItem>New Window</MenuItem>
//           <MenuItem disabled>Open File</MenuItem>
//           <MenuItem>Open Folder</MenuItem>
//           <PreferencesSubMenu />
//         </MenuList>
//       </MenuPopover>
//     </Menu>
//   );
// };
