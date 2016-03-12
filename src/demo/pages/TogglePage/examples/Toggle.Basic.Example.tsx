import * as React from 'react';

import {
  Toggle
} from '../../../../components/index';

export interface IToggleBasicExampleState {
  isToggled: boolean;
}

export default class ToggleBasicExample extends React.Component<any, IToggleBasicExampleState> {
  constructor() {
    super();

    this._onToggleChanged = this._onToggleChanged.bind(this);

    this.state = {
      isToggled: true
    };
  }

  public render() {
    let { isToggled } = this.state;

    return (
      <Toggle
        isToggled={ this.state.isToggled }
        onChanged={ this._onToggleChanged }
        label='Indoor lighting'
        onText='On'
        offText='Off' />
    );
  }

  private _onToggleChanged(isToggled: boolean) {
    this.setState({
      isToggled: isToggled
    });
  }

}
