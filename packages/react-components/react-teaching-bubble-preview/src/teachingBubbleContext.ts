import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import { TeachingBubbleState } from './TeachingBubble';

export const TeachingBubbleContext: Context<TeachingBubbleContextValue> = createContext<
  TeachingBubbleContextValue | undefined
>(undefined) as Context<TeachingBubbleContextValue>;

const teachingBubbleContextDefaultValue: TeachingBubbleContextValue = {
  currentPage: 0,
  setCurrentPage: () => null,
  totalPages: 1, //'One-pager' default state until proven otherwise
  setTotalPages: () => null,
  appearance: undefined,
  onPageChange: () => null,
  onFinish: () => null,
};

export const TeachingBubbleProvider = TeachingBubbleContext.Provider;

/**
 * Context shared between TeachingBubble and its children components
 */
export type TeachingBubbleContextValue = Pick<
  TeachingBubbleState,
  'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages' | 'appearance' | 'onPageChange' | 'onFinish'
>;

export const useTeachingBubbleContext_unstable = <T>(selector: ContextSelector<TeachingBubbleContextValue, T>): T =>
  useContextSelector(TeachingBubbleContext, (ctx = teachingBubbleContextDefaultValue) => selector(ctx));
