import * as React from 'react';
import { DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { keytipMap } from './KeytipSetup';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IKeytipsButtonExampleState {
  btnDisabled: boolean;
}

export class KeytipsButtonExample extends React.Component<{}, IKeytipsButtonExampleState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      btnDisabled: false
    };
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render() {
    return (
      <div>
        <p>
          Keytips on the same level starting with the same characters will get filtered out as you hit those keys
        </p>
        <DefaultButton
          keytipProps={ keytipMap.Button }
          text='Button'
          onClick={ () => { console.log('Button'); } }
        />
        <CompoundButton
          keytipProps={ keytipMap.CompoundButton }
          text='Compound Button'
          secondaryText={ 'With a Keytip' }
          onClick={ () => { console.log('Compound Button'); } }
        />
        <DefaultButton
          keytipProps={ keytipMap.ButtonWithMenu }
          text='Button with Menu'
          onClick={ () => { console.log('Button with Menu'); } }
          menuProps={ {
            items: [
              {
                key: 'buttonMenuItem1',
                name: 'Menu Item 1',
                keytipProps: keytipMap.ButtonMenuItem1
              },
              {
                key: 'buttonMenuItem2',
                name: 'Menu Item 2',
                keytipProps: keytipMap.ButtonMenuItem2
              }
            ]
          } }
        />
        <DefaultButton
          keytipProps={ keytipMap.SplitButton }
          text='Split Button'
          split={ true }
          onClick={ () => { console.log('Split Button'); } }
          menuProps={ {
            items: [
              {
                key: 'splitButtonMenuButton1',
                name: 'Split Button Menu Item 1',
                keytipProps: keytipMap.SplitButtonMenuItem1
              },
              {
                key: 'splitButtonMenuButton2',
                name: 'Split Button Menu Item 2',
                keytipProps: keytipMap.SplitButtonMenuItem2
              }
            ]
          } }
        />
        <DefaultButton
          text='I do not have a keytip'
        />
        <p>A keytip can have an 'offset' prop which will position the keytip starting from the top-left corner of the element</p>
        <DefaultButton
          keytipProps={ keytipMap.ButtonOffset }
          text='Button keytip offset 10x10'
          onClick={ () => { console.log('Button'); } }
        />
        <p>A keytip will become disabled when its corresponding component becomes disabled. A disabled keytip will be visible but cannot be triggered</p>
        <Toggle
          onText={ 'Enabled' }
          offText={ 'Disabled' }
          defaultChecked={ !this.state.btnDisabled }
          onChanged={ this._toggleDisabled }
        />
        <DefaultButton
          keytipProps={ keytipMap.DisabledButton }
          disabled={ this.state.btnDisabled }
          text={ (this.state.btnDisabled ? 'Disabled' : 'Enabled') + ' Button' }
          onClick={ () => { console.log('Disabled Button'); } }
        />
      </div>
    );
  }

  private _toggleDisabled = (checked: boolean) => {
    this.setState({ btnDisabled: !checked });
  }
}