import * as React from 'react';

// Arg! I can't get TypeScript to like this, until they support path mappings.
//import { Toggle } from 'office-ui-fabric-react';

import Toggle from '../../../components/toggle/Toggle';

export default class ToggleExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      isToggled: true
    };

    this._handleToggled = this._handleToggled.bind(this);
  }

  public render() {
    return (
      <div className='ToggleExample'>
      <h1>I'm a toggle</h1>

       <Toggle
            isToggled={ this.state.isToggled }
            onToggled={ this._handleToggled }
            label='Indoor lighting'
            onText='On'
            offText='Off' />
      </div>
    );
  }

  private _handleToggled(isToggled: boolean) {
    this.setState({
      isToggled: isToggled
    });
  }

}
