import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './BreadcrumbLink.types';
import { Link } from '@fluentui/react-link';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
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
  const { appearance, iconPosition, size } = useBreadcrumbContext_unstable();
  const { current = false, disabled = false, icon, overflow = false, ...rest } = props;

  const linkAppearance = props.appearance || appearance;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  return {
    components: { root: Link, icon: 'span' },
    root: slot.always(
      getNativeElementProps('a', {
        'aria-current': current ? props['aria-current'] ?? 'page' : undefined,
        ref,
        ...rest,
      }),
      { elementType: Link },
    ),
    appearance: linkAppearance === 'subtle' ? 'subtle' : 'default',
    current,
    disabled,
    icon: iconShorthand,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    iconPosition: props.iconPosition || iconPosition,
    overflow,
    size: props.size || size,
  };
};
