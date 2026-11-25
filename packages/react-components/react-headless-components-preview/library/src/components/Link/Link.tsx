'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { LinkProps } from './Link.types';
import { useLink } from './useLink';
import { renderLink } from './renderLink';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A link component for navigation.
 */
export const Link: ForwardRefComponent<LinkProps> = /*#__PURE__*/ composeComponent('Link', useLink, renderLink);
