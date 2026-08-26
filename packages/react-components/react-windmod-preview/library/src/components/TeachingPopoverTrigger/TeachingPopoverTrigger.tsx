'use client';

import type * as React from 'react';
import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverTrigger,
  useTeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverTriggerProps } from './TeachingPopoverTrigger.types';
import { useTeachingPopoverTriggerStyles } from './useTeachingPopoverTriggerStyles';

/**
 * A TeachingPopoverTrigger wires the consumer's own element to the teaching popover it opens.
 * Windmod TeachingPopoverTrigger: the headless trigger plus the marker pair, so a consumer can
 * compose against the trigger the same way they compose against any windmod component.
 */
export const TeachingPopoverTrigger: React.FC<TeachingPopoverTriggerProps> = (
  props: TeachingPopoverTriggerProps,
): JSXElement | null => renderTeachingPopoverTrigger(useTeachingPopoverTriggerStyles(useTeachingPopoverTrigger(props)));

TeachingPopoverTrigger.displayName = 'TeachingPopoverTrigger';

/** Lets trigger utilities clone props through TeachingPopoverTrigger. */
(TeachingPopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
