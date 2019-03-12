import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Dropdown, IDropdown } from 'office-ui-fabric-react/lib/Dropdown';
// import ThemingDesigner from './components/ThemingDesigner';
let _rootDiv: HTMLElement;
//private _basicDropdown = React.createRef<IDropdown>();

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  //ReactDOM.render(<h1>Hello, world!</h1>, _rootDiv);
  ReactDOM.render(
    <Fabric>
      <Dropdown
        placeholder="Select an Option"
        label="Basic uncontrolled example:"
        ariaLabel="Basic dropdown example"
        options={[{ key: 'light', text: 'Light theme' }, { key: 'dark', text: 'Dark theme' }]}
        //componentRef={this._basicDropdown}
      />
    </Fabric>,
    _rootDiv
  );
}

// Start the application.
start();
