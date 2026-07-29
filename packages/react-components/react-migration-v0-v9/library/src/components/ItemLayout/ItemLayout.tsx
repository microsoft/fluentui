/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { getIntrinsicElementProps, slot, assertSlots } from '@fluentui/react-utilities';

import { useItemLayoutStyles } from './ItemLayout.styles';

type ItemLayoutSlots = {
  root: Slot<'div'>;

  contentMedia?: Slot<'div'>;
  contentWrapper?: Slot<'div'>;

  header?: Slot<'div'>;
  headerMedia?: Slot<'div'>;

  startMedia?: Slot<'div'>;
  endMedia?: Slot<'div'>;
};

type ItemLayoutProps = ComponentProps<ItemLayoutSlots>;

type ItemLayoutState = ComponentState<ItemLayoutSlots>;

/**
 * Public identity class for ItemLayout.
 *
 * @deprecated for styling — see `attachmentClassName` in ../Attachment/Attachment.tsx for the
 * full rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-ItemLayout` it used to hold was removed
 * with every other static (D16.1). Use `fuiSelector(itemLayoutClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const itemLayoutClassName = 'group/fui-item-layout';

export const ItemLayout = React.forwardRef<HTMLDivElement, ItemLayoutProps>((props, ref) => {
  const state: ItemLayoutState = {
    components: {
      root: 'div',
      contentWrapper: 'div',
      contentMedia: 'div',
      header: 'div',
      headerMedia: 'div',
      startMedia: 'div',
      endMedia: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref }), { elementType: 'div' }),
    contentMedia: slot.optional(props.contentMedia, { elementType: 'div' }),
    contentWrapper: slot.optional(props.contentWrapper, { renderByDefault: true, elementType: 'div' }),
    header: slot.optional(props.header, { elementType: 'div' }),
    headerMedia: slot.optional(props.headerMedia, { elementType: 'div' }),
    startMedia: slot.optional(props.startMedia, { elementType: 'div' }),
    endMedia: slot.optional(props.endMedia, { elementType: 'div' }),
  };
  const styles = useItemLayoutStyles();

  // Unconditional module class FIRST, marker second, consumer className last (DECISIONS.md
  // D16.2). The marker must never be `classList[0]` — nwsapi's `:scope` polyfill throws on
  // it under jsdom (D15.1). Cascade priority is decided by the `@layer fui.*` order in
  // ItemLayout.module.css, not by the order of these arguments.
  state.root.className = clsx(styles.root, 'group/fui-item-layout', state.root.className);
  if (state.contentWrapper) {
    state.contentWrapper.className = clsx(styles.contentWrapper, state.contentWrapper.className);
  }

  if (state.contentMedia) {
    state.contentMedia.className = clsx(styles.contentMedia, state.contentMedia.className);
  }

  if (state.header) {
    state.header.className = clsx(styles.header, state.header.className);
  }

  if (state.headerMedia) {
    state.headerMedia.className = clsx(styles.headerMedia, state.headerMedia.className);
  }

  if (state.startMedia) {
    state.startMedia.className = clsx(styles.startMedia, state.startMedia.className);
  }

  if (state.endMedia) {
    state.endMedia.className = clsx(styles.endMedia, state.endMedia.className);
  }

  assertSlots<ItemLayoutSlots>(state);

  return (
    <state.root>
      {state.startMedia && <state.startMedia />}
      {state.header && <state.header />}
      {state.headerMedia && <state.headerMedia />}
      {state.contentWrapper && <state.contentWrapper>{state.root.children}</state.contentWrapper>}
      {state.contentMedia && <state.contentMedia />}
      {state.endMedia && <state.endMedia />}
    </state.root>
  );
});

ItemLayout.displayName = 'ItemLayout';
