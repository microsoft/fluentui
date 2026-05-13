import { renderTeachingPopoverHeader_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

/**
 * v9's render asserts a full `TeachingPopoverHeaderState` (which includes
 * `appearance`). The base state intentionally omits it, but the render
 * only reads slot fields — safe to cast.
 */
export const renderTeachingPopoverHeader = (state: TeachingPopoverHeaderState): JSXElement =>
  renderTeachingPopoverHeader_unstable(state as Parameters<typeof renderTeachingPopoverHeader_unstable>[0]);
