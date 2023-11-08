import { getRTL, getInitials } from '../../../Utilities';
import { BaseFloatingPicker } from '../BaseFloatingPicker';
import { SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import './PeoplePicker.scss';
import type { IBaseFloatingPickerProps } from '../BaseFloatingPicker.types';
import type { IPersonaProps } from '../../../Persona';
import type { IBasePickerSuggestionsProps, ISuggestionModel } from '../../../Pickers';

/**
 * {@docCategory FloatingPeoplePicker}
 */
export interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {}

/**
 * {@docCategory FloatingPeoplePicker}
 */
export class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {}

export class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
  public static defaultProps: any = {
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) =>
      SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createItem,
  };
}

export function createItem(name: string, isValid: boolean): ISuggestionModel<IPersonaProps> {
  const personaToConvert: any = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    isValid,
  };

  if (!isValid) {
    personaToConvert.imageInitials = getInitials(name, getRTL());
  }

  return personaToConvert;
}
