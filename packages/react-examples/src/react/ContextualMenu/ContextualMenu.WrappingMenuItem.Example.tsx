import * as React from 'react';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import type {
  IContextualMenuProps,
  IContextualMenuStyles,
  IContextualMenuItemStyles,
} from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';

// text wrapping styles
const menuItemStyles: Partial<IContextualMenuItemStyles> = {
  root: {
    height: 'auto',
  },
  linkContent: {
    minHeight: '36px',
  },
  label: {
    whiteSpace: 'normal',
    lineHeight: '1.2',
    padding: '4px 0',
  },
};

// prevent the menu from expanding with the longer text
const menuStyles: Partial<IContextualMenuStyles> = {
  root: {
    maxWidth: '200px',
  },
};

export const ContextualMenuWithWrappingMenuItemExample: React.FunctionComponent = () => {
  const menuProps: IContextualMenuProps = useConst(() => ({
    shouldFocusOnMount: true,
    styles: menuStyles,
    items: [
      { key: 'newItem', text: 'New', itemProps: { styles: menuItemStyles } },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider, itemProps: { styles: menuItemStyles } },
      {
        key: 'rename',
        text: 'Rename',
        itemProps: { styles: menuItemStyles },
      },
      { key: 'edit', text: 'Edit', itemProps: { styles: menuItemStyles } },
      {
        key: 'properties',
        text: 'Properties',
        itemProps: { styles: menuItemStyles },
      },
      {
        key: 'long',
        text: 'Item with an extra long name that should wrap to a new line',
        itemProps: { styles: menuItemStyles },
      },
    ],
  }));

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};
