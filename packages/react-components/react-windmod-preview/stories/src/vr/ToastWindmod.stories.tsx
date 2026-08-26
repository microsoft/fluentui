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
} from '@fluentui/react-windmod-preview';

import { ANATOMY_CELLS, ToastVrScene } from './ToastVrScene';

const parts = {
  Toaster: Toaster as never,
  Toast: Toast as never,
  ToastTitle: ToastTitle as never,
  ToastBody: ToastBody as never,
  ToastFooter: ToastFooter as never,
  Link: Link as never,
  useToastController: useToastController as never,
};

export const ToastWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ToastVrScene {...parts} cells={ANATOMY_CELLS} />
  </FluentProvider>
);
