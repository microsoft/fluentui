/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseSelectionItemsList } from '../BaseSelectionItemsList'
import { IBaseSelectionItemsListProps } from '../BaseSelectionItemsList.Props';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import '../../../../../office-ui-fabric-react/src/components/Pickers/PeoplePicker/PeoplePicker.scss';
import { IPickerItemProps, ValidationState, SelectedItemDefault } from 'office-ui-fabric-react/lib/pickers';

export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }> {
}

export interface IPeopleSelectionProps extends IBaseSelectionItemsListProps<IPersonaProps> {
}

export class BasePeopleSelectionItemsList extends BaseSelectionItemsList<IPersonaProps, IPeopleSelectionProps> {
}

/**
 * Standard People Picker.
 */
export class PeopleItemSelectionList extends BasePeopleSelectionItemsList {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
  };
}