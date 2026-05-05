import { renderToastBody_unstable } from '@fluentui/react-toast';
import type { ToastBodyBaseState, ToastBodyState } from '@fluentui/react-toast';
import type { JSXElement } from '@fluentui/react-utilities';

// Cast strips the style-only `backgroundAppearance` field; renderToastBody_unstable
// does not use it in its render path (only the style hook reads it).
export const renderToastBody = (state: ToastBodyBaseState): JSXElement =>
  renderToastBody_unstable(state as ToastBodyState);
