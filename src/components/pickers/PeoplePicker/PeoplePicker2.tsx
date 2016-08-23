import * as React from 'react';
import { BasePicker, IBasePickerProps } from '../BasePicker';
import { Persona, PersonaSize, IPersonaProps } from '../../Persona';
import { PeopleSuggestions } from './PeopleSuggestions';
import { TagItem } from '../TagPicker/TagItem';

export interface IPeoplePickerProps {
  onResolveSuggestions?: (text?: string, selectedItems?: IPersonaProps[]) => IPersonaProps[];
}

export class PeoplePicker extends React.Component<IPeoplePickerProps, {}> {
  render() {
    let { onResolveSuggestions } = this.props;

    return (
      <BasePicker
        onRenderItem={ props => <TagItem { ...props }><Persona { ...props.item } size={ PersonaSize.extraSmall } /></TagItem>}
        onRenderSuggestions={ props => <PeopleSuggestions { ...props } onResolveSuggestions={ onResolveSuggestions } /> }
      />
    );
  }
}
