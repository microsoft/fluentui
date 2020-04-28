import { Renderer, Telemetry } from '@fluentui/react-bindings';
import { emptyTheme, ThemePrepared } from '@fluentui/styles';
import { mount, MountRendererProps, ComponentType } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'react-fela';

import { felaRenderer } from 'src/utils';
import { ProviderContextPrepared } from 'src/types';

export const EmptyThemeProvider: React.FunctionComponent<{
  telemetry?: Telemetry;
  renderer?: Renderer;
  theme?: ThemePrepared;
}> = ({ children, renderer = felaRenderer, telemetry, theme = emptyTheme }) => {
  const value: ProviderContextPrepared = {
    renderer,
    target: document,
    disableAnimations: false,
    rtl: false,
    theme,
    telemetry,
    performance: {} as any,
  };

  return <ThemeProvider theme={value}>{children}</ThemeProvider>;
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
