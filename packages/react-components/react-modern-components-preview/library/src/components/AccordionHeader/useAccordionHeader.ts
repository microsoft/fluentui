'use client';

import * as React from 'react';
import {
  useAccordionHeader as useAccordionHeaderBase,
  useAccordionHeaderContextValues,
} from '@fluentui/react-headless-components-preview/accordion';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';

export { useAccordionHeaderContextValues };

export const useAccordionHeader = (props: AccordionHeaderProps, ref: React.Ref<HTMLElement>): AccordionHeaderState => {
  const { inline = false, size = 'medium', ...rest } = props;
  const state = useAccordionHeaderBase(rest, ref);

  return {
    ...state,
    expandIcon: state.expandIcon
      ? {
          ...state.expandIcon,
          children:
            state.expandIcon.children ?? React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' }),
          'data-icon-position': state.expandIconPosition,
          'data-open': state.open ? '' : undefined,
        }
      : state.expandIcon,
    root: {
      ...state.root,
      'data-inline': inline ? '' : undefined,
      'data-size': size,
    },
    inline,
    size,
  };
};
