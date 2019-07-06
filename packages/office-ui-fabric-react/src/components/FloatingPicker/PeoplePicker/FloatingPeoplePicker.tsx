import { getRTL, getInitials } from '../../../Utilities';
import { BaseFloatingPicker } from '../BaseFloatingPicker';
import { IBaseFloatingPickerProps } from '../BaseFloatingPicker.types';
import { SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { IPersonaProps } from '../../../Persona';
import './PeoplePicker.scss';
import { IBasePickerSuggestionsProps, ISuggestionModel } from '../../../Pickers';

/**
 * {@docCategory FloatingPeoplePicker}
 */
export interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {}

/**
 * {@docCategory FloatingPeoplePicker}
 */
export class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {}

export class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
  // tslint:disable-next-line:no-any
  public static defaultProps: any = {
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createItem
  };
}

export function createItem(name: string, isValid: boolean): ISuggestionModel<IPersonaProps> {
  // tslint:disable-next-line:no-any
  const personaToConvert: any = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    isValid: isValid
  };

  if (!isValid) {
    personaToConvert.imageInitials = getInitials(name, getRTL());
  }

  return personaToConvert;
}
