import { Telemetry } from '@fluentui/react-bindings';
import { emptyTheme } from '@fluentui/styles';
import { mount, MountRendererProps, ComponentType } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'react-fela';

import { felaRenderer } from 'src/utils';
import { ProviderContextPrepared } from 'src/types';

export const EmptyThemeProvider: React.FunctionComponent<{ telemetry?: Telemetry }> = ({ children, telemetry }) => {
  const theme: ProviderContextPrepared = {
    renderer: felaRenderer,
    target: document,
    disableAnimations: false,
    rtl: false,
    theme: emptyTheme,
    telemetry,
    performance: {} as any,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const mountWithProvider = <C extends React.Component, P = C['props'], S = C['state']>(
  node: React.ReactElement<P>,
  options?: MountRendererProps,
) => {
  return mount(node, {
    wrappingComponent: EmptyThemeProvider,
    ...options,
  });
};

export const mountWithProviderAndGetComponent = <C extends React.Component, P = C['props'], S = C['state']>(
  Component: ComponentType<P>,
  elementToMount: React.ReactElement<P>,
  options?: MountRendererProps,
) => {
  return mountWithProvider(elementToMount, options).find(Component);
};
