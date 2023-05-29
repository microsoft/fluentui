/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import {
  assertSlots,
  ComponentProps,
  ComponentState,
  getNativeElementProps,
  slot,
  Slot,
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
    root: slot(getNativeElementProps('div', { ...props, ref }), { required: true, elementType: 'div' }),
    contentMedia: slot(props.contentMedia, { elementType: 'div' }),
    contentWrapper: slot(props.contentWrapper, {
      required: true,
      elementType: 'div',
    }),
    header: slot(props.header, { elementType: 'div' }),
    headerMedia: slot(props.headerMedia, { elementType: 'div' }),
    startMedia: slot(props.startMedia, { elementType: 'div' }),
    endMedia: slot(props.endMedia, { elementType: 'div' }),
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
