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

import { POSITION_CELLS, ToastVrScene } from './ToastVrScene';

const parts = {
  Toaster: Toaster as never,
  Toast: Toast as never,
  ToastTitle: ToastTitle as never,
  ToastBody: ToastBody as never,
  ToastFooter: ToastFooter as never,
  Link: Link as never,
  useToastController: useToastController as never,
};

export const ToastPositionsWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ToastVrScene {...parts} cells={POSITION_CELLS} />
  </FluentProvider>
);
