import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { useToaster_unstable } from './useToaster';
import { renderToaster_unstable } from './renderToaster';
import { useToasterStyles_unstable } from './useToasterStyles.styles';
import type { ToasterProps } from './Toaster.types';

/**
 * Toaster component - renders a collection of toasts dispatched imperatively
 */
export const Toaster: React.FC<ToasterProps> = props => {
  const state = useToaster_unstable(props);

  useToasterStyles_unstable(state);
  useCustomStyleHook_unstable('useToasterStyles_unstable')(state);
  return renderToaster_unstable(state);
};

Toaster.displayName = 'Toaster';
