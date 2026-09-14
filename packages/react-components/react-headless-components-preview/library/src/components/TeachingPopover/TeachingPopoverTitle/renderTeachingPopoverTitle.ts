import { renderTeachingPopoverTitle_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

export const renderTeachingPopoverTitle = renderTeachingPopoverTitle_unstable as (
  state: TeachingPopoverTitleState,
) => JSXElement;
