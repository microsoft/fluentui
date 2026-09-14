'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { LinkProps } from './Link.types';
import { useLink } from './useLink';
import { renderLink } from './renderLink';

/**
 * A link component for navigation.
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef((props, ref) => {
  const state = useLink(props, ref);

  return renderLink(state);
});

Link.displayName = 'Link';
