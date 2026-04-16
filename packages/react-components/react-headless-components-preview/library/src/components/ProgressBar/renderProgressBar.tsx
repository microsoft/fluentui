import { renderProgressBar_unstable } from '@fluentui/react-progress';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ProgressBarState } from './ProgressBar.types';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar = renderProgressBar_unstable as (state: ProgressBarState) => JSXElement;
