import * as React from 'react';
import {
  ChoiceField
} from '../../../../index';
import { assign } from '../../../../utilities/object';

export class ChoiceFieldBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      controlled1: false,
      controlled2: true
    };

    this._handleControlledChoiceFieldChanged = this._handleControlledChoiceFieldChanged.bind(this);
    this._handleUncontrolledChoiceFieldChanged = this._handleUncontrolledChoiceFieldChanged.bind(this);
  }

  public render() {
    return (
      <div>
        <ChoiceField label='Uncontrolled unchecked'
          ref='uncontrolled1'
          name='uncontrolled1'
          defaultChecked={ false }
          onChange={ this._handleUncontrolledChoiceFieldChanged } />
        <ChoiceField label='Uncontrolled checked'
          ref='uncontrolled2'
          name='uncontrolled2'
          defaultChecked={ true }
          onChange={ this._handleUncontrolledChoiceFieldChanged } />
        <ChoiceField label='Controlled unchecked'
          name='controlled1'
          checked={ this.state.controlled1 }
          onChange={ this._handleControlledChoiceFieldChanged } />
        <ChoiceField label='Controlled checked'
          name='controlled2'
          checked={ this.state.controlled2 }
          onChange={ this._handleControlledChoiceFieldChanged } />
      </div>
    );
  }

  private _handleControlledChoiceFieldChanged(evt: React.FormEvent, isChecked: boolean) {
    const target = evt.target as HTMLInputElement;

    this.setState(assign({}, this.state, {
      [target.name]: isChecked // or target.checked
    }));

    console.log('Controlled ChoiceField changed', this.state);
  }

  private _handleUncontrolledChoiceFieldChanged(evt: React.FormEvent) {
    const target = evt.target as HTMLInputElement;
    const cb = this.refs[target.name] as ChoiceField;

    console.log('Uncontrolled ChoiceField changed', {
      eventChecked: target.checked,
      ChoiceFieldChecked: cb.checked
    });
  }
}
