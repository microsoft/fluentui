import * as React from 'react';
import { Provider } from '@fluentui/react-northstar';

const customTheme = { siteVariables: { brand: 'cornflowerblue' } };

const ProviderExampleShorthand = () => (
  <Provider theme={customTheme}>
    <div>
      <p>
        Use the <code>Provider.Consumer</code> to access the <code>theme</code>:
      </p>

      <Provider.Consumer render={theme => <code>theme.siteVariables.brand = {theme.siteVariables.brand}</code>} />
    </div>
  </Provider>
);

export default ProviderExampleShorthand;
