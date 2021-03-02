import { memoizeFunction } from '@fluentui/react/lib/Utilities';

const getContextOrFalse = memoizeFunction(
  (): CanvasRenderingContext2D | false => document.createElement('canvas').getContext('2d') || false,
  1,
);

export function isSingleLineText(lineLength: number, text: string, textStyle: string): boolean {
  const context = getContextOrFalse();

  if (!context) {
    return false;
  }

  context.font = textStyle;

  const textWidth = context.measureText(text).width;

  return textWidth <= lineLength;
}
