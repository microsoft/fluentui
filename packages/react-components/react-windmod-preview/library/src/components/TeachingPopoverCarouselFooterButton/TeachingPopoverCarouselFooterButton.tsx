'use client';

import * as React from 'react';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';
import {
  useButton,
  useButtonContext,
  type ButtonProps as ButtonHeadlessProps,
} from '@fluentui/react-headless-components-preview/button';
import {
  renderTeachingPopoverCarouselFooterButton as renderTeachingPopoverCarouselFooterButtonHeadless,
  useTeachingPopoverCarouselFooterButton as useTeachingPopoverCarouselFooterButtonHeadless,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ButtonAppearance } from '../Button/Button.types';
import { usePopoverLook } from '../Popover/PopoverContext';
import type {
  PopoverAppearance,
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { useTeachingPopoverCarouselFooterButtonStyles } from './useTeachingPopoverCarouselFooterButtonStyles';

// Windmod re-spells this component's props and state over its own Button's (see the types file), so
// the two headless entry points are re-typed at the seam — the same aliasing the headless package
// applies to the reference's own exports.
const useTeachingPopoverCarouselFooterButtonBase = useTeachingPopoverCarouselFooterButtonHeadless as unknown as (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => { root: { onClick?: React.MouseEventHandler<HTMLButtonElement>; children?: React.ReactNode } };

const renderTeachingPopoverCarouselFooterButton = renderTeachingPopoverCarouselFooterButtonHeadless as unknown as (
  state: TeachingPopoverCarouselFooterButtonState,
) => JSXElement;

const navAppearance = (
  navType: TeachingPopoverCarouselFooterButtonProps['navType'],
  popoverAppearance: PopoverAppearance | undefined,
): ButtonAppearance => {
  if (navType === 'next') {
    return popoverAppearance === 'brand' ? 'secondary' : 'primary';
  }

  return popoverAppearance === 'brand' ? 'outline' : 'secondary';
};

/**
 * One of a carousel footer's two page-navigation buttons. Windmod
 * TeachingPopoverCarouselFooterButton: a windmod Button whose appearance is derived from the
 * navigation direction and the surface's own appearance, carrying the carousel's page-change
 * click and trailing-step text.
 */
export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  React.forwardRef((props, ref) => {
    const { appearance, shape = 'rounded', size = 'medium', ...rest } = mergeContextProps(useButtonContext(), props);
    const { appearance: popoverAppearance } = usePopoverLook();

    // The base hook owns the carousel wiring and nothing else: the page-change click and the
    // trailing-step altText swap. Both are fed back INTO the button hook, so the ARIA button layer
    // wraps the carousel handler instead of being discarded with the root that carries it, and the
    // stamps the Button stylesheet selects on survive.
    const base = useTeachingPopoverCarouselFooterButtonBase(rest, ref);
    // `navType` and `altText` are the carousel's own props, not the button's, and nothing downstream
    // filters them: the base hook passes its props through `getIntrinsicElementProps`, which drops
    // them, but that root is discarded here in favour of the button hook's, and the button hook
    // spreads what it is given. They are stripped at this seam so they cannot reach the element.
    const { navType, altText, ...buttonRest } = rest;
    // Button props are a distributive union over `as`, so a handler read off the resolved root
    // satisfies only one branch of it. The rendered element is the button branch either way.
    const buttonProps = {
      ...buttonRest,
      onClick: base.root.onClick,
      children: base.root.children,
    } as ButtonHeadlessProps;

    return renderTeachingPopoverCarouselFooterButton(
      useTeachingPopoverCarouselFooterButtonStyles({
        ...useButton(buttonProps, ref),
        navType,
        altText,
        appearance: appearance ?? navAppearance(navType, popoverAppearance),
        shape,
        size,
        popoverAppearance,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  }) as ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps>;

TeachingPopoverCarouselFooterButton.displayName = 'TeachingPopoverCarouselFooterButton';
