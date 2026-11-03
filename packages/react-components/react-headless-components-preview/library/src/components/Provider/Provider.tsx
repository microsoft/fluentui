'use client';

import { renderProvider } from './renderProvider';
import { useProvider } from './useProvider';
import { useProviderContextValues } from './useProviderContextValues';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Renders required context providers for Fluent Headless Components.
 */
export const Provider = /*#__PURE__*/ composeComponentWithoutRef(
  'Provider',
  useProvider,
  useProviderContextValues,
  renderProvider,
);
