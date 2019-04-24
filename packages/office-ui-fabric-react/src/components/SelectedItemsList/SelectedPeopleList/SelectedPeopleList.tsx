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
import { EditingItem, EditingItemFloatingPickerProps } from './Items/EditingItem';

/**
 * {@docCategory SelectedPeopleList}
 */
export interface IExtendedPersonaProps extends IPersonaProps {
  key?: React.Key;
  isValid?: boolean;
  blockRecipientRemoval?: boolean;
  shouldBlockSelection?: boolean;
  canExpand?: boolean;
  isEditing?: boolean;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export interface ISelectedPeopleItemProps<TPersona extends IExtendedPersonaProps = IExtendedPersonaProps>
  extends ISelectedItemProps<TPersona> {
  onExpandItem?: () => void;
  renderPersonaCoin?: IRenderFunction<IPersonaProps>;
  renderPrimaryText?: IRenderFunction<IPersonaProps>;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export interface ISelectedPeopleProps<TPersona extends IExtendedPersonaProps = IExtendedPersonaProps>
  extends IBaseSelectedItemsListProps<TPersona> {
  onExpandGroup?: (item: TPersona) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
  editMenuItemText?: string;
  getEditingItemText?: (item: TPersona) => string;
  onRenderFloatingPicker?: React.ComponentType<EditingItemFloatingPickerProps<TPersona>>;
  floatingPickerProps?: IBaseFloatingPickerProps<TPersona>;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export class BasePeopleSelectedItemsList<TPersona extends IExtendedPersonaProps = IExtendedPersonaProps> extends BaseSelectedItemsList<
  TPersona,
  ISelectedPeopleProps<TPersona>
> {}

/**
 * Standard People Picker.
 */
export class SelectedPeopleList<TPersona extends IExtendedPersonaProps = IExtendedPersonaProps> extends BasePeopleSelectedItemsList<
  TPersona
> {
  public static defaultProps: Partial<ISelectedPeopleProps<IExtendedPersonaProps>> = {
    onRenderItem: (props: ISelectedPeopleItemProps<IExtendedPersonaProps>) => <ExtendedSelectedItem {...props} />
  };

  protected renderItems = (): JSX.Element[] => {
    const { items } = this.state;
    return items.map((item: TPersona, index: number) => this._renderItem(item, index));
  };

  private _renderItem(item: TPersona, index: number): JSX.Element {
    const { removeButtonAriaLabel } = this.props;
    const expandGroup = this.props.onExpandGroup;
    const props = {
      item,
      index,
      key: item.key !== undefined ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onCopyItem: (itemToCopy: TPersona) => this.copyItems([itemToCopy]),
      onExpandItem: expandGroup ? () => expandGroup(item) : undefined,
      menuItems: this._createMenuItems(item)
    };

    const hasContextMenu = props.menuItems.length > 0;
    if (item.isEditing && hasContextMenu && this.props.getEditingItemText) {
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
      // Assert onRenderItem is not null because it is provided in the defaultProps of this component.
      // it's still possible that it could be null if a deriving component overrides defaultProps.
      const renderedItem = (this.props.onRenderItem as NonNullable<ISelectedPeopleProps<IExtendedPersonaProps>['onRenderItem']>)(props);
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
          this.removeItem(menuItem.data);
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
