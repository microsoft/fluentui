/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { LinkSlots, LinkBaseState } from './Link.types';

/**
 * Renders a Link component by passing the state defined props to the appropriate slots.
 */
export const renderLink_unstable = (state: LinkBaseState): JSXElement => {
  assertSlots<LinkSlots>(state);

  return <state.root />;
};
