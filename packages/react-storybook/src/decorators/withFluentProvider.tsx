import { makeDecorator } from '@storybook/addons';
import { FluentProvider } from '@fluentui/react-provider';
import * as React from 'react';

import { useFluentTheme } from '../knobs/useFluentTheme';
import { useTextDirection } from '../knobs/useTextDirection';

const ProviderWrapper: React.FunctionComponent = props => {
  const { theme } = useFluentTheme();
  const { direction } = useTextDirection();

  return (
    <FluentProvider theme={theme} dir={direction}>
      {props.children}
    </FluentProvider>
  );
};

export const withFluentProvider = makeDecorator({
  name: 'withFluentProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    return <ProviderWrapper> {storyFn(context)} </ProviderWrapper>;
  },
});
