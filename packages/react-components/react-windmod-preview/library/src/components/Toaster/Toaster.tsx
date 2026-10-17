'use client';

import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { renderToaster, useToaster } from '@fluentui/react-headless-components-preview/toast';

import type { ToasterProps } from './Toaster.types';
import { useToasterStyles } from './useToasterStyles';

/**
 * A Toaster renders the six position containers a dispatched toast lands in, each promoted to the
 * browser top layer. Windmod Toaster: the headless toaster decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules). It renders no element of its own — the containers carry
 * the whole look.
 */
export const Toaster: React.FC<ToasterProps> = (props: ToasterProps): JSXElement => {
  const state = useToaster(props);
  const styled = useToasterStyles(state);

  return renderToaster(styled);
};

Toaster.displayName = 'Toaster';
