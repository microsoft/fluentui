import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IRouteProps } from 'office-ui-fabric-react/lib/utilities/router/Route';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as qs from 'querystring';

const scenarios = require('./scenarios/scenarioList');

initializeIcons();

const div = document.createElement('div');
document.body.appendChild(div);

const defaultScenarioName = Object.keys(scenarios)[0];
const DefaultScenarioComponent = scenarios[Object.keys(scenarios)[0]];
const defaultIterations = 10;

const queryParams = qs.parse(window.location.search.substring(1));
const iterations = queryParams.iterations ? parseInt(queryParams.iterations as string, 10) : defaultIterations;
const scenario = queryParams.scenario ? (queryParams.scenario as string) : defaultScenarioName;

ReactDOM.render(<>{Array(iterations).fill(React.createElement(scenarios[scenario]))}</>, div);
