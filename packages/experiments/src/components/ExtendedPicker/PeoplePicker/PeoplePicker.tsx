/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { getRTL, getInitials } from '../../../Utilities';
import { BaseWellPicker } from '../BaseWellPicker';
import { IBaseWellPickerProps } from '../BaseWellPicker.Props';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import './PeoplePicker.scss';
import { IPickerItemProps, ValidationState } from 'office-ui-fabric-react/lib/Pickers';

export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }> {
}

export interface IPeopleWellPickerProps extends IBaseWellPickerProps<IPersonaProps> {
}

export class BaseWellPeoplePicker extends BaseWellPicker<IPersonaProps, IPeopleWellPickerProps> {
}

export class ExtendedPeoplePicker extends BaseWellPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
    // floatingPickerProps: {
    //   onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    //   createGenericItem: createGenericItem,
    // }
  };
}

export function createGenericItem(name: string, currentValidationState: ValidationState) {
  let personaToConvert = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    ValidationState: currentValidationState
  };

  if (currentValidationState !== ValidationState.warning) {
    personaToConvert.imageInitials = getInitials(name, getRTL());
  }

  return personaToConvert;
}