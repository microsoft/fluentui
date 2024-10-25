import type { CreatePluginType, EmblaCarouselType, OptionsHandlerType } from 'embla-carousel';
import { carouselClassNames } from '../Carousel';

export type PointerEventPluginOptions = {
  onSelectViaDrag: (event: PointerEvent | MouseEvent, index: number) => void;
};

export type PointerEventPlugin = CreatePluginType<{}, PointerEventPluginOptions>;

export function pointerEventPlugin(options: PointerEventPluginOptions): PointerEventPlugin {
  let emblaApi: EmblaCarouselType;
  let pointerEvent: PointerEvent | MouseEvent | undefined;

  function documentDownListener(event: PointerEvent | MouseEvent) {
    const targetDocument = emblaApi.containerNode().ownerDocument;

    if (event.target) {
      const targetNode = event.target as Element;
      if (targetNode.classList.contains(carouselClassNames.root) || emblaApi.containerNode().contains(targetNode)) {
        pointerEvent = event;
      }
    }

    targetDocument.removeEventListener('mousedown', documentDownListener);
    targetDocument.removeEventListener('pointerdown', documentDownListener);
  }

  function pointerUpListener() {
    const targetDocument = emblaApi.containerNode().ownerDocument;

    targetDocument.addEventListener('mousedown', documentDownListener);
    targetDocument.addEventListener('pointerdown', documentDownListener);
  }

  function clearPointerEvent() {
    pointerEvent = undefined;
  }

  function selectListener() {
    if (pointerEvent) {
      const newIndex = emblaApi.selectedScrollSnap() ?? 0;

      options.onSelectViaDrag(pointerEvent, newIndex);
      clearPointerEvent();
    }
  }

  function init(emblaApiInstance: EmblaCarouselType, optionsHandler: OptionsHandlerType): void {
    emblaApi = emblaApiInstance;

    // Initialize the listener for first mouse/pointerDown event
    const targetDocument = emblaApi.containerNode().ownerDocument;
    targetDocument.addEventListener('mousedown', documentDownListener);
    targetDocument.addEventListener('pointerdown', documentDownListener);

    emblaApi.on('pointerUp', pointerUpListener);
    emblaApi.on('select', selectListener);
    // Settle is used to clear pointer in cases where active index does not change
    emblaApi.on('settle', clearPointerEvent);
  }

  function destroy(): void {
    const targetDocument = emblaApi.containerNode().ownerDocument;
    targetDocument.removeEventListener('mousedown', documentDownListener);
    targetDocument.removeEventListener('pointerdown', documentDownListener);
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
