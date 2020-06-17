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
import { initializeComponentRef } from '@uifabric/utilities';

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
  onRenderItem: (props: ISelectedPeopleItemProps) => JSX.Element;
}

/**
 * Standard People Picker.
 */
export class SelectedPeopleList extends React.Component<ISelectedPeopleProps> {
  public static defaultProps = {
    onRenderItem: (props: ISelectedPeopleItemProps) => <ExtendedSelectedItem {...props} />,
  };
  private _selectedItemsList = React.createRef<IBaseSelectedItemsList<IExtendedPersonaProps>>();

  constructor(props: ISelectedPeopleProps) {
    super(props);
    initializeComponentRef(this);
  }

  public render() {
    return (
      <BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps>
        {...this.props}
        componentRef={/** TODO: merge ref **/ this._selectedItemsList}
        onRenderItem={this._renderItem}
      />
    );
  }

  //#region TODO: forward to component ref
  /** TODO: forward component ref */

  public get items(): IExtendedPersonaProps[] | undefined {
    return this._selectedItemsList.current!.items;
  }

  public addItems(items: IExtendedPersonaProps[]) {
    return this._selectedItemsList.current!.addItems(items);
  }
  public copyItems(items: IExtendedPersonaProps[]) {
    return this._selectedItemsList.current!.copyItems(items);
  }
  public removeItem(items: IExtendedPersonaProps) {
    return this._selectedItemsList.current!.removeItem(items);
  }

  public replaceItem(
    itemToReplace: IExtendedPersonaProps,
    itemsToReplaceWith: IExtendedPersonaProps | IExtendedPersonaProps[],
  ) {
    return this._selectedItemsList.current!.replaceItem(itemToReplace, itemsToReplaceWith);
  }
  //#endregion

  private _renderItem = (itemProps: ISelectedPeopleItemProps): JSX.Element => {
    const expandGroup = this.props.onExpandGroup;
    const props = {
      ...itemProps,
      onExpandItem: expandGroup ? () => expandGroup(itemProps.item) : undefined,
      menuItems: this._createMenuItems(itemProps.item),
    };

    const hasContextMenu = props.menuItems.length > 0;
    if (itemProps.item.isEditing && hasContextMenu) {
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
      const renderedItem = this.props.onRenderItem(props);
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
  };

  private _beginEditing = (item: IExtendedPersonaProps): void => {
    item.isEditing = true;
    this.forceUpdate();
  };

  private _completeEditing = (oldItem: IExtendedPersonaProps, newItem: IExtendedPersonaProps): void => {
    oldItem.isEditing = false;
    this._selectedItemsList.current?.replaceItem?.(oldItem, newItem);
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
        data: item,
      });
    }

    if (this.props.removeMenuItemText) {
      menuItems.push({
        key: 'Remove',
        text: this.props.removeMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          this._selectedItemsList.current?.removeItem?.(menuItem.data);
        },
        data: item,
      });
    }

    if (this.props.copyMenuItemText) {
      menuItems.push({
        key: 'Copy',
        text: this.props.copyMenuItemText,
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          this._selectedItemsList.current?.copyItems?.([menuItem.data]);
        },
        data: item,
      });
    }

    return menuItems;
  }
}
