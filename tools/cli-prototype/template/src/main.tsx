import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { canUseDOM } from '@fluentui/react-utilities';

import { App } from './App';

if (canUseDOM()) {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}
