import * as React from 'react';

// Arg! I can't get TypeScript to like this, until they support path mappings.
//import { Toggle } from 'office-ui-fabric-react';

import Toggle from '../../../../components/Toggle/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class ToggleExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      isToggled: true
    };

    this._onToggled = this._onToggled.bind(this);
  }

  public render() {
    return (
      <div className='ToggleExample'>
        <h1 className='ms-font-xxl'>Toggle</h1>
        <div><Link target='_blank' text='Toggles' url='http://dev.office.com/fabric/components/Toggle' /> provide a ui indicator for progress.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Toggle'>
          <Toggle
              isToggled={ this.state.isToggled }
              onToggled={ this._onToggled }
              label='Indoor lighting'
              onText='On'
              offText='Off' />
        </ExampleCard>
      </div>
    );
  }

  private _onToggled(isToggled: boolean) {
    this.setState({
      isToggled: isToggled
    });
  }

}
