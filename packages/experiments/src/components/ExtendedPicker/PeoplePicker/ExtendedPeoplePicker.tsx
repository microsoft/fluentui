/* tslint:disable */
import { IPickerItemProps, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
/* tslint:enable */

import { IExtendedPersonaProps } from 'experiments/lib/SelectedItemsList';
import './ExtendedPeoplePicker.scss';
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import { IBaseExtendedPickerProps } from '../BaseExtendedPicker.Props';

export interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps & { ValidationState: ValidationState }> {
}

export interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IExtendedPersonaProps> {
}

export class BaseExtendedPeoplePicker extends BaseExtendedPicker<IExtendedPersonaProps, IExtendedPeoplePickerProps> {
}

export class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
}