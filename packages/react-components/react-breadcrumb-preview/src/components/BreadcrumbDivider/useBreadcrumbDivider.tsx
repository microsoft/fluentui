import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import {
  ChevronRight20Regular,
  ChevronRight16Regular,
  ChevronRight12Regular,
  ChevronLeft20Regular,
  ChevronLeft16Regular,
  ChevronLeft12Regular,
} from '@fluentui/react-icons';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';
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
  const { size, dividerType } = useBreadcrumbContext_unstable();
  const { dir } = useFluent();
  const icon = getDividerIcon(size, dividerType, dir);

  return {
    components: {
      root: 'li',
    },
    root: slot.always(
      getNativeElementProps('li', {
        ref,
        'aria-hidden': true,
        children: icon,
        ...props,
      }),
      { elementType: 'li' },
    ),
  };
};

const dividerIcons = {
  rtl: {
    small: <ChevronLeft12Regular />,
    medium: <ChevronLeft16Regular />,
    large: <ChevronLeft20Regular />,
  },
  ltr: {
    small: <ChevronRight12Regular />,
    medium: <ChevronRight16Regular />,
    large: <ChevronRight20Regular />,
  },
};

/**
 * Get icon of the divider
 *
 * @param size - size of the Breadcrumb
 * @param dividerType - type of the divider, can be `slash` or `chevron`
 */
function getDividerIcon(
  size: BreadcrumbProps['size'] = 'medium',
  dividerType: BreadcrumbProps['dividerType'],
  dir: string,
) {
  const dividerIcon = dir === 'rtl' ? dividerIcons.rtl : dividerIcons.ltr;
  if (size === 'small') {
    if (dividerType === 'slash') {
      return dir === 'rtl' ? '\\' : '/';
    }
    return dividerIcon.small;
  }
  if (size === 'large') {
    return dividerIcon.large;
  }
  return dividerIcon.medium;
}
