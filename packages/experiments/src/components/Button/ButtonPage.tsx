import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';


import { DefaultButtonExample } from './DefaultButton/DefaultButton.Example';

export interface IButtonDemoPageState {
  areButtonsDisabled?: boolean;
  areButtonsChecked?: boolean;
}

export class ButtonPage extends React.Component<IComponentDemoPageProps, IButtonDemoPageState> {
  constructor() {
    super();
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  public render() {
    return (
      <ComponentPage
        title={ 'Button' }
        componentName='ButtonExample'
        exampleCards={
          <div>
            <Checkbox
              label='Disable buttons'
              checked={ this.state.areButtonsDisabled }
              onChange={ this._onDisabledChanged.bind(this) }
            />
            <Checkbox
              label='Mark as checked'
              checked={ this.state.areButtonsChecked }
              onChange={ this._onToggledChanged.bind(this) }
            />
            <ExampleCard title='Default Button'>
              <DefaultButtonExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
          </div>
        }

        overview={
          <div />

        }
        bestPractices={
          <div />
        }

        isHeaderVisible={ false }

      />
    );
  }
  private _onDisabledChanged(ev: React.MouseEvent<HTMLElement>, disabled: boolean) {
    this.setState({
      areButtonsDisabled: disabled
    });
  }

  private _onToggledChanged(ev: React.MouseEvent<HTMLElement>, toggled: boolean) {
    this.setState({
      areButtonsChecked: toggled
    });
  }
}
