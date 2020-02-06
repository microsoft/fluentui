import { emptyTheme, ThemeInput } from '@fluentui/styles'
import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'react-fela'

import { felaRenderer } from 'src/utils'
import { ProviderContextPrepared } from 'src/types'

export const EmptyThemeProvider: React.FunctionComponent = ({ children }) => {
  const theme: ProviderContextPrepared = {
    renderer: felaRenderer,
    target: document,
    _internal_resolvedComponentVariables: {},
    disableAnimations: false,
    rtl: false,
    theme: emptyTheme,
    telemetry: undefined,
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const mountWithProvider = (node, options?, theme?: ThemeInput) => {
  return mount(node, {
    wrappingComponent: EmptyThemeProvider,
    ...options,
  })
}

export const mountWithProviderAndGetComponent = (
  Component,
  elementToMount,
  options?: {},
  theme?: ThemeInput,
) => {
  return mountWithProvider(elementToMount, options, theme).find(Component)
}
