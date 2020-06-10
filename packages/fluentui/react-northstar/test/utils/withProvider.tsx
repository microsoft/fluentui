import { Telemetry } from '@fluentui/react-bindings';
import { emptyTheme, ThemePrepared, Renderer, noopRenderer } from '@fluentui/styles';
import { mount, MountRendererProps, ComponentType } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'react-fela';

import { ProviderContextPrepared } from 'src/types';

export const EmptyThemeProvider: React.FunctionComponent<{
  disableAnimations?: boolean;
  telemetry?: Telemetry;
  renderer?: Renderer;
  theme?: ThemePrepared;
  rtl?: boolean;
}> = ({ children, disableAnimations, renderer = noopRenderer, telemetry, theme = emptyTheme, rtl = false }) => {
  const value: ProviderContextPrepared = {
    renderer,
    target: document,
    disableAnimations,
    rtl,
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
