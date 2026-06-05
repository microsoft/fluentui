import { renderToastTitle_unstable } from '@fluentui/react-toast';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ToastTitleState } from './ToastTitle.types';

export const renderToastTitle = renderToastTitle_unstable as (state: ToastTitleState) => JSXElement;
