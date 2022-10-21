import { Loader, Flex, Provider } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleSecondary: React.FC = () => {
  return (
    <Provider.Consumer
      render={theme => {
        const themeBackgroundColor = theme.siteVariables.colorScheme.brand.background;
        const siteVariablesColors = theme.siteVariables.colors;
        return (
          <Flex
            style={{
              backgroundColor:
                themeBackgroundColor !== siteVariablesColors.white ? themeBackgroundColor : siteVariablesColors.black,
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
