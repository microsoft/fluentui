'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { ToasterProps } from './Toaster.types';
import { renderToaster } from './renderToaster';
import { useToaster } from './useToaster';
import { useToasterStyles } from './useToasterStyles.styles';

/** Renders toasts dispatched through a toast controller. */
export const Toaster = (props: ToasterProps): JSXElement => {
  const state = useToaster(props);
  useToasterStyles(state);
  return renderToaster(state);
};

Toaster.displayName = 'Toaster';
