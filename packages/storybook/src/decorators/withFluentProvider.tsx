import { makeDecorator } from '@storybook/addons';
import { FluentProvider } from '@fluentui/react-provider';
import { Theme } from '@fluentui/theme';
import * as React from 'react';

import { useFluentTheme } from '../knobs/useFluentTheme';

const ProviderWrapper: React.FunctionComponent<{ theme?: Theme | undefined }> = props => {
  const { theme } = useFluentTheme();

  return <FluentProvider theme={theme}>{props.children}</FluentProvider>;
};

export const withFluentProvider = makeDecorator({
  name: 'withFluentProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    return <ProviderWrapper>{storyFn(context)}</ProviderWrapper>;
  },
});
