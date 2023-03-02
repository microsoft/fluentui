export const systemColors = [
  'CanvasText',
  'Canvas',
  'LinkText',
  'GrayText',
  'HighlightText',
  'Highlight',
  'ButtonText',
  'ButtonFace',
] as const;

export const isSystemColor = (color: string): color is (typeof systemColors)[number] => {
  return systemColors.includes(color as (typeof systemColors)[number]);
};
