import * as React from 'react';
import type { TagPickerState, TagPickerContextValues } from './TagPicker.types';
import { Portal } from '@fluentui/react-portal';
import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerContent } from './renderTagPickerBase';

/**
 * Render the final JSX of Picker
 */

export const renderTagPicker_unstable = (state: TagPickerState, contexts: TagPickerContextValues): JSXElement =>
  renderTagPickerContent(
    state,
    contexts,
    state.popover && (state.inline ? state.popover : <Portal mountNode={state.mountNode}>{state.popover}</Portal>),
  );
