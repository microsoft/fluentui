import { clamp } from '@fluentui/react-utilities';

/**
 * Calculates the normalized coordinates of a mouse event relative to a given HTML element.
 *
 * @param element - The HTML element to calculate the coordinates relative to.
 * @param event - The mouse event containing the clientX and clientY properties.
 * @returns An object containing the normalized x and y coordinates, clamped between 0 and 1.
 */
export function getCoordinates(element: HTMLElement, event: PointerEvent): { x: number; y: number } {
  const rect = element.getBoundingClientRect();

  const newX = roundTwoDecimal((event.clientX - rect.left) / rect.width);
  const newY = roundTwoDecimal(1 - (event.clientY - rect.top) / rect.height);

  return {
    x: clamp(newX, 0, 1),
    y: clamp(newY, 0, 1),
  };
}

/**
 * Rounds a given number to two decimal places.
 *
 * @param num - The number to be rounded.
 * @returns The number rounded to two decimal places.
 */
export function roundTwoDecimal(num: number): number {
  return Math.round(num * 100) / 100;
}
