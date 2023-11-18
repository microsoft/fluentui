import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/react';
import { StressApp } from '../../../components/v8/StressApp';

initializeIcons();

ReactDOM.render(<StressApp />, document.getElementById('root'));
