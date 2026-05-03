import { renderToastTitle_unstable } from '@fluentui/react-toast';
import type { ToastTitleBaseState, ToastTitleState } from '@fluentui/react-toast';
import type { JSXElement } from '@fluentui/react-utilities';

// Cast strips the style-only `backgroundAppearance` field; renderToastTitle_unstable
// does not use it in its render path (only the style hook reads it).
export const renderToastTitle = (state: ToastTitleBaseState): JSXElement =>
  renderToastTitle_unstable(state as ToastTitleState);
