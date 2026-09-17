import * as React from 'react';
import {
  FluentProvider,
  Link,
  Toast,
  ToastBody,
  ToastFooter,
  Toaster,
  ToastTitle,
  useToastController,
  webLightTheme,
} from '@fluentui/react-components';

import { INVERTED_CELLS, ToastVrScene } from './ToastVrScene';

const parts = {
  Toaster: Toaster as never,
  Toast: Toast as never,
  ToastTitle: ToastTitle as never,
  ToastBody: ToastBody as never,
  ToastFooter: ToastFooter as never,
  Link: Link as never,
  useToastController: useToastController as never,
};

export const ToastInvertedGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ToastVrScene {...parts} cells={INVERTED_CELLS} />
  </FluentProvider>
);
