import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.Props';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { IPersonaProps } from '../../Persona/Persona.Props';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import { FocusZone } from '../../FocusZone';
import { SelectionZone, SelectionMode } from '../../../utilities/selection/index';
import { SelectedItemWithMenu } from './PeoplePickerItems/SelectedItemWithMenu';
import './PeoplePicker.scss';

export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}

export class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}

export class MemberListPeoplePicker extends BasePeoplePicker {

  public render() {
    let { displayValue } = this.state;

    return (
      <div>
        <div ref={ this._resolveRef('_root') } className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
          <SelectionZone selection={ this._selection }
            selectionMode={SelectionMode.multiple}>
            <div className='ms-BasePicker-text'>
              <input ref={ this._resolveRef('_input') }
                onFocus={ this._onInputFocus }
                onChange={ this._onInputChange }
                value={ displayValue }
                className='ms-BasePicker-input'
                />
            </div>
          </SelectionZone>
        </div>
        { this._renderSuggestions() }
        <FocusZone ref={ this._resolveRef('_focusZone') }>
          { this._renderItems() }
        </FocusZone>

      </div>
    );
  }

  protected _onBackspace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this._input) {
      if (value && this._input.selectionStart !== this._input.selectionEnd) {
        this._updateValue(value.substring(0, this._input.selectionStart));
        // Since this effectively deletes a letter from the string we need to preventDefault so that
        // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
        // it can trigger the onChange event again which can have unintended consequences.
        ev.preventDefault();
      }
    }
  }
}

/**
 * Standard People Picker.
 */
export class NormalPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props}/>,
    onRenderSuggestionsItem: (props) => <SuggestionItemNormal { ...props }/>
  };
}

/**
* Compact layout. It uses small personas when displaying search results.
*/
export class CompactPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemDefault {...props}/>,
    onRenderSuggestionsItem: (props) => <SuggestionItemSmall { ...props }/>
  };
}

/**
 * MemberList layout. The selected people show up below the search box.
 */
export class ListPeoplePicker extends MemberListPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props) => <SelectedItemWithMenu { ...props }/>,
    onRenderSuggestionsItem: (props) => <SuggestionItemNormal { ...props }/>
  };
}
