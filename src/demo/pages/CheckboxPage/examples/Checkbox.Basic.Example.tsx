import * as React from 'react';
import {
  Checkbox
  } from '../../../../index';

export class CheckboxBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this._onToggleChanged = this._onToggleChanged.bind(this);
  }

  public render() {
    return (
      <div>
        <Checkbox text='Unselected item' onChanged={ this._onToggleChanged } />
        <Checkbox text='Selected item' onChanged={ this._onToggleChanged } isChecked={ true } />
        <Checkbox text='Disabled selected item' isChecked={ true } isEnabled={ false } />
        <Checkbox text='Disabled item' isEnabled={ false } />
      </div>
    );
  }

  private _onToggleChanged(isChecked: boolean) {
    console.log(`The option has been changed to ${ isChecked }.`);
  }

}
