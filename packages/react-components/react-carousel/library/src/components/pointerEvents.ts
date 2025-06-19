import type { CreatePluginType, EmblaCarouselType, OptionsHandlerType } from 'embla-carousel';
import { carouselClassNames } from '../Carousel';

export type PointerEventPluginOptions = {
  onSelectViaDrag: (event: PointerEvent | MouseEvent, index: number) => void;
};

export type PointerEventPlugin = CreatePluginType<{}, PointerEventPluginOptions>;

export function pointerEventPlugin(options: PointerEventPluginOptions): PointerEventPlugin {
  let emblaApi: EmblaCarouselType;
  let pointerEvent: PointerEvent | MouseEvent | undefined;
  let carouselListenerTarget: HTMLElement | undefined;

  /**
   * Heads up!
   *
   * We don't use `emblaApi.on('pointerDown', ...)` as the callback does not provide the event.
   */
  function documentDownListener(event: PointerEvent | MouseEvent) {
    if (event.target) {
      const targetNode = event.target as Element;

      if (targetNode.classList.contains(carouselClassNames.root) || carouselListenerTarget?.contains(targetNode)) {
        pointerEvent = event;
      }
    }

    if (carouselListenerTarget) {
      carouselListenerTarget.removeEventListener('mousedown', documentDownListener);
      carouselListenerTarget.removeEventListener('pointerdown', documentDownListener);
    }
  }

  function pointerUpListener() {
    if (carouselListenerTarget) {
      carouselListenerTarget.addEventListener('mousedown', documentDownListener);
      carouselListenerTarget.addEventListener('pointerdown', documentDownListener);
    }
  }

  function clearPointerEvent() {
    pointerEvent = undefined;
    pointerUpListener();
  }

  function selectListener() {
    if (pointerEvent) {
      const newIndex = emblaApi.selectedScrollSnap() ?? 0;
      options.onSelectViaDrag(pointerEvent, newIndex);
    }
  }

  function init(emblaApiInstance: EmblaCarouselType, optionsHandler: OptionsHandlerType): void {
    emblaApi = emblaApiInstance;
    // Initialize the listener for first mouse/pointerDown event
    carouselListenerTarget = emblaApi.containerNode();

    carouselListenerTarget.addEventListener('mousedown', documentDownListener);
    carouselListenerTarget.addEventListener('pointerdown', documentDownListener);

    emblaApi.on('pointerUp', pointerUpListener);
    emblaApi.on('select', selectListener);
    // Settle is used to clear pointer and conclude drag event
    emblaApi.on('settle', clearPointerEvent);
  }

  function destroy(): void {
    if (carouselListenerTarget) {
      carouselListenerTarget.removeEventListener('mousedown', documentDownListener);
      carouselListenerTarget.removeEventListener('pointerdown', documentDownListener);
    }

    carouselListenerTarget = undefined;

    emblaApi.off('pointerUp', pointerUpListener);
    emblaApi.off('select', selectListener);
    emblaApi.off('settle', clearPointerEvent);
  }

  return {
    name: 'pointerEvent',
    options,
    init,
    destroy,
  };
}
