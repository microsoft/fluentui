'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { BreadcrumbBaseProps, BreadcrumbBaseState, BreadcrumbProps, BreadcrumbState } from './Breadcrumb.types';
import { TabsterDOMAttribute, useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render Breadcrumb.
 *
 * The returned state can be modified with hooks such as useBreadcrumbStyles_unstable,
 * before being passed to renderBreadcrumb_unstable.
 *
 * @param props - props from this instance of Breadcrumb
 * @param ref - reference to root HTMLElement of Breadcrumb
 */
export const useBreadcrumb_unstable = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const { focusMode = 'tab', size = 'medium', ...breadcrumbProps } = props;
  const state = useBreadcrumbBase_unstable(breadcrumbProps, ref);
  const focusAttributes = useBreadcrumbA11yBehavior_unstable({ focusMode });

  return {
    ...state,
    root: {
      ...focusAttributes,
      ...state.root,
    },
    size,
  };
};

/**
 * Base hook for Breadcrumb component, which manages state related to slots structure, ARIA attributes,
 * and keyboard navigation without design props.
 *
 * @param props - props from this instance of Breadcrumb
 * @param ref - reference to root HTMLElement of Breadcrumb
 */
export const useBreadcrumbBase_unstable = (
  props: BreadcrumbBaseProps,
  ref: React.Ref<HTMLElement>,
): BreadcrumbBaseState => {
  const { focusMode = 'tab', list, ...rest } = props;

  return {
    components: {
      root: 'nav',
      list: 'ol',
    },
    root: slot.always(
      getIntrinsicElementProps('nav', {
        ref,
        'aria-label': props['aria-label'] ?? 'breadcrumb',
        ...rest,
      }),
      { elementType: 'nav' },
    ),
    list: slot.optional(list, { renderByDefault: true, defaultProps: { role: 'list' }, elementType: 'ol' }),
  };
};

/**
 * Hook to get accessibility attributes for Breadcrumb component, such as roving tab index.
 * Based on Tabster's useArrowNavigationGroup.
 *
 * @param focusMode - whether the Breadcrumb uses arrow key navigation or tab key navigation
 * @returns Tabster DOM attributes
 */
export const useBreadcrumbA11yBehavior_unstable = ({
  focusMode,
}: Pick<BreadcrumbBaseProps, 'focusMode'>): Partial<TabsterDOMAttribute> => {
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'horizontal',
    memorizeCurrent: true,
  });

  return focusMode === 'arrow' ? focusAttributes : {};
};
