/* tslint:disable */
import * as React from 'react';
import { IPickerItemProps, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
/* tslint:enable */
import { BaseSelectedItemsList } from '../BaseSelectedItemsList';
import { IBaseSelectedItemsListProps } from '../BaseSelectedItemsList.Props';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import '../../../../../office-ui-fabric-react/src/components/Pickers/PeoplePicker/PeoplePicker.scss';
import { ExtendedSelectedItem } from './Items/ExtendedSelectedItem';
import { autobind } from '../../../Utilities';

export interface IExtendedPersonaProps extends IPersonaProps {
  canExpand?: boolean;
}

export interface ISelectedPeopleItemProps extends IPickerItemProps<IExtendedPersonaProps & { ValidationState: ValidationState }> {
  onExpandItem?: () => void;
  onCopyItem?: (item: IExtendedPersonaProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
}

export interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
  onExpandGroup?: (item: IExtendedPersonaProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
}

export class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {
}

/**
 * Standard People Picker.
 */
export class SelectedPeopleList extends BasePeopleSelectedItemsList {
  // tslint:disable-next-line:no-any
  public static defaultProps: any = {
    onRenderItem: (props: ISelectedPeopleItemProps) => <ExtendedSelectedItem {...props} />,
  };

  public onExpandItem(itemToExpand: IExtendedPersonaProps, expandedItems: IExtendedPersonaProps[]): void {
    let { items } = this.state;
    let index: number = items.indexOf(itemToExpand);
    // tslint:disable-next-line:no-any
    let filteredExpandedItems = expandedItems.filter((item: any) => items.indexOf(item) === -1);
    if (index > -1) {
      let newItems = items.slice(0, index).concat(filteredExpandedItems).concat(items.slice(index + 1));
      this.updateSelectedItems(newItems);
    }
  }

  @autobind
  protected renderItems(): JSX.Element[] {
    let { removeButtonAriaLabel } = this.props;
    let onRenderItem = this.props.onRenderItem as (props: ISelectedPeopleItemProps) => JSX.Element;

    let { items } = this.state;
    // tslint:disable-next-line:no-any
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onCopyItem: (itemToCopy: IExtendedPersonaProps) => this.copyItems([itemToCopy]),
      // tslint:disable-next-line:no-any
      onExpandItem: this.props.onExpandGroup ? () => (this.props.onExpandGroup as any)(item) : undefined,
      removeMenuItemText: this.props.removeMenuItemText,
      copyMenuItemText: this.props.copyMenuItemText,
    }));
  }
}