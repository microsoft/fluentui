import * as React from 'react';
import {
  PeoplePicker,
  IPeoplePickerProps
} from '../../../../components/pickers/PeoplePicker/PeoplePicker2';
import { people } from './PeoplePickerExampleData';

export class PeoplePicker2BasicExample extends React.Component<{}, {}> {

  public render() {
    return (
      <PeoplePicker
        onResolveSuggestions={ this._onResolveSuggestions }
      />
    );
  }

  private _onResolveSuggestions(text, selectedItems) {
    return text ? people.filter(person => person.primaryText.toLowerCase().indexOf(text) === 0 && selectedItems.indexOf(person) === -1) : people;
  }
}
