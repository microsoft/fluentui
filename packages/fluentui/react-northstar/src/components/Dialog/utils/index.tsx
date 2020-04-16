const _disableIosBodyScroll = (event: TouchEvent) => {
  event.preventDefault();
};

export function enableBodyScroll(target: HTMLElement): void {
  if (target) {
    target.style.overflow = 'unset';
    target.removeEventListener('touchmove', _disableIosBodyScroll);
  }
}

export function disableBodyScroll(target: HTMLElement): void {
  if (target) {
    target.style.overflow = 'hidden';
    target.addEventListener('touchmove', _disableIosBodyScroll, { passive: false, capture: false });
  }
}
