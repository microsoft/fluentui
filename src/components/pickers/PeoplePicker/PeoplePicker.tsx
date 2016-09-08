import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { IBasePickerProps, IPickerItemProps } from '../BasePickerProps';
import { IPersonaProps } from '../../Persona';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { FocusZone } from '../../FocusZone';
import { SelectionZone, SelectionMode } from '../../../utilities/selection/index';
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

  public render() {
    let { value } = this.state;

    return (
      <div>
        <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
          <SelectionZone selection={ this._selection }
            selectionMode={SelectionMode.multiple}>
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


export class NormalPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: SelectedItemDefault,
    onRenderSuggestion: SuggestionItemNormal
  };
}

export class CompactPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: SelectedItemDefault,
    onRenderSuggestion: SuggestionItemSmall
  };
}

export class ListPeoplePicker extends MemberListBelow {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemWithMenu { ...props }/>,
    onRenderSuggestion: SuggestionItemNormal
  };
}

export class PeoplePicker extends React.Component<IPeoplePickerProps, {}> {

  public static defaultProps = {
    peoplePickerType: PeoplePickerType.normal
  };

  constructor(props: IPeoplePickerProps) {
    super(props);
  }

  public render() {
    let {
      onResolveSuggestions,
      onRenderSuggestion,
      onRenderItem,
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
    };

    switch (this.props.peoplePickerType) {
      case PeoplePickerType.normal:
        return (<NormalPeoplePicker { ...pickerProps }/>);
      case PeoplePickerType.list:
        return (<ListPeoplePicker { ...pickerProps }/>);
      case PeoplePickerType.compact:
        return (<CompactPeoplePicker { ...pickerProps }/>);
    }
  }
}

