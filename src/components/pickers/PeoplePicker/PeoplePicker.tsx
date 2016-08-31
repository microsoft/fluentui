import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { IBasePickerProps, IPickerItemProps } from '../BasePickerProps'
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../Persona';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { TagItem } from '../TagPicker/TagItem';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { ISelection, Selection, SelectionZone } from '../../../utilities/selection/index';
import { css } from '../../../utilities/css';
import { SelectedItemWithMenu } from './PeoplePickerItems/SelectedItemWithMenu';
import './PeoplePicker.scss';

export enum PeoplePickerType {
  /**
   * Standard People Picker.
   */
  normal,
  /**
 * Compact layout. It uses small personas when displaying search results.
 */
  compact,
  /**
   * MemberList layout. The selected people show up below the search box.
   */
  list,

  custom
}

export interface IPeoplePickerProps extends React.Props<any> {
  onResolveSuggestions?: (text?: string) => IPersonaProps[];
  onRenderSuggestion?: (props: IPersonaProps) => JSX.Element;
  peoplePickerType?: PeoplePickerType;
  onGetMoreResults?: (value: string) => IPersonaProps[];
  onRenderItem?: (persona: IPickerItemProps<IPersonaProps>) => JSX.Element;
}

export class BasePeoplePicker extends BasePicker<IPersonaProps, IBasePickerProps<IPersonaProps>> {

}
export class MemberListBelow extends BasePeoplePicker {

  render() {
    let { value } = this.state;

    return (
      <div>
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
        </div>
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

export class PeoplePicker extends React.Component<IPeoplePickerProps, {}> {

  static defaultProps = {
    peoplePickerType: PeoplePickerType.normal
  }

  constructor(props: IPeoplePickerProps) {
    super(props);
  }

  render() {
    switch (this.props.peoplePickerType) {
      case PeoplePickerType.normal:
        return (<NormalPeoplePicker { ...this.props }/>);
      case PeoplePickerType.list:
        return (<ListPeoplePicker { ...this.props }/>);
      case PeoplePickerType.compact:
        return (<CompactPeoplePicker { ...this.props }/>);
    }
  }
}

export class BasicPeoplePicker extends React.Component<IPeoplePickerProps, {}> {
  constructor(props: IPeoplePickerProps) {
    super(props);
  }

  render() {
    let {
      onResolveSuggestions,
      onRenderSuggestion,
      onRenderItem,
      peoplePickerType,
      onGetMoreResults
    } = this.props;
    let pickerProps: IBasePickerProps<IPersonaProps> = {
      onRenderItem: onRenderItem,
      onResolveSuggestions: onResolveSuggestions,
      onRenderSuggestion: onRenderSuggestion,
      getTextFromItem: (persona: IPersonaProps) => persona.primaryText,
      suggestionsHeaderText: 'Suggested People',
      className: 'ms-PeoplePicker',
      onGetMoreResults: onGetMoreResults
    }
    return this._renderPicker(pickerProps);
  }

  protected _renderPicker(props: IBasePickerProps<IPersonaProps>): JSX.Element {
    return <BasePeoplePicker { ...props }/>
  }
}

export class NormalPeoplePicker extends BasicPeoplePicker {
  static defaultProps = {
    onRenderItem: SelectedItemDefault,
    onRenderSuggestion: SuggestionItemNormal
  }
}

export class CompactPeoplePicker extends BasicPeoplePicker {
  static defaultProps = {
    onRenderItem: SelectedItemDefault,
    onRenderSuggestion: SuggestionItemSmall
  }
}

export class ListPeoplePicker extends BasicPeoplePicker {
  static defaultProps = {
    onRenderItem: (props) => <SelectedItemWithMenu { ...props }/>,
    onRenderSuggestion: SuggestionItemNormal
  }

  protected _renderPicker(props: IBasePickerProps<IPersonaProps>): JSX.Element {
    return <MemberListBelow { ...props }/>
  }
}

