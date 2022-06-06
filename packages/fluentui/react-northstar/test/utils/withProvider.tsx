import { Telemetry, Unstable_FluentContextProvider, ProviderContextPrepared } from '@fluentui/react-bindings';
import { Renderer, noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import { emptyTheme, ThemePrepared } from '@fluentui/styles';
import { mount, MountRendererProps, ComponentType } from 'enzyme';
import * as React from 'react';

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

  return <Unstable_FluentContextProvider value={value}>{children}</Unstable_FluentContextProvider>;
};

/**
 * Creates a dummy container to be passed as an `attachTo` option into enzyme's `mount` function.
 * Enables actual JSDOM introspection.
 * Make sure you call `removeTestContainer` at the end of your test to clean up after yourself.
 */
export function createTestContainer() {
  const testContainer = document.createElement('div');
  document.body.appendChild(testContainer);

  const removeTestContainer = () => {
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
  };

  return { testContainer, removeTestContainer };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mountWithProvider = <C extends React.Component, P = C['props'], S = C['state']>(
  node: React.ReactElement<P>,
  options?: MountRendererProps,
) => {
  return mount(node, {
    wrappingComponent: EmptyThemeProvider,
    ...options,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mountWithProviderAndGetComponent = <C extends React.Component, P = C['props'], S = C['state']>(
  Component: ComponentType<P>,
  elementToMount: React.ReactElement<P>,
  options?: MountRendererProps,
) => {
  return mountWithProvider(elementToMount, options).find(Component);
};
