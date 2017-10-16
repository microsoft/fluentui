/* tslint:disable */
import * as React from 'react';
import { IPickerItemProps, ValidationState } from 'office-ui-fabric-react/lib/pickers';
/* tslint:enable */
import { BaseSelectionItemsList } from '../BaseSelectionItemsList';
import { IBaseSelectionItemsListProps } from '../BaseSelectionItemsList.Props';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import '../../../../../office-ui-fabric-react/src/components/Pickers/PeoplePicker/PeoplePicker.scss';
import { SelectedItemCanExpand } from './Items/SelectedItemCanExpand';
import { autobind } from '../../../Utilities';

export interface IExtendedPersonaProps extends IPersonaProps {
  canExpand?: boolean;
}

export interface IPeopleSelectionItemProps extends IPickerItemProps<IExtendedPersonaProps & { ValidationState: ValidationState }> {
  onExpandItem?: () => void;
  onCopyItem?: (item: IExtendedPersonaProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
}

export interface IPeopleSelectionProps extends IBaseSelectionItemsListProps<IPersonaProps> {
  onExpandGroup?: (item: IPeopleSelectionItemProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
}

export class BasePeopleSelectionItemsList extends BaseSelectionItemsList<IPersonaProps, IPeopleSelectionProps> {
}

/**
 * Standard People Picker.
 */
export class PeopleItemSelectionList extends BasePeopleSelectionItemsList {
  // tslint:disable-next-line:no-any
  public static defaultProps: any = {
    onRenderItem: (props: IPeopleSelectionItemProps) => <SelectedItemCanExpand {...props} />,
  };

  public onExpandItem(itemToExpand: IPeopleSelectionItemProps, expandedItems: IExtendedPersonaProps[]): void {
    let { items } = this.state;
    let index: number = items.indexOf(itemToExpand);
    // tslint:disable-next-line:no-any
    let filteredExpandedItems = expandedItems.filter((item: any) => items.indexOf(item) === -1)
    if (index > -1) {
      let newItems = items.slice(0, index).concat(filteredExpandedItems).concat(items.slice(index + 1));
      this.updateSelectedItems(newItems);
    }
  }

  @autobind
  protected renderItems(): JSX.Element[] {
    let { removeButtonAriaLabel } = this.props;
    let onRenderItem = this.props.onRenderItem as (props: IPeopleSelectionItemProps) => JSX.Element;

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
      onExpandItem: () => (this.props.onExpandGroup as any)(item),
      removeMenuItemText: this.props.removeMenuItemText,
      copyMenuItemText: this.props.copyMenuItemText,
    }));
  }
}