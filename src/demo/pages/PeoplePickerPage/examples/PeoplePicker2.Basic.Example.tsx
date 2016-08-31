import * as React from 'react';
import {
  PeoplePicker,
  IPeoplePickerProps
} from '../../../../components/pickers/PeoplePicker/PeoplePicker';
import { people } from './PeoplePickerExampleData';

export class PeoplePicker2BasicExample extends React.Component<{}, {}> {

  public render() {
    return (
      <PeoplePicker
        onResolveSuggestions={ (text:string) => this._onResolveSuggestions(text, 2) }
        onGetMoreResults={ this._onResolveSuggestions }
      />
    );
  }

  private _onResolveSuggestions(text: string, limit: number = 100) {
    return text ? people.filter(person => person.primaryText.toLowerCase().indexOf(text) === 0).slice(0, limit) : [];
  }
}
