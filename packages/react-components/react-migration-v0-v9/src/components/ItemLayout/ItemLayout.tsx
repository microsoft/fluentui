/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import {
  ComponentProps,
  ComponentState,
  getNativeElementProps,
  getSlotsNext,
  Slot,
  resolveShorthand,
} from '@fluentui/react-utilities';

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

export const itemLayoutClassName = 'fui-ItemLayout';

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
    root: getNativeElementProps('div', { ...props, ref }),
    contentMedia: resolveShorthand(props.contentMedia),
    contentWrapper: resolveShorthand(props.contentWrapper, {
      required: true,
    }),
    header: resolveShorthand(props.header),
    headerMedia: resolveShorthand(props.headerMedia),
    startMedia: resolveShorthand(props.startMedia),
    endMedia: resolveShorthand(props.endMedia),
  };
  const styles = useItemLayoutStyles();

  state.root.className = mergeClasses(itemLayoutClassName, styles.root, state.root.className);
  if (state.contentWrapper) {
    state.contentWrapper.className = mergeClasses(styles.contentWrapper, state.contentWrapper.className);
  }

  if (state.contentMedia) {
    state.contentMedia.className = mergeClasses(styles.contentMedia, state.contentMedia.className);
  }

  if (state.header) {
    state.header.className = mergeClasses(styles.header, state.header.className);
  }

  if (state.headerMedia) {
    state.headerMedia.className = mergeClasses(styles.headerMedia, state.headerMedia.className);
  }

  if (state.startMedia) {
    state.startMedia.className = mergeClasses(styles.startMedia, state.startMedia.className);
  }

  if (state.endMedia) {
    state.endMedia.className = mergeClasses(styles.endMedia, state.endMedia.className);
  }

  const { slots, slotProps } = getSlotsNext<ItemLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.startMedia && <slots.startMedia {...slotProps.startMedia} />}

      {slots.header && <slots.header {...slotProps.header} />}
      {slots.headerMedia && <slots.headerMedia {...slotProps.headerMedia} />}
      {slots.contentWrapper && (
        <slots.contentWrapper {...slotProps.contentWrapper}>{state.root.children}</slots.contentWrapper>
      )}
      {slots.contentMedia && <slots.contentMedia {...slotProps.contentMedia} />}

      {slots.endMedia && <slots.endMedia {...slotProps.endMedia} />}
    </slots.root>
  );
});

ItemLayout.displayName = 'ItemLayout';
