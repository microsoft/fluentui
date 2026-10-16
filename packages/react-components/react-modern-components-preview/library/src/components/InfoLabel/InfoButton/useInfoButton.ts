'use client';

import * as React from 'react';
import { useInfoButton as useInfoButtonBase } from '@fluentui/react-headless-components-preview/info-label';
import { DefaultInfoButtonIcon } from './DefaultInfoButtonIcon';
import type { InfoButtonProps, InfoButtonState } from './InfoButton.types';

/**
 * Create the state required to render InfoButton.
 */
export const useInfoButton = (props: InfoButtonProps, ref: React.Ref<HTMLButtonElement>): InfoButtonState => {
  const { size = 'medium', ...rest } = props;
  const state = useInfoButtonBase(rest, ref);

  return {
    ...state,
    info: {
      ...state.info,
      'data-size': size,
    },
    root: {
      ...state.root,
      children: state.root.children ?? React.createElement(DefaultInfoButtonIcon),
      'data-size': size,
    },
    size,
  };
};
