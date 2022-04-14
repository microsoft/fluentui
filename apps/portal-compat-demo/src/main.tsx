import {
  FluentProvider as V9Provider,
  teamsLightTheme as v9LightTheme,
  teamsHighContrastTheme as v9HCTheme,
} from '@fluentui/react-components';
import { PortalCompatProvider } from '@fluentui/react-portal-compat';
import React from 'react';
import ReactDOM from 'react-dom';

import { V0Example } from './V0Example';
import { V8Example } from './V8Example';

const App: React.FC = () => {
  const [isHC, setIsDark] = React.useState<boolean>(false);

  return (
    <>
      <div>
        <input
          id="theme-checkbox"
          checked={isHC}
          onChange={() => {
            setIsDark(a => !a);
          }}
          type="checkbox"
        />
        <label htmlFor="theme-checkbox">use HC</label>
      </div>

      <V9Provider theme={isHC ? v9HCTheme : v9LightTheme}>
        <PortalCompatProvider>
          <V0Example isHC={isHC} />
          <V8Example />
        </PortalCompatProvider>
      </V9Provider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
