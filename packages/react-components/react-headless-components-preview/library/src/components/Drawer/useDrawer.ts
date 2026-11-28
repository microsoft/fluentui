import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { InlineDrawer, type InlineDrawerProps } from './InlineDrawer';
import { OverlayDrawer, type OverlayDrawerProps } from './OverlayDrawer';
import type { DrawerProps, DrawerState } from './Drawer.types';

const omitOverlayDrawerProps = (props: OverlayDrawerProps): InlineDrawerProps => {
  const { modalType: _modalType, onOpenChange: _onOpenChange, ...inlineProps } = props;

  return inlineProps as InlineDrawerProps;
};

/**
 * Returns the state for a Drawer component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDrawer`.
 */
export const useDrawer = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  const { type, ...variantProps } = props;
  // Responsive drawers may switch `type` while keeping overlay-only props, which must not reach the inline root.
  const restProps =
    type === 'inline'
      ? omitOverlayDrawerProps(variantProps as OverlayDrawerProps)
      : (variantProps as OverlayDrawerProps);
  const elementType = (type === 'inline' ? InlineDrawer : OverlayDrawer) as ForwardRefComponent<
    InlineDrawerProps | OverlayDrawerProps
  >;
  const root: InlineDrawerProps | OverlayDrawerProps = slot.always({ ref, ...restProps }, { elementType });

  return {
    components: { root: elementType },
    root,
  };
};
