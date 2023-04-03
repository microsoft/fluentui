import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './BreadcrumbLink.types';
import { Link } from '@fluentui/react-link';
/**
 * Create the state required to render BreadcrumbLink.
 *
 * The returned state can be modified with hooks such as useBreadcrumbLinkStyles_unstable,
 * before being passed to renderBreadcrumbLink_unstable.
 *
 * @param props - props from this instance of BreadcrumbLink
 * @param ref - reference to root HTMLElement of BreadcrumbLink
 */
export const useBreadcrumbLink_unstable = (
  props: BreadcrumbLinkProps,
  ref: React.Ref<HTMLElement>,
): BreadcrumbLinkState => {
  const { disabled = false, icon, overflow = false, iconPosition = 'before', ...rest } = props;
  const iconShorthand = resolveShorthand(icon);

  return {
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    components: {
      root: Link,
      icon: 'span',
    },
    root: getNativeElementProps('a', {
      ref,
      ...rest,
    }),
    iconPosition,
    disabled,
    icon: iconShorthand,
    overflow,
  };
};
