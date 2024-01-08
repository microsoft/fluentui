import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import { TeachingPopoverState } from './TeachingPopover';

export const TeachingPopoverContext: Context<TeachingPopoverContextValue> = createContext<
  TeachingPopoverContextValue | undefined
>(undefined) as Context<TeachingPopoverContextValue>;

const teachingPopoverContextDefaultValue: TeachingPopoverContextValue = {
  currentPage: 0,
  setCurrentPage: () => null,
  totalPages: 1, //'One-pager' default state until proven otherwise
  setTotalPages: () => null,
  appearance: undefined,
  onPageChange: () => null,
  onFinish: () => null,
};

export const TeachingPopoverProvider = TeachingPopoverContext.Provider;

/**
 * Context shared between TeachingPopover and its children components
 */
export type TeachingPopoverContextValue = Pick<
  TeachingPopoverState,
  'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages' | 'appearance' | 'onPageChange' | 'onFinish'
>;

export const useTeachingPopoverContext_unstable = <T>(selector: ContextSelector<TeachingPopoverContextValue, T>): T =>
  useContextSelector(TeachingPopoverContext, (ctx = teachingPopoverContextDefaultValue) => selector(ctx));
