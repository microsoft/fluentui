'use client';

import * as React from 'react';
import {
  TABSTER_ATTRIBUTE_NAME,
  type TabsterDOMAttribute,
  type NavConfig,
  serializeNavConfig,
} from '../focus-navigation/types';
import { useTabster } from './useTabster';

/**
 * Serializes a NavConfig into a `data-tabster` attribute object and ensures
 * the NavigationManager is initialised for the current document.
 *
 * @internal
 */
export const useTabsterAttributes = (config: NavConfig): TabsterDOMAttribute => {
  // Ensures the NavigationManager is alive for this document
  useTabster();

  const strAttr = serializeNavConfig(config);

  return React.useMemo(() => ({ [TABSTER_ATTRIBUTE_NAME]: strAttr }), [strAttr]);
};
