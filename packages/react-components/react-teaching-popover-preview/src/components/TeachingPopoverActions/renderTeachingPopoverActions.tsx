/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import type { TeachingPopoverActionsState } from './TeachingPopoverActions.types';
import { TeachingPopoverActionsSlots } from './TeachingPopoverActions.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverActions
 */
export const renderTeachingPopoverActions_unstable = (state: TeachingPopoverActionsState) => {
  assertSlots<TeachingPopoverActionsSlots>(state);

  return <state.root />;
};
