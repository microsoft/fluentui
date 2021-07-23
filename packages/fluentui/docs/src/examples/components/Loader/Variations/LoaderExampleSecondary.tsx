import { Loader, Flex, Provider } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleSecondary: React.FC = () => (
  <Provider>
    <Provider.Consumer
      render={theme => (
        <Flex
          style={{
            backgroundColor: theme.siteVariables.colorScheme.brand.background,
            padding: 8,
            width: 'fit-content',
          }}
        >
          <Loader secondary />
        </Flex>
      )}
    />
  </Provider>
);

export default LoaderExampleSecondary;
