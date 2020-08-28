import * as React from 'react';
import {
  ContextualMenuItemType,
  IContextualMenuProps,
  IContextualMenuItem,
  IContextualMenuItemProps,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { useConst } from '@uifabric/react-hooks';

export const ContextualMenuWithCustomMenuItemExample: React.FunctionComponent = () => {
  const menuProps: IContextualMenuProps = useConst(() => ({
    items: menuItems,
    shouldFocusOnMount: true,
    contextualMenuItemAs: (props: IContextualMenuItemProps) => <div>Custom rendered {props.item.text}</div>,
  }));

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
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
