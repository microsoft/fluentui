import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { App } from './App';
import { IRouteProps, Router, Route } from '@uifabric/example-app-base';
// import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { IRouteProps } from 'office-ui-fabric-react/lib/utilities/router/Route';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

const div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<Router>{_getRoutes()}</Router>, div);

// require('es6-promise/auto');

// setBaseUrl('./dist/');

// let rootElement: HTMLElement | null;

// function _onLoad(): void {
//   rootElement = rootElement || document.getElementById('content');

//   ReactDOM.render(
//     <Fabric>
//       {/* <Router>{_getRoutes()}</Router> */}
//     </Fabric>,
//     rootElement
//   );
// }

function _getRoutes(): JSX.Element[] {
  return require('./scenarios/scenarioList')
    .map(
      (scenario: string): IRouteProps => {
        return {
          component: require(`./scenarios/${scenario}`).default,
          // component: 'div',
          // children: (<div>
          //   {require(`./scenarios/${scenario}`).default}
          // </div>),
          key: scenario,
          path: `#/${scenario}`
        };
      }
    )
    .map((scenario: IRouteProps) => <Route key={scenario.key} {...scenario} />);
}

// function _onUnload(): void {
//   if (rootElement) {
//     ReactDOM.unmountComponentAtNode(rootElement);
//   }
// }

// const isReady = document.readyState === 'interactive' || document.readyState === 'complete';

// if (isReady) {
//   _onLoad();
// } else {
//   window.onload = _onLoad;
// }

// window.onunload = _onUnload;
