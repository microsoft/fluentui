import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { DrawerProps, DrawerState } from './Drawer.types';
import { OverlayDrawer, type OverlayDrawerProps } from '../OverlayDrawer';
import { InlineDrawer, type InlineDrawerProps } from '../InlineDrawer';

/**
 * Responsive drawers may pass props for both variants, only props of the active variant must be forwarded.
 */
const omitOverlayDrawerProps = (props: Omit<DrawerProps, 'type'>): InlineDrawerProps => {
  const {
    modalType: _modalType,
    onOpenChange: _onOpenChange,
    inertTrapFocus: _inertTrapFocus,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    defaultOpen: _defaultOpen,
    backdrop: _backdrop,
    backdropMotion: _backdropMotion,
    mountNode: _mountNode,
    ...inlineProps
  } = props as OverlayDrawerProps;

  return inlineProps as InlineDrawerProps;
};

const omitInlineDrawerProps = (props: Omit<DrawerProps, 'type'>): OverlayDrawerProps => {
  const { separator: _separator, ...overlayProps } = props as InlineDrawerProps;

  return overlayProps as OverlayDrawerProps;
};

/**
 * Create the state required to render Drawer.
 *
 * The returned state can be modified with hooks such as useDrawerStyles_unstable,
 * before being passed to renderDrawer_unstable.
 *
 * @param props - props from this instance of Drawer
 * @param ref - reference to root HTMLElement of Drawer
 */
export const useDrawer_unstable = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  const { type, ...variantProps } = props;
  // casting here to convert a union of functions to a single function with the union of parameters
  const elementType = (type === 'inline' ? InlineDrawer : OverlayDrawer) as ForwardRefComponent<
    InlineDrawerProps | OverlayDrawerProps
  >;
  const root: InlineDrawerProps | OverlayDrawerProps = slot.always(
    { ref, ...(type === 'inline' ? omitOverlayDrawerProps(variantProps) : omitInlineDrawerProps(variantProps)) },
    { elementType },
  );

  return {
    components: { root: elementType },
    root,
  };
};
