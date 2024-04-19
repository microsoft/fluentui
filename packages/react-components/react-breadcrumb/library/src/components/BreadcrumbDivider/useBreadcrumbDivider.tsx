import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import { ChevronRightRegular, ChevronLeftRegular } from '@fluentui/react-icons';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render BreadcrumbDivider.
 *
 * The returned state can be modified with hooks such as useBreadcrumbDividerStyles_unstable,
 * before being passed to renderBreadcrumbDivider_unstable.
 *
 * @param props - props from this instance of BreadcrumbDivider
 * @param ref - reference to root HTMLElement of BreadcrumbDivider
 */
export const useBreadcrumbDivider_unstable = (
  props: BreadcrumbDividerProps,
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbDividerState => {
  const { size } = useBreadcrumbContext_unstable();
  const { dir } = useFluent();
  const icon = getDividerIcon(dir);

  return {
    components: {
      root: 'li',
    },
    root: slot.always(
      getIntrinsicElementProps('li', {
        ref,
        'aria-hidden': true,
        children: icon,
        ...props,
      }),
      { elementType: 'li' },
    ),
    size,
  };
};

/**
 * Get icon of the divider
 *
 * @param dir - RTL or LTR
 */
function getDividerIcon(dir: string) {
  return dir === 'rtl' ? <ChevronLeftRegular /> : <ChevronRightRegular />;
}
