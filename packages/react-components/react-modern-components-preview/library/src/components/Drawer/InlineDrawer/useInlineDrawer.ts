'use client';

import type * as React from 'react';
import { useInlineDrawer as useInlineDrawerBase } from '@fluentui/react-headless-components-preview/drawer';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
import type { InlineDrawerProps, InlineDrawerState } from './InlineDrawer.types';

export const useInlineDrawer = (props: InlineDrawerProps, ref: React.Ref<HTMLElement>): InlineDrawerState => {
  const { separator = false, size = 'small', surfaceMotion, ...rest } = props;
  const state = useInlineDrawerBase(rest, ref);

  return {
    ...state,
    components: {
      root: 'div',
      surfaceMotion: Slide,
    },
    root: {
      ...state.root,
      'data-size': size,
      'data-separator': separator ? '' : undefined,
    },
    separator,
    size,
    surfaceMotion: presenceMotionSlot(surfaceMotion, {
      elementType: Slide,
      defaultProps: {
        appear: state.unmountOnClose,
        outX: 'var(--fui-Drawer--motion-x)',
        outY: 'var(--fui-Drawer--motion-y)',
        unmountOnExit: state.unmountOnClose,
        visible: state.open,
      },
    }),
  };
};
