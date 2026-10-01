import {
  resolvePositioningShorthand,
  type PositioningProps,
  type PositioningShorthand,
  type PositioningShorthandValue,
} from '@fluentui/react-headless-components-preview/positioning';

const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

export const getListboxPositioning = (positioning: PositioningShorthand | undefined): PositioningProps => ({
  position: 'below',
  align: 'start',
  offset: { crossAxis: 0, mainAxis: 2 },
  fallbackPositions,
  matchTargetSize: 'width',
  ...resolvePositioningShorthand(positioning),
});
