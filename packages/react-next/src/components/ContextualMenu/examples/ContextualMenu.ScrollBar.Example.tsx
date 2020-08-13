import * as React from 'react';
import { DirectionalHint, IContextualMenuProps, IContextualMenuItem } from '@fluentui/react-next/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react-next/lib/compat/Button';

export const ContextualMenuWithScrollBarExample: React.FunctionComponent = () => {
  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
  },
  {
    key: 'item 2',
    text: 'Item with a very long label text',
  },
  {
    key: 'edit',
    text: 'Edit',
  },
  {
    key: 'properties',
    text: 'Properties',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
  },
];

const menuProps: IContextualMenuProps = {
  shouldFocusOnMount: true,
  directionalHint: DirectionalHint.bottomRightEdge,
  directionalHintFixed: true,
  items: menuItems,
  calloutProps: {
    calloutMaxHeight: 65,
  },
};
