import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { BreadcrumbLinkProps, BreadcrumbLinkState } from './BreadcrumbLink.types';
import { useLink_unstable } from '@fluentui/react-link';
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
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): BreadcrumbLinkState => {
  const { appearance, size } = useBreadcrumbContext_unstable();
  const { current = false, disabled = false, icon, overflow = false } = props;

  const link = useLink_unstable(props, ref);

  const linkAppearance = props.appearance || appearance;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    components: {
      root: link.components.root,
      icon: 'span',
    },

    root: slot.always(link.root, {
      defaultProps: {
        'aria-current': current ? props['aria-current'] ?? 'page' : undefined,
      },
      elementType: link.components.root,
    }),

    appearance: linkAppearance === 'subtle' ? 'subtle' : 'default',
    current,
    disabled,
    icon: iconShorthand,
    overflow,
    size: props.size || size,
  };
};
