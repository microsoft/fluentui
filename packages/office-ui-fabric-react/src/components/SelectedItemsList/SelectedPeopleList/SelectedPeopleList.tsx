/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseSelectedItemsList } from '../BaseSelectedItemsList';
import { IBaseSelectedItemsListProps, ISelectedItemProps } from '../BaseSelectedItemsList.types';
import { IPersonaProps } from '../../../Persona';
import { ExtendedSelectedItem } from './Items/ExtendedSelectedItem';
import { SelectedItemWithContextMenu } from './Items/SelectedItemWithContextMenu';
import { IRenderFunction } from '../../../Utilities';
import { IContextualMenuItem } from '../../../ContextualMenu';
import { IBaseFloatingPickerProps } from '../../../FloatingPicker';
import { EditingItem } from './Items/EditingItem';

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

/**
 * {@docCategory SelectedPeopleList}
 */
export class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {}

/**
 * Standard People Picker.
 */
export class SelectedPeopleList extends BasePeopleSelectedItemsList {
  // tslint:disable-next-line:no-any
  public static defaultProps: any = {
    onRenderItem: (props: ISelectedPeopleItemProps) => <ExtendedSelectedItem {...props} />
  };

  protected renderItems = (): JSX.Element[] => {
    const { items } = this.state;
    // tslint:disable-next-line:no-any
    return items.map((item: IExtendedPersonaProps, index: number) => this._renderItem(item, index));
  };

  // tslint:disable-next-line:no-any
  private _renderItem(item: IExtendedPersonaProps, index: number): JSX.Element {
    const { removeButtonAriaLabel } = this.props;
    const expandGroup = this.props.onExpandGroup;
    const props = {
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onCopyItem: (itemToCopy: IExtendedPersonaProps) => this.copyItems([itemToCopy]),
      onExpandItem: expandGroup ? () => expandGroup(item) : undefined,
      menuItems: this._createMenuItems(item)
    };

    const hasContextMenu = props.menuItems.length > 0;
    if ((item as IExtendedPersonaProps).isEditing && hasContextMenu) {
      return (
        <EditingItem
          {...props}
          onRenderFloatingPicker={this.props.onRenderFloatingPicker}
          floatingPickerProps={this.props.floatingPickerProps}
          onEditingComplete={this._completeEditing}
          getEditingItemText={this.props.getEditingItemText}
        />
      );
    } else {
      // This cast is here because we are guaranteed that onRenderItem is set
      // from static defaultProps
      // TODO: Move this component to composition with required onRenderItem to remove
      // this cast.
      const onRenderItem = this.props.onRenderItem as (props: ISelectedPeopleItemProps) => JSX.Element;
      const renderedItem = onRenderItem(props);
      return hasContextMenu ? (
        <SelectedItemWithContextMenu
          key={props.key}
          renderedItem={renderedItem}
          beginEditing={this._beginEditing}
          menuItems={this._createMenuItems(props.item)}
          item={props.item}
        />
      ) : (
        renderedItem
      );
    }
  }

  private _beginEditing = (item: IExtendedPersonaProps): void => {
    item.isEditing = true;
    this.forceUpdate();
  };

  // tslint:disable-next-line:no-any
  private _completeEditing = (oldItem: any, newItem: any): void => {
    oldItem.isEditing = false;
    this.replaceItem(oldItem, newItem);
  };

  // tslint:disable-next-line:no-any
  private _createMenuItems(item: any): IContextualMenuItem[] {
    const menuItems: IContextualMenuItem[] = [];

    if (this.props.editMenuItemText && this.props.getEditingItemText) {
      menuItems.push({
        key: 'Edit',
        text: this.props.editMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          this._beginEditing(menuItem.data);
        },
        data: item
      });
    }

    if (this.props.removeMenuItemText) {
      menuItems.push({
        key: 'Remove',
        text: this.props.removeMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          this.removeItem(menuItem.data as IExtendedPersonaProps);
        },
        data: item
      });
    }

    if (this.props.copyMenuItemText) {
      menuItems.push({
        key: 'Copy',
        text: this.props.copyMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          if (this.props.onCopyItems) {
            (this.copyItems as (items: IExtendedPersonaProps[]) => void)([menuItem.data] as IExtendedPersonaProps[]);
          }
        },
        data: item
      });
    }

    return menuItems;
  }
}
