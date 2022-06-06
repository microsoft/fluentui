export function getAnimationName({
  active,
  dir,
  animationEnterFromPrev,
  animationEnterFromNext,
  animationExitToPrev,
  animationExitToNext,
}) {
  const initialMounting = typeof dir === 'undefined';

  if (!initialMounting) {
    if (!active) {
      return dir === 'start' ? animationExitToPrev : animationExitToNext;
    }

    if (active) {
      return dir === 'start' ? animationEnterFromNext : animationEnterFromPrev;
    }
  }

  return '';
}
