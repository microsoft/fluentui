import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from '../BasePicker';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../Persona';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { SuggestionItemDefault } from './PeoplePickerItems/SuggestionItemDefault';
import { TagItem } from '../TagPicker/TagItem';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { ISelection, Selection, SelectionZone } from '../../../utilities/selection/index';
import { css } from '../../../utilities/css';
import { SelectedItemWithMenu } from './PeoplePickerItems/SelectedItemWithMenu';
import './PeoplePicker2.scss';

export enum PeoplePickerType {
  /**
   * Standard People Picker.
   */
  normal,
  /**
   * MemberList layout. The selected people show up below the search box.
   */
  list
}

export interface IPeoplePickerProps extends React.Props<any> {
  onResolveSuggestions?: (text?: string) => IPersonaProps[];
  onRenderSuggestion?: (props: IPersonaProps) => JSX.Element;
  peoplePickerType?: PeoplePickerType;
}

export class BasePeoplePicker extends BasePicker<IPersonaProps, IBasePickerProps<IPersonaProps>> {
}

export class MemberListBelow extends BasePeoplePicker {
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
        <FocusZone ref='focusZone'>
          { this.renderItems() }
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }
  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.refs.input) {
      if (value && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          value: value.substring(0, this.refs.input.selectionStart)
        });
      }
    }
  }
}

export class PeoplePicker extends React.Component<IPeoplePickerProps, { contextualMenuVisible?: boolean, contextualMenuTarget?: HTMLElement; }> {

  static defaultProps = {
    peoplePickerType: PeoplePickerType.normal
  }

  constructor() {
    super();
    this.state = {
      contextualMenuVisible: false,
      contextualMenuTarget: null
    }
  }

  render() {
    let { onResolveSuggestions, onRenderSuggestion, peoplePickerType } = this.props;
    let pickerProps: IBasePickerProps<IPersonaProps> = {
      onRenderItem: props => <SelectedItemDefault {...props} />,
      onResolveSuggestions: onResolveSuggestions,
      onRenderSuggestion: (persona: IPersonaProps) => onRenderSuggestion ?
        onRenderSuggestion(persona) :
        SuggestionItemDefault(persona)
    }
    return (<BasePeoplePicker { ...pickerProps }/>);
  }
}
