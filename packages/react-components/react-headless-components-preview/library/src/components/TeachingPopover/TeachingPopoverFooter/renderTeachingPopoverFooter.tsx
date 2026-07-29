/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

/**
 * The headless footer leaves button composition to consumers — unlike the
 * v9 render which emits dedicated `primary`/`secondary` Button slots that
 * the headless base hook intentionally omits.
 */
export const renderTeachingPopoverFooter = (state: TeachingPopoverFooterState): JSXElement => {
  assertSlots<{ root: NonNullable<TeachingPopoverFooterState['root']> }>(state);

  return <state.root />;
};
