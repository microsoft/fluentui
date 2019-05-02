import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
import { ThemingDesigner } from './components/ThemingDesigner';
import { Customizer } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';

initializeIcons();

let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  ReactDOM.render(
    <Fabric>
      <Customizer {...FluentCustomizations}>
        <ThemingDesigner />
      </Customizer>
    </Fabric>,
    _rootDiv
  );
}

// Start the application.
start();
