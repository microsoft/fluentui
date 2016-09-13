import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.Props';
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

export interface IPeoplePickerProps extends IBasePickerProps {
}

export class BasePeoplePicker extends BasePicker<IPeoplePickerProps> {
}

export class MemberListBelow extends BasePeoplePicker {

  public render() {
    let { displayValue } = this.state;

    return (
      <div>
        <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
          <SelectionZone selection={ this._selection }
            selectionMode={SelectionMode.multiple}>
            <div className='ms-BasePicker-text'>
              <input ref='input'
                onFocus={ this._onInputFocus }
                onChange={ this._onInputChange }
                value={ displayValue }
                className='ms-BasePicker-input'
                />
            </div>
          </SelectionZone>
        </div>
        { this.renderSuggestions() }
        <FocusZone ref='focusZone'>
          { this.renderItems() }
        </FocusZone>

      </div>
    );
  }

  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.refs.input) {
      if (value && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          displayValue: value.substring(0, this.refs.input.selectionStart)
        });
      }
    }
  }
}

export class NormalPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props}/>,
    onRenderSuggestion: (props) => <SuggestionItemNormal { ...props }/>
  };
}

export class CompactPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props}/>,
    onRenderSuggestion: (props) => <SuggestionItemSmall { ...props }/>
  };
}

export class ListPeoplePicker extends MemberListBelow {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemWithMenu { ...props }/>,
    onRenderSuggestion: (props) => <SuggestionItemNormal { ...props }/>
  };
}
