import type { CarouselTransition } from '@fluentui/react-headless-components-preview/carousel';

/** Consumer-owned design values; reduced motion and cancellation are handled by Carousel. */
export const carouselTransition: CarouselTransition = ({ incoming, outgoing, direction, dir }) => {
  if (!incoming.animate) {
    return [];
  }
  const style = incoming.ownerDocument.defaultView!.getComputedStyle(incoming);
  const sign = direction * (dir === 'rtl' ? -1 : 1);
  const distance = style.getPropertyValue('--carousel-distance');
  const enter = parseFloat(style.getPropertyValue('--carousel-enter-duration'));
  const exit = parseFloat(style.getPropertyValue('--carousel-exit-duration'));
  return [
    incoming.animate([{ transform: `translateX(calc(${sign} * ${distance}))` }, { transform: 'translateX(0)' }], {
      duration: enter,
      easing: style.getPropertyValue('--carousel-enter-easing').trim(),
      fill: 'both',
    }),
    incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: enter, easing: 'linear', fill: 'both' }),
    outgoing.animate([{ transform: 'translateX(0)' }, { transform: `translateX(calc(${-sign} * ${distance}))` }], {
      duration: exit,
      easing: style.getPropertyValue('--carousel-exit-easing').trim(),
      fill: 'both',
    }),
    outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: exit, easing: 'linear', fill: 'both' }),
  ];
};
