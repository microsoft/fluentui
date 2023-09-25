import './ExtendedPeoplePicker.scss';
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import type { IPickerItemProps } from '../../../Pickers';
import type { IExtendedPersonaProps } from '../../../SelectedItemsList';
import type { IPersonaProps } from '../../../Persona';
import type { IBaseExtendedPickerProps } from '../BaseExtendedPicker.types';

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
