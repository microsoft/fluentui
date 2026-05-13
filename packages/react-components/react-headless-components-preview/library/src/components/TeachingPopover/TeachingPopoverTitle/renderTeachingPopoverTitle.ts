import { renderTeachingPopoverTitle_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

/**
 * Cast to v9's render signature — base state omits `appearance` and the
 * render only reads slot fields.
 */
export const renderTeachingPopoverTitle = (state: TeachingPopoverTitleState): JSXElement =>
  renderTeachingPopoverTitle_unstable(state as Parameters<typeof renderTeachingPopoverTitle_unstable>[0]);
