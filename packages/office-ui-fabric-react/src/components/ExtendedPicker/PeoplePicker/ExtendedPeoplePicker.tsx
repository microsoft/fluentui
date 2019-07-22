/* tslint:disable */
import { IPickerItemProps } from '../../../Pickers';
/* tslint:enable */

import { IExtendedPersonaProps } from '../../../SelectedItemsList';
import { IPersonaProps } from '../../../Persona';
import './ExtendedPeoplePicker.scss';
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import { IBaseExtendedPickerProps } from '../BaseExtendedPicker.types';

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps> {}

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {}

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {}

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {}
