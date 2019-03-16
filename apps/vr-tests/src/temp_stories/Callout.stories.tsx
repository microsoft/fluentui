/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Callout, DirectionalHint, ICalloutProps } from 'office-ui-fabric-react';

const calloutContent = (
  <p className="ms-CalloutExample-subText" id="callout-description-1">
    Message body is optional. If help documentation is available, consider adding a link to learn
    more at the bottom.
  </p>
);

const defaultProps: ICalloutProps = {
  target: '#target',
  calloutWidth: 200
};

storiesOf('Callout', module)
  .addDecorator(story => (
    <div
      style={{
        alignItems: 'center',
        width: '800px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div id="target">Width of callout is 200 unless otherwise noted</div>
      {story()}
    </div>
  ))
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default')
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Root', () =>
    // prettier-ignore
    <Callout {...defaultProps} >
      {calloutContent}
    </Callout>
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
    { rtl: true }
  )
  .addStory(
    'Bottom right edge',
    () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomRightEdge}>
        {calloutContent}
      </Callout>
    ),
    { rtl: true }
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
  ));
