/* tslint:disable */
import { IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
/* tslint:enable */

import { ISelectedPersonaProps } from '../../../SelectedItemsList';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import './ExtendedPeoplePicker.scss';
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import { IBaseExtendedPickerProps } from '../BaseExtendedPicker.types';

export interface IPeoplePickerItemProps extends IPickerItemProps<ISelectedPersonaProps> {
}

export interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {
}

export class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {
}

export class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
}