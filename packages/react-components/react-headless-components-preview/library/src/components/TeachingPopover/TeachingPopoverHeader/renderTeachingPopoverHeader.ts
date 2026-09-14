import { renderTeachingPopoverHeader_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

export const renderTeachingPopoverHeader = renderTeachingPopoverHeader_unstable as (
  state: TeachingPopoverHeaderState,
) => JSXElement;
