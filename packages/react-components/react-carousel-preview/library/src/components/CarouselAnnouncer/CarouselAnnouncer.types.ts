import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselAnnouncerSlots = {
  root: Slot<'div'>;
};

export type AnnouncerIndexRenderFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => string;
/**
 * CarouselAnnouncer Props
 */
export type CarouselAnnouncerProps = Omit<ComponentProps<Partial<CarouselAnnouncerSlots>>, 'children'> & {
  children: AnnouncerIndexRenderFunction;
};

/**
 * State used in rendering CarouselAnnouncer
 */
export type CarouselAnnouncerState = ComponentState<CarouselAnnouncerSlots> & {
  /**
   * The function that will render nav items based on total slides and their index.
   */
  renderAnnouncerText: AnnouncerIndexRenderFunction;
};
