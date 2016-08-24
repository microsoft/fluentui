import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from '../BasePicker';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../Persona';
import { PeopleSuggestions } from './PeopleSuggestions';
import { TagItem } from '../TagPicker/TagItem';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { ISelection, Selection, SelectionZone } from '../../../utilities/selection/index';
import { css } from '../../../utilities/css';
export interface IPeoplePickerProps extends React.Props<any> {
  onResolveSuggestions?: (text?: string, selectedItems?: IPersonaProps[]) => IPersonaProps[];
  onRenderSuggestion?: (props: IPersonaProps, index: number) => JSX.Element;
}

export interface IPeoplePickerItemProps extends IPickerItemProps {
  item: IPersonaProps;
}


/**
 * A dumb component that renders items for the PeoplePicker search dropdown.
 */
export const PeoplePickerSearchItemDefault: (persona: IPersonaProps, index: number) => JSX.Element = (persona: IPersonaProps, index: number) => {
  return (
    <div role='button' className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...persona }
        presence={ persona.presence ? persona.presence : PersonaPresence.online }
        />
    </div>
  );
};

export const PeoplePickerSelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let { item,
    onRemoveItem,
    index
  } = peoplePickerItemProps;
  return (
    <div className='ms-PickerPersona-Container'>
      <Persona
        { ...item }
        presence = { item.presence ? item.presence : PersonaPresence.online }
        className='ms-base-peoplepicker'
        />
      <button className='ms-base-peoplepicker' onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }>
        <i className='ms-Icon ms-Icon--x'></i>
      </button>
    </div>
  );
};

export class BasePeoplePicker extends BasePicker<IBasePickerProps> {
  render() {
    let { value } = this.state;

    return (
      <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection }>
          <div className='ms-BasePicker-text'>
            <input ref='input'
              onFocus={ this._onInputFocus }
              onChange={ this._onInputChange }
              value={ value }
              className='ms-BasePicker-input'
              />
          </div>
        </SelectionZone>
        { this.renderSuggestions() }
        <FocusZone ref='focusZone'>
          { this.renderItems() }
        </FocusZone>
      </div>
    );
  }
}

export class PeoplePicker extends React.Component<IPeoplePickerProps, {}> {
  render() {
    let { onResolveSuggestions } = this.props;
    return (
      <BasePeoplePicker
        onRenderItem={ props => <PeoplePickerSelectedItemDefault { ...props }/>}
        onRenderSuggestions={ props =>
          <PeopleSuggestions { ...props }
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestion={ itemProps => <PeoplePickerSearchItemDefault {...itemProps}/> }/> }
        />
    );
  }
}
