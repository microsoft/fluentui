import { renderLink_unstable } from '@fluentui/react-link';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastLinkState } from './ToastLink.types';

/**
 * Render the final JSX of ToastLink
 */
export const renderToastLink_unstable = (state: ToastLinkState): JSXElement => {
  return renderLink_unstable(state);
};
