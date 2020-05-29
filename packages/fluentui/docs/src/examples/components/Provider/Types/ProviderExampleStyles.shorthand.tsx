import * as React from 'react';
import { mergeThemes, Provider, teamsDarkTheme } from '@fluentui/react-northstar';

const ProviderExampleShorthand = () => (
  <Provider
    variables={{ background: 'red' }}
    design={{ padding: '20px' }}
    styles={{ borderBottom: '3px solid blue' }}
    theme={mergeThemes(teamsDarkTheme, {
      siteVariables: {
        bodyBackground: 'salmon',
      },
      componentVariables: {
        Provider: {
          color: 'yellow',
        },
      },
      componentStyles: {
        Provider: {
          root: {
            borderTop: '3px solid green',
          },
        },
      },
    })}
  >
    <p>with custom overrides</p>
  </Provider>
);

export default ProviderExampleShorthand;
