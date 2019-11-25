import * as React from 'react';
import { DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';

export interface IKeytipsButtonExampleState {
  btnDisabled: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 20 };
const marginBottom = { root: { marginBottom: 28 } };

export class KeytipsButtonExample extends React.Component<{}, IKeytipsButtonExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      btnDisabled: false
    };
  }

  /* tslint:disable:jsx-no-lambda */
  public render() {
    return (
      <div>
        <p>When multiple Keytips start with the same character, typing that character will filter the visible keytips.</p>
        <Stack horizontal tokens={stackTokens}>
          <DefaultButton
            keytipProps={keytipMap.Button}
            text="Button"
            onClick={() => {
              console.log('Button');
            }}
          />
          <CompoundButton
            styles={marginBottom}
            keytipProps={keytipMap.CompoundButton}
            text="Compound Button"
            secondaryText={'With a Keytip'}
            onClick={() => {
              console.log('Compound Button');
            }}
          />
          <DefaultButton
            keytipProps={keytipMap.ButtonWithMenu}
            text="Button with Menu"
            onClick={() => {
              console.log('Button with Menu');
            }}
            menuProps={{
              items: [
                {
                  key: 'buttonMenuItem1',
                  text: 'Menu Item 1',
                  keytipProps: keytipMap.ButtonMenuItem1
                },
                {
                  key: 'buttonMenuItem2',
                  text: 'Menu Item 2',
                  keytipProps: keytipMap.ButtonMenuItem2
                }
              ]
            }}
          />
          <DefaultButton
            styles={{ splitButtonContainer: { height: 32 } }}
            keytipProps={keytipMap.SplitButton}
            text="Split Button"
            split={true}
            onClick={() => {
              console.log('Split Button');
            }}
            menuProps={{
              items: [
                {
                  key: 'splitButtonMenuButton1',
                  text: 'Split Button Menu Item 1',
                  keytipProps: keytipMap.SplitButtonMenuItem1
                },
                {
                  key: 'splitButtonMenuButton2',
                  text: 'Split Button Menu Item 2',
                  keytipProps: keytipMap.SplitButtonMenuItem2
                }
              ]
            }}
          />
          <DefaultButton text="I do not have a keytip" />
        </Stack>

        <p>The 'offset' prop can be used to position the keytip a set distance from the top-left corner of the element.</p>
        <DefaultButton
          styles={marginBottom}
          keytipProps={keytipMap.ButtonOffset}
          text="Button keytip offset 10x10"
          onClick={() => {
            console.log('Button');
          }}
        />

        <p>When a Keytip's corresponding component is disabled, the keytip still appears but cannot be triggered.</p>
        <Toggle onText={'Enabled'} offText={'Disabled'} defaultChecked={!this.state.btnDisabled} onChange={this._toggleDisabled} />
        <DefaultButton
          keytipProps={keytipMap.DisabledButton}
          disabled={this.state.btnDisabled}
          text={(this.state.btnDisabled ? 'Disabled' : 'Enabled') + ' Button'}
          onClick={() => {
            console.log('Disabled Button');
          }}
        />
      </div>
    );
  }

  private _toggleDisabled = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ btnDisabled: !checked });
  };
}
