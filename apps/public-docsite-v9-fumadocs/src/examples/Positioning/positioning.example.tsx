import { createGuideExample } from '../../components/GuideExample';
import descriptionMd from './PositioningDescription.md';
import bestPracticesMd from './PositioningBestPractices.md';
import { Default } from './PositioningDefault.example';
import { ShorthandPositions } from './PositioningShorthandPositions.example';
import { CoverTarget } from './PositioningCoverTarget.example';
import { OffsetValue } from './PositioningOffsetValue.example';
import { OffsetFunction } from './PositioningOffsetFunction.example';
import { AnchorToTarget } from './PositioningAnchorToTarget.example';
import { ImperativeAnchorTarget } from './PositioningImperativeAnchorTarget.example';
import { ImperativePositionUpdate } from './PositioningImperativePositionUpdate.example';
import { OverflowBoundary } from './PositioningOverflowBoundary.example';
import { OverflowBoundaryRect } from './PositioningOverflowBoundaryRect.example';
import { OverflowBoundaryPadding } from './PositioningOverflowBoundaryPadding.example';
import { FlipBoundary } from './PositioningFlipBoundary.example';
import { MatchTargetSize } from './PositioningMatchTargetSize.example';
import { DisableTransform } from './PositioningDisableTransform.example';
import { ListenToUpdates } from './PositioningListenToUpdates.example';
import { AutoSizeForSmallViewport } from './PositioningAutoSize.example';
import { CoverTargetForSmallViewport } from './PositioningShiftToCoverTarget.example';
import { FallbackPositions } from './PositioningFallbackPositions.example';

export const description = [descriptionMd, bestPracticesMd].join('\n');
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Default') },
  { name: 'ShorthandPositions', Preview: createGuideExample(ShorthandPositions, 'Shorthand positions') },
  { name: 'CoverTarget', Preview: createGuideExample(CoverTarget, 'Cover target') },
  { name: 'OffsetValue', Preview: createGuideExample(OffsetValue, 'Offset value') },
  { name: 'OffsetFunction', Preview: createGuideExample(OffsetFunction, 'Offset function') },
  { name: 'AnchorToTarget', Preview: createGuideExample(AnchorToTarget, 'Anchor to target') },
  { name: 'ImperativeAnchorTarget', Preview: createGuideExample(ImperativeAnchorTarget, 'Imperative anchor target') },
  {
    name: 'ImperativePositionUpdate',
    Preview: createGuideExample(ImperativePositionUpdate, 'Imperative position update'),
  },
  { name: 'OverflowBoundary', Preview: createGuideExample(OverflowBoundary, 'Overflow boundary') },
  { name: 'OverflowBoundaryRect', Preview: createGuideExample(OverflowBoundaryRect, 'Overflow boundary rectangle') },
  {
    name: 'OverflowBoundaryPadding',
    Preview: createGuideExample(OverflowBoundaryPadding, 'Overflow boundary padding'),
  },
  { name: 'FlipBoundary', Preview: createGuideExample(FlipBoundary, 'Flip boundary') },
  { name: 'MatchTargetSize', Preview: createGuideExample(MatchTargetSize, 'Match target size') },
  { name: 'DisableTransform', Preview: createGuideExample(DisableTransform, 'Disable transform') },
  { name: 'ListenToUpdates', Preview: createGuideExample(ListenToUpdates, 'Listen to updates') },
  {
    name: 'AutoSizeForSmallViewport',
    Preview: createGuideExample(AutoSizeForSmallViewport, 'Auto size for small viewport'),
  },
  {
    name: 'CoverTargetForSmallViewport',
    Preview: createGuideExample(CoverTargetForSmallViewport, 'Cover target for small viewport'),
  },
  { name: 'FallbackPositions', Preview: createGuideExample(FallbackPositions, 'Fallback positions') },
];
