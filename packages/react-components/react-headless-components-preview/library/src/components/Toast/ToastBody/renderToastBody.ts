import { renderToastBody_unstable } from '@fluentui/react-toast';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ToastBodyState } from './ToastBody.types';

/**
 * Renders the final JSX of the ToastBody component.
 */
export const renderToastBody = renderToastBody_unstable as (state: ToastBodyState) => JSXElement;
