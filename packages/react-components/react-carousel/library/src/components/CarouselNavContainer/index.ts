export { CarouselNavContainer } from './CarouselNavContainer';
export type {
  CarouselNavContainerProps,
  CarouselNavContainerSlots,
  CarouselNavContainerState,
} from './CarouselNavContainer.types';
export { renderCarouselNavContainer_unstable } from './renderCarouselNavContainer';
export { useCarouselNavContainer_unstable } from './useCarouselNavContainer';
export {
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselNavContainerClassNames,
  useCarouselNavContainerStyles_unstable,
} from './useCarouselNavContainerStyles.styles';
