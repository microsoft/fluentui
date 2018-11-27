/* tslint:disable */
import { IPickerItemProps, IInputProps } from '../../../Pickers';
/* tslint:enable */

import { IExtendedPersonaProps } from '../../../SelectedItemsList';
import { IPersonaProps } from '../../../Persona';
import './ExtendedPeoplePicker.scss';
import { BaseExtendedPicker } from '../BaseExtendedPicker';
import { IBaseExtendedPickerProps } from '../BaseExtendedPicker.types';
import { assign } from '@uifabric/utilities';

export interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps> {}

export interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {}

export class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {}

export class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
  protected inputProps = (): IInputProps => {
    const overwrittenInputProps: IInputProps = {
      autoCorrect: 'off',
      spellCheck: false
    };
    return assign({}, this.props.inputProps, overwrittenInputProps);
  };
}
