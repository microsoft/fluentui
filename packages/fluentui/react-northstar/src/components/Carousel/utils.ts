export function getAnimationName({
  active,
  dir,
  animationEnterFromPrev,
  animationEnterFromNext,
  animationExitToPrev,
  animationExitToNext,
}) {
  const initialMounting = typeof dir === 'undefined';

  let animationName = '';
  if (!initialMounting) {
    if (!active) {
      animationName = dir === 'start' ? animationExitToPrev : animationExitToNext;
    }

    if (active) {
      animationName = dir === 'start' ? animationEnterFromNext : animationEnterFromPrev;
    }
  }

  return animationName;
}
