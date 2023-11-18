// NOTE: filename is prefixed with z_ to make callout tests run last to avoid instability
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Callout, DirectionalHint, ICalloutProps } from '@fluentui/react';

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

storiesOf('Callout', module)
  .addDecorator(story => (
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
  ))
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () =>
    // prettier-ignore
    <Callout {...defaultProps} >
      {calloutContent}
    </Callout>,
  )
  .addStory('Bottom auto edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.bottomAutoEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Bottom center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.bottomCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory(
    'Bottom left edge',
    () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomLeftEdge}>
        {calloutContent}
      </Callout>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Bottom right edge',
    () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomRightEdge}>
        {calloutContent}
      </Callout>
    ),
    { includeRtl: true },
  )
  .addStory('Left bottom edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftBottomEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Left center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Left top edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.leftTopEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right bottom edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightBottomEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Right top edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.rightTopEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top auto edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topAutoEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top center', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topCenter}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top left edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topLeftEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Top right edge', () => (
    <Callout {...defaultProps} directionalHint={DirectionalHint.topRightEdge}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Beak 25', () => (
    <Callout {...defaultProps} beakWidth={25}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Gap space 25', () => (
    <Callout {...defaultProps} gapSpace={25}>
      {calloutContent}
    </Callout>
  ))
  .addStory('No beak', () => (
    <Callout {...defaultProps} isBeakVisible={false}>
      {calloutContent}
    </Callout>
  ))
  .addStory('No callout width specified', () => (
    <Callout {...defaultProps} calloutWidth={undefined}>
      {calloutContent}
    </Callout>
  ))
  .addStory('Rendering callout attached to a rectangle', () => {
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
  });
