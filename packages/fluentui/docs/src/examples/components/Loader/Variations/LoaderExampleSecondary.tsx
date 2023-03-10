import { Loader, Flex, Provider } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleSecondary: React.FC = () => {
  return (
    <Provider.Consumer
      render={theme => {
        return (
          <Flex
            style={{
              backgroundColor: theme.siteVariables.colorScheme.brand.backgroundActive,
              padding: 8,
              width: 'fit-content',
            }}
          >
            <Loader secondary />
          </Flex>
        );
      }}
    />
  );
};

export default LoaderExampleSecondary;
