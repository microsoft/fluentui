// NOTE: filename is prefixed with z_ to make callout tests run last to avoid instability
import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Callout, DirectionalHint, ICalloutProps } from '@fluentui/react';
import { getStoryVariant, RTL, StoryWrightDecorator } from '../utilities';

const calloutContent = (
  <p className="ms-CalloutExample-subText" id="callout-description-1">
    Message body is optional. If help documentation is available, consider adding a link to learn
    more at the bottom.
  </p>
);

const defaultProps: ICalloutProps = {
  target: '#target',
  calloutWidth: 200,

  // Try to stabilize tests by disabling layer and animation
  // TODO: investigate and re-enable
  doNotLayer: true,
  styles: {
    root: {
      animation: 'none',
    },
  },
};

export default {
  title: 'Callout',

  decorators: [
    story => (
      <div
        style={{
          alignItems: 'center',
          width: '800px',
          height: '800px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div id="target">Width of callout is 200 unless otherwise noted</div>
        {story()}
      </div>
    ),
    StoryWrightDecorator(new Steps().snapshot('default').end()),
  ],
} satisfies Meta<typeof Callout>;

export const Root = () => <Callout {...defaultProps}>{calloutContent}</Callout>;

export const BottomAutoEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.bottomAutoEdge}>
    {calloutContent}
  </Callout>
);

BottomAutoEdge.storyName = 'Bottom auto edge';

export const BottomCenter = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.bottomCenter}>
    {calloutContent}
  </Callout>
);

BottomCenter.storyName = 'Bottom center';

export const BottomLeftEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.bottomLeftEdge}>
    {calloutContent}
  </Callout>
);

BottomLeftEdge.storyName = 'Bottom left edge';

export const BottomLeftEdgeRTL = getStoryVariant(BottomLeftEdge, RTL);

export const BottomRightEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.bottomRightEdge}>
    {calloutContent}
  </Callout>
);

BottomRightEdge.storyName = 'Bottom right edge';

export const BottomRightEdgeRTL = getStoryVariant(BottomRightEdge, RTL);

export const LeftBottomEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.leftBottomEdge}>
    {calloutContent}
  </Callout>
);

LeftBottomEdge.storyName = 'Left bottom edge';

export const LeftCenter = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.leftCenter}>
    {calloutContent}
  </Callout>
);

LeftCenter.storyName = 'Left center';

export const LeftTopEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.leftTopEdge}>
    {calloutContent}
  </Callout>
);

LeftTopEdge.storyName = 'Left top edge';

export const RightBottomEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.rightBottomEdge}>
    {calloutContent}
  </Callout>
);

RightBottomEdge.storyName = 'Right bottom edge';

export const RightCenter = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.rightCenter}>
    {calloutContent}
  </Callout>
);

RightCenter.storyName = 'Right center';

export const RightTopEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.rightTopEdge}>
    {calloutContent}
  </Callout>
);

RightTopEdge.storyName = 'Right top edge';

export const TopAutoEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.topAutoEdge}>
    {calloutContent}
  </Callout>
);

TopAutoEdge.storyName = 'Top auto edge';

export const TopCenter = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.topCenter}>
    {calloutContent}
  </Callout>
);

TopCenter.storyName = 'Top center';

export const TopLeftEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.topLeftEdge}>
    {calloutContent}
  </Callout>
);

TopLeftEdge.storyName = 'Top left edge';

export const TopRightEdge = () => (
  <Callout {...defaultProps} directionalHint={DirectionalHint.topRightEdge}>
    {calloutContent}
  </Callout>
);

TopRightEdge.storyName = 'Top right edge';

export const Beak25 = () => (
  <Callout {...defaultProps} beakWidth={25}>
    {calloutContent}
  </Callout>
);

export const GapSpace25 = () => (
  <Callout {...defaultProps} gapSpace={25}>
    {calloutContent}
  </Callout>
);

GapSpace25.storyName = 'Gap space 25';

export const NoBeak = () => (
  <Callout {...defaultProps} isBeakVisible={false}>
    {calloutContent}
  </Callout>
);

NoBeak.storyName = 'No beak';

export const NoCalloutWidthSpecified = () => (
  <Callout {...defaultProps} calloutWidth={undefined}>
    {calloutContent}
  </Callout>
);

NoCalloutWidthSpecified.storyName = 'No callout width specified';

export const RenderingCalloutAttachedToARectangle = () => {
  const rectangle = {
    left: 50,
    right: 150,
    top: 50,
    bottom: 100,
  };
  const divStyles: React.CSSProperties = {
    background: 'red',
    position: 'absolute',
    left: rectangle.left,
    top: rectangle.top,
    width: rectangle.right - rectangle.left,
    height: rectangle.bottom - rectangle.top,
  };

  return (
    <>
      <div style={divStyles} />
      <Callout {...defaultProps} target={rectangle}>
        {calloutContent}
      </Callout>
    </>
  );
};

RenderingCalloutAttachedToARectangle.storyName = 'Rendering callout attached to a rectangle';
