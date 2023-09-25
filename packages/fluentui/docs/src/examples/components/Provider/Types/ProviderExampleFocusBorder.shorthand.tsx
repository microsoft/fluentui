import * as React from 'react';
import { Button, Provider } from '@fluentui/react-northstar';

const customTheme = {
  siteVariables: {
    borderWidth: '1px',
    borderRadius: '2px',
    // styles to override theme's styles
    focusBorderRadius: '4px',
    focusInnerBorderWidth: '0px',
    focusOuterBorderWidth: '2px',
    focusOuterBorderColor: 'black',
  },
};

const ProviderExampleFocusBorderShorthand = () => (
  <Provider theme={customTheme}>
    <div>
      <p>Focus indicator should be overridden as described in custom theme:</p>
      <Button content="Overridden focus styles" />
    </div>
  </Provider>
);

export default ProviderExampleFocusBorderShorthand;
