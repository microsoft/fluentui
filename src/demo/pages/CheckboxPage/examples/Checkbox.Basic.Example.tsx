import * as React from 'react';
import {
  Checkbox
  } from '../../../../index';

export class CheckboxBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render() {
    return (
      <div>
        <Checkbox label='Unselected item' onChange={ this._onCheckboxChange } />
        <Checkbox label='Selected item' onChange={ this._onCheckboxChange } checked={ true } />
        <Checkbox label='Disabled item' disabled={ true } />
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent, isChecked: boolean) {
    console.log(`The option has been changed to ${ isChecked }.`);
  }

}
