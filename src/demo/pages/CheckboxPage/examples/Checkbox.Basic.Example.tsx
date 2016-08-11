import * as React from 'react';
import {
  Checkbox
  } from '../../../../index';

export interface CheckboxBasicExample {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      isChecked: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render() {
    let { isChecked } = this.state;

    return (
      <div>
        <Checkbox
          label='Uncontrolled checkbox'
          onChange={ this._onCheckboxChange } />

        <Checkbox
          label='Uncontrolled checkbox with defaultChecked true'
          defaultChecked={ true }
          onChange={ this._onCheckboxChange } />

        <Checkbox
          label='Disabled uncontrolled checkbox with defaultChecked true'
          disabled={ true }
          defaultChecked={ true }
          onChange={ this._onCheckboxChange } />

        <Checkbox
          label='Controlled checkbox'
          checked={ isChecked }
          onChange={ (ev, checked) => this.setState({ isChecked: checked }) } />
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent, isChecked: boolean) {
    console.log(`The option has been changed to ${ isChecked }.`);
  }

}
