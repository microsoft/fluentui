'use client';

import { renderProvider } from './renderProvider';
import { useProvider } from './useProvider';
import { useProviderContextValues } from './useProviderContextValues';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { ProviderProps } from './Provider.types';

/**
 * Renders required context providers for Fluent Headless Components.
 */
export const Provider: ComponentWithoutRef<ProviderProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Provider',
  useProvider,
  useProviderContextValues,
  renderProvider,
);
