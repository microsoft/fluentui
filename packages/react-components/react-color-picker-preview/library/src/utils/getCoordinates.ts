import { clamp } from '@fluentui/react-utilities';

export function getCoordinates(element: HTMLElement, event: MouseEvent) {
  const rect = element.getBoundingClientRect();

  const newX = roundTwoDecimal((event.clientX - rect.left) / rect.width);
  const newY = roundTwoDecimal(1 - (event.clientY - rect.top) / rect.height);

  return {
    x: clamp(newX, 0, 1),
    y: clamp(newY, 0, 1),
  };
}

export function roundTwoDecimal(num: number) {
  return Math.round(num * 100) / 100;
}
