'use client';

import type { Types as TabsterTypes } from 'tabster';
import * as tabsterModule from 'tabster';

import { useTabster } from './useTabster';
import { useTabsterAttributes } from './useTabsterAttributes';

const tabster = (tabsterModule as typeof tabsterModule & { default?: typeof tabsterModule }).default ?? tabsterModule;
const { getObservedElement } = tabster;

export function useObservedElement(name: string | string[]): TabsterTypes.TabsterDOMAttribute {
  useTabster(getObservedElement);

  return useTabsterAttributes({ observed: { names: Array.isArray(name) ? name : [name] } });
}
