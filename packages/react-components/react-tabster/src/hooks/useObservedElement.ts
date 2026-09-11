'use client';

import type { Types as TabsterTypes } from 'tabster';
import { tabster } from '../tabsterCompat';

import { useTabster } from './useTabster';
import { useTabsterAttributes } from './useTabsterAttributes';

const { getObservedElement } = tabster;

export function useObservedElement(name: string | string[]): TabsterTypes.TabsterDOMAttribute {
  useTabster(getObservedElement);

  return useTabsterAttributes({ observed: { names: Array.isArray(name) ? name : [name] } });
}
