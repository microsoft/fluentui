import type * as React from 'react';
import type { OverflowOptions, OverflowGroupState } from '@fluentui/priority-overflow';
import type { OverflowContextValue } from '../../overflowContext';
import type { UseOverflowContainerReturn } from '../../types';

export interface OverflowState {
  hasOverflow: boolean;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

export interface OnOverflowChangeData extends OverflowState {}

export type OverflowProps = Partial<
  Pick<OverflowOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'minimumVisible' | 'hasHiddenItems'>
> & {
  children: React.ReactElement;

  // overflow is not caused by DOM event
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onOverflowChange?: (ev: null, data: OverflowState) => void;
};

/**
 * State used in rendering Overflow. Carries the overflow container's registration api so
 * `useOverflowContextValues_unstable` can assemble the context values.
 */
export type OverflowComponentState = UseOverflowContainerReturn<HTMLElement> & {
  /**
   * Merged ref applied to the cloned child's root element.
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Class name applied to the cloned child. Set by `useOverflowStyles_unstable`; left `undefined`
   * by headless consumers that apply no styling.
   */
  className?: string;
  /**
   * The single child that overflow behavior is attached to.
   */
  children: React.ReactElement;
};

/**
 * Context values provided to overflow descendants.
 */
export type OverflowContextValues = {
  overflow: OverflowContextValue;
};
