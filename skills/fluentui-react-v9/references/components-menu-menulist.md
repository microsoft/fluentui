# Components/Menu/MenuList

A menu list displays a list of actions. It is usually rendered inside of the Menu component.

## Props

| Name                   | Type                                                                           | Required | Default | Description                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                   | `"div"`                                                                        | No       |         |                                                                                                                                                               |
| `checkedValues`        | `Record<string, string[]>`                                                     | No       |         | Map of all checked values                                                                                                                                     |
| `defaultCheckedValues` | `Record<string, string[]>`                                                     | No       |         | Default values to be checked on mount                                                                                                                         |
| `hasCheckmarks`        | `boolean`                                                                      | No       |         | States that menu items can contain selectable items and reserve slots for item alignment                                                                      |
| `hasIcons`             | `boolean`                                                                      | No       |         | States that menu items can contain icons and reserve slots for item alignment                                                                                 |
| `onCheckedValueChange` | `((e: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => void)` | No       |         | Callback when checked items change for value with a name @param event - React's original SyntheticEvent @param data - A data object with relevant information |
| `ref`                  | `Ref<HTMLDivElement>`                                                          | No       |         |                                                                                                                                                               |

## Subcomponents

### MenuDivider

Define a styled MenuDivider, using the `useMenuDivider_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MenuGroup

Define a styled MenuGroup, using the `useMenuGroup_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MenuGroupHeader

Define a styled MenuGroupHeader, using the `useMenuGroupHeader_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MenuItem

Define a styled MenuItem, using the `useMenuItem_unstable` and `useMenuItemStyles_unstable` hook.

#### Props

| Name                | Type                                                                                                                                         | Required | Default | Description                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                | `"div"`                                                                                                                                      | No       |         |                                                                                                              |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot rendered before children content                                                                                                                              |
| `secondaryContent`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Secondary content rendered opposite the primary content (e.g Shortcut text)                                                                                             |
| `checkmark`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | A helper slot for alignment when a menu item is used with selectable menuitems Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components |
| `submenuIndicator`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot that shows the indicator for a submenu                                                                                                                        |
| `subText`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Additional descriptor to main content that creates a multiline layout                                                                                                   |
| `content`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible                           |
| `hasSubmenu`        | `boolean`                                                                                                                                    | No       | false   | If the menu item is a trigger for a submenu                                                                  |
| `persistOnClick`    | `boolean`                                                                                                                                    | No       | false   | Clicking on the menu item will not dismiss an open menu                                                      |
| `disabled`          | `boolean`                                                                                                                                    | No       |         |                                                                                                              |
| `disabledFocusable` | `boolean`                                                                                                                                    | No       |         | @deprecated this property does nothing. disabled focusable is by default by simply using `disabled` property |
| `ref`               | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                                              |

### MenuItemCheckbox

Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox_unstable` hook.

#### Props

| Name                | Type                                                                                                                                         | Required | Default | Description                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                | `"div"`                                                                                                                                      | No       |         |                                                                                                              |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot rendered before children content                                                                                                                              |
| `secondaryContent`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Secondary content rendered opposite the primary content (e.g Shortcut text)                                                                                             |
| `checkmark`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | A helper slot for alignment when a menu item is used with selectable menuitems Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components |
| `submenuIndicator`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot that shows the indicator for a submenu                                                                                                                        |
| `subText`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Additional descriptor to main content that creates a multiline layout                                                                                                   |
| `content`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible                           |
| `hasSubmenu`        | `boolean`                                                                                                                                    | No       | false   | If the menu item is a trigger for a submenu                                                                  |
| `persistOnClick`    | `boolean`                                                                                                                                    | No       | false   | Clicking on the menu item will not dismiss an open menu                                                      |
| `disabled`          | `boolean`                                                                                                                                    | No       |         |                                                                                                              |
| `disabledFocusable` | `boolean`                                                                                                                                    | No       |         | @deprecated this property does nothing. disabled focusable is by default by simply using `disabled` property |
| `name`              | `string`                                                                                                                                     | Yes      |         | Follows input convention https://www.w3schools.com/jsref/prop_checkbox_name.asp                              |
| `value`             | `string`                                                                                                                                     | Yes      |         | Follows input convention https://www.w3schools.com/jsref/prop_checkbox_value.asp                             |
| `ref`               | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                                              |

### MenuItemLink

MenuItemLink component

#### Props

| Name               | Type                                                                                                                                           | Required         | Default | Description |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`          | `((WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null) & string)` | No      |             | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible                           |
| `icon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>   | null`            | No      |             | Icon slot rendered before children content                                                                                                                              |
| `secondaryContent` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>   | null`            | No      |             | Secondary content rendered opposite the primary content (e.g Shortcut text)                                                                                             |
| `checkmark`        | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>   | null`            | No      |             | A helper slot for alignment when a menu item is used with selectable menuitems Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components |
| `as`               | `"a"`                                                                                                                                          | No               |         |             |
| `disabled`         | `boolean`                                                                                                                                      | No               |         |             |
| `ref`              | `Ref<HTMLAnchorElement>`                                                                                                                       | No               |         |             |

### MenuItemRadio

Define a styled MenuItemRadio, using the `useMenuItemRadio_unstable` hook.

#### Props

| Name                | Type                                                                                                                                         | Required | Default | Description                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                | `"div"`                                                                                                                                      | No       |         |                                                                                                              |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot rendered before children content                                                                                                                              |
| `secondaryContent`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Secondary content rendered opposite the primary content (e.g Shortcut text)                                                                                             |
| `checkmark`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | A helper slot for alignment when a menu item is used with selectable menuitems Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components |
| `submenuIndicator`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Icon slot that shows the indicator for a submenu                                                                                                                        |
| `subText`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Additional descriptor to main content that creates a multiline layout                                                                                                   |
| `content`           | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                              | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible                           |
| `hasSubmenu`        | `boolean`                                                                                                                                    | No       | false   | If the menu item is a trigger for a submenu                                                                  |
| `persistOnClick`    | `boolean`                                                                                                                                    | No       | false   | Clicking on the menu item will not dismiss an open menu                                                      |
| `disabled`          | `boolean`                                                                                                                                    | No       |         |                                                                                                              |
| `disabledFocusable` | `boolean`                                                                                                                                    | No       |         | @deprecated this property does nothing. disabled focusable is by default by simply using `disabled` property |
| `name`              | `string`                                                                                                                                     | Yes      |         | Follows input convention https://www.w3schools.com/jsref/prop_checkbox_name.asp                              |
| `value`             | `string`                                                                                                                                     | Yes      |         | Follows input convention https://www.w3schools.com/jsref/prop_checkbox_value.asp                             |
| `ref`               | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                                              |

### MenuSplitGroup

Layout wrapper that provides extra keyboard navigation behavior for two `MenuItem` components.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Examples

### Checkbox Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { MenuList, MenuItemCheckbox, makeStyles, tokens } from '@fluentui/react-components';
import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const CheckboxItems = (): JSXElement => {
  const styles = useMenuListContainerStyles();

  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </div>
  );
};
```

### Controlled Checkbox Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { MenuList, MenuItemCheckbox, makeStyles, tokens } from '@fluentui/react-components';
import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';
import type { MenuProps } from '@fluentui/react-components';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const ControlledCheckboxItems = (): JSXElement => {
  const styles = useMenuListContainerStyles();
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ edit: ['cut', 'paste'] });
  const onChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <div className={styles.container}>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </div>
  );
};
```

### Controlled Radio Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { MenuList, MenuItemRadio, makeStyles, tokens } from '@fluentui/react-components';
import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';
import type { MenuProps } from '@fluentui/react-components';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const ControlledRadioItems = (): JSXElement => {
  const styles = useMenuListContainerStyles();
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ font: ['calibri'] });
  const onChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => ({ ...s, [name]: checkedItems }));
  };

  return (
    <div className={styles.container}>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, MenuList, MenuItem } from '@fluentui/react-components';

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const Default = (): JSXElement => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </div>
  );
};
```

### Menu List With Nested Submenus

A permanent `MenuList` can also nest `Menu` components. This can be useful when embedding `MenuList` inside
a custom temporary surface such as a popover dialog.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, MenuList, MenuItem, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const MenuListWithNestedSubmenus = (): JSXElement => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuItem>Preferences</MenuItem>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Cut</MenuItem>
              <MenuItem>Paste</MenuItem>
              <MenuItem>Edit</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </div>
  );
};
```

### Radio Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { MenuList, MenuItemRadio, makeStyles, tokens } from '@fluentui/react-components';
import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const RadioItems = (): JSXElement => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </div>
  );
};
```
