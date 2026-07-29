export type {
  CarouselNavContextValue,
  CarouselNavProps,
  CarouselNavSlots,
  CarouselNavState,
  NavButtonRenderFunction,
} from './components/CarouselNav/index';
export {
  CarouselNav,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselNavClassNames,
  renderCarouselNav_unstable,
  useCarouselNavStyles_unstable,
  useCarouselNav_unstable,
} from './components/CarouselNav/index';
