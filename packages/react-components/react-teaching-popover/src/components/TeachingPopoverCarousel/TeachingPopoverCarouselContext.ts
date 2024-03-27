import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

const TeachingPopoverCarouselContext: Context<TeachingPopoverCarouselContextValue> = createContext<
  TeachingPopoverCarouselContextValue | undefined
>(undefined) as Context<TeachingPopoverCarouselContextValue>;

const teachingPopoverCarouselContextDefaultValue: TeachingPopoverCarouselContextValue = {
  currentPage: 0,
  setCurrentPage: () => null,
  totalPages: 1, //'One-pager' default state until proven otherwise
  onPageChange: () => null,
};

export const TeachingPopoverCarouselProvider = TeachingPopoverCarouselContext.Provider;

/**
 * Context shared between TeachingPopoverCarousel and its children components
 */
export type TeachingPopoverCarouselContextValues = {
  carousel: TeachingPopoverCarouselContextValue;
};

/**
 * Context shared between TeachingPopoverCarousel and its children components
 */
export type TeachingPopoverCarouselContextValue = Pick<
  TeachingPopoverCarouselState,
  'currentPage' | 'setCurrentPage' | 'totalPages' | 'onPageChange'
>;

export const useTeachingPopoverCarouselContext_unstable = <T>(
  selector: ContextSelector<TeachingPopoverCarouselContextValue, T>,
): T =>
  useContextSelector(TeachingPopoverCarouselContext, (ctx = teachingPopoverCarouselContextDefaultValue) =>
    selector(ctx),
  );

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { currentPage, setCurrentPage, totalPages, onPageChange } = state;

  const carousel = {
    currentPage,
    setCurrentPage,
    totalPages,
    onPageChange,
  };

  return { carousel };
}
