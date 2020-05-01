import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/App';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

const div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<App />, div);
