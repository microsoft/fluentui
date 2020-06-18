/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseSelectedItemsList } from '../BaseSelectedItemsList';
import {
  IBaseSelectedItemsListProps,
  ISelectedItemProps,
  IBaseSelectedItemsList,
} from '../BaseSelectedItemsList.types';
import { IPersonaProps } from '../../../Persona';
import { ExtendedSelectedItem } from './Items/ExtendedSelectedItem';
import { SelectedItemWithContextMenu } from './Items/SelectedItemWithContextMenu';
import { IRenderFunction } from '../../../Utilities';
import { IContextualMenuItem } from '../../../ContextualMenu';
import { IBaseFloatingPickerProps } from '../../../FloatingPicker';
import { EditingItem } from './Items/EditingItem';
import { getPropsWithDefaults } from '@uifabric/utilities';
import { useMergedRefs, useForceUpdate } from '@uifabric/react-hooks';

/**
 * {@docCategory SelectedPeopleList}
 */
export interface IExtendedPersonaProps extends IPersonaProps {
  key?: React.Key;
  isValid: boolean;
  blockRecipientRemoval?: boolean;
  shouldBlockSelection?: boolean;
  canExpand?: boolean;
  isEditing?: boolean;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export interface ISelectedPeopleItemProps extends ISelectedItemProps<IExtendedPersonaProps> {
  onExpandItem?: () => void;
  renderPersonaCoin?: IRenderFunction<IPersonaProps>;
  renderPrimaryText?: IRenderFunction<IPersonaProps>;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
  onExpandGroup?: (item: IExtendedPersonaProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
  editMenuItemText?: string;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
  onRenderFloatingPicker?: React.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
  floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
}

const DEFAULT_PROPS = {
  onRenderItem: (props: ISelectedPeopleItemProps) => <ExtendedSelectedItem {...props} />,
};

/**
 * Standard People Picker.
 * @remark This component doesn't forward its refs because the underlying component returns an array of JSX.Elements,
 * with no single root.
 */
export const SelectedPeopleList = (propsWithoutDefaults: ISelectedPeopleProps) => {
  const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

  const selectedItemsList = React.useRef<IBaseSelectedItemsList<IExtendedPersonaProps>>();
  const mergedComponentRef = useMergedRefs(props.componentRef, selectedItemsList);

  const forceUpdate = useForceUpdate();

  const beginEditing = (item: IExtendedPersonaProps): void => {
    item.isEditing = true;
    forceUpdate();
  };

  const completeEditing = (oldItem: IExtendedPersonaProps, newItem: IExtendedPersonaProps): void => {
    oldItem.isEditing = false;
    selectedItemsList.current?.replaceItem?.(oldItem, newItem);
  };

  const createMenuItems = (item: IExtendedPersonaProps): IContextualMenuItem[] => {
    const menuItems: IContextualMenuItem[] = [];

    if (props.editMenuItemText && props.getEditingItemText) {
      menuItems.push({
        key: 'Edit',
        text: props.editMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          beginEditing(menuItem.data);
        },
        data: item,
      });
    }

    if (props.removeMenuItemText) {
      menuItems.push({
        key: 'Remove',
        text: props.removeMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          selectedItemsList.current?.removeItem?.(menuItem.data);
        },
        data: item,
      });
    }

    if (props.copyMenuItemText) {
      menuItems.push({
        key: 'Copy',
        text: props.copyMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          selectedItemsList.current?.copyItems?.([menuItem.data]);
        },
        data: item,
      });
    }

    return menuItems;
  };

  const renderItem = (itemProps: ISelectedPeopleItemProps): JSX.Element => {
    const expandGroup = props.onExpandGroup;
    const editingItemProps = {
      ...itemProps,
      onExpandItem: expandGroup ? () => expandGroup(itemProps.item) : undefined,
      menuItems: createMenuItems(itemProps.item),
    };

    const hasContextMenu = editingItemProps.menuItems.length > 0;
    if (itemProps.item.isEditing && hasContextMenu) {
      return (
        <EditingItem
          {...editingItemProps}
          onRenderFloatingPicker={props.onRenderFloatingPicker}
          floatingPickerProps={props.floatingPickerProps}
          onEditingComplete={completeEditing}
          getEditingItemText={props.getEditingItemText}
        />
      );
    } else {
      // This cast is here because we are guaranteed that onRenderItem is set
      // from static defaultProps
      const renderedItem = props.onRenderItem!(editingItemProps);
      return hasContextMenu ? (
        <SelectedItemWithContextMenu
          key={editingItemProps.key}
          renderedItem={renderedItem}
          beginEditing={beginEditing}
          menuItems={createMenuItems(editingItemProps.item)}
          item={editingItemProps.item}
        />
      ) : (
        renderedItem
      );
    }
  };

  return (
    <BaseSelectedItemsList<IExtendedPersonaProps>
      {...props}
      componentRef={mergedComponentRef}
      onRenderItem={renderItem}
    />
  );
};
SelectedPeopleList.displayName = 'SelectedPeopleList';
