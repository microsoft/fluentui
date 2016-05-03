import * as React from 'react';
import {
  ChoiceGroup
} from '../../../../components/index';

export default class ChoiceGroupBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this._onChanged = this._onChanged.bind(this);
  }

  public render() {
    return (
      <ChoiceGroup
        options={ [
          {
            key: 'A',
            text: 'Option A'
          },
          {
            key: 'B',
            text: 'Option B',
            isChecked: true
          },
          {
            key: 'C',
            text: 'Option C',
            isDisabled: true
          }
        ] }
        onChanged={ this._onChanged }
        label='Pick one'
      />
    );
  }

  private _onChanged() {
    console.log('The option has been changed.');
  }
}
