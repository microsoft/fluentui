import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type TabSlots = {
  // TODO Add slots here and to tabShorthandProps in useTab.ts
  root: IntrinsicShorthandProps<'div'>;
};

export type TabCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Tab Props
 */
export type TabProps = ComponentProps<TabSlots> & TabCommons;

/**
 * State used in rendering Tab
 */
export type TabState = ComponentState<TabSlots> & TabCommons;
