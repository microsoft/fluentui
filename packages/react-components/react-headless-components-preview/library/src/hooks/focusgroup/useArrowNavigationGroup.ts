'use client';

import * as React from 'react';

/**
 * `focusgroup` behavior tokens. The behavior also implies the minimum ARIA role of the owner and its items
 * when they don't declare one, e.g. `tablist` / `tab`.
 */
export type FocusgroupBehavior = 'toolbar' | 'tablist' | 'radiogroup' | 'listbox' | 'menu' | 'menubar';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically, horizontally or in both directions.
   * @default vertical
   */
  axis?: 'vertical' | 'horizontal' | 'both';
  /**
   * Focus will cycle to the first/last elements of the group without stopping.
   * @default false
   */
  circular?: boolean;
  /**
   * The last focused element in the group is remembered and focused when tabbing back into the group.
   * When `false`, Tab enters the group on the element marked with `focusgroupstart`, or the first item.
   * @default true
   */
  memorizeCurrent?: boolean;
  /**
   * The `focusgroup` behavior token.
   * @default toolbar
   */
  behavior?: FocusgroupBehavior;
}

/**
 * A `focusgroup` attribute value, as typed by the repository's `focusgroup` typings.
 */
export type FocusgroupAttribute = NonNullable<React.HTMLAttributes<HTMLElement>['focusgroup']>;

export type ArrowNavigationGroupAttributes = {
  focusgroup: FocusgroupAttribute;
};

// Behaviors that wrap unless told otherwise; the others need an explicit "wrap" to cycle.
const WRAPPING_BEHAVIORS: FocusgroupBehavior[] = ['tablist', 'radiogroup', 'menu', 'menubar'];

// Omitting both axis tokens falls back to the behavior's default axis, so "both" lists them explicitly.
const axisToken: Record<NonNullable<UseArrowNavigationGroupOptions['axis']>, string> = {
  vertical: 'block',
  horizontal: 'inline',
  both: 'inline block',
};

/**
 * Builds the `focusgroup` attribute value for the given options.
 */
export const getArrowNavigationGroupValue = (options: UseArrowNavigationGroupOptions = {}): FocusgroupAttribute => {
  const { axis = 'vertical', circular = false, memorizeCurrent = true, behavior = 'toolbar' } = options;
  const wrap = circular ? 'wrap' : WRAPPING_BEHAVIORS.includes(behavior) ? 'nowrap' : undefined;

  return [behavior, axisToken[axis], wrap, memorizeCurrent ? undefined : 'nomemory']
    .filter(Boolean)
    .join(' ') as FocusgroupAttribute;
};

/**
 * Returns the DOM attributes that enable arrow key navigation between the focusable descendants of an element,
 * using the HTML `focusgroup` attribute. Only one item of the group is in the Tab order.
 *
 * Browsers without native `focusgroup` support need `@microsoft/focusgroup-polyfill` installed by the application.
 *
 * To make a specific item the group's entry point, set the `focusgroupstart` attribute on it.
 *
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (
  options: UseArrowNavigationGroupOptions = {},
): ArrowNavigationGroupAttributes => {
  const { axis, circular, memorizeCurrent, behavior } = options;
  const focusgroup = getArrowNavigationGroupValue({ axis, circular, memorizeCurrent, behavior });

  return React.useMemo(() => ({ focusgroup }), [focusgroup]);
};

/**
 * Returns the DOM attributes that opt an element and its subtree out of any ancestor arrow navigation group.
 */
export const useUncontrolledFocus = (): ArrowNavigationGroupAttributes => UNCONTROLLED_FOCUS_ATTRIBUTES;

const UNCONTROLLED_FOCUS_ATTRIBUTES: ArrowNavigationGroupAttributes = { focusgroup: 'none' };
