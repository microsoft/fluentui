/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorTall, runStories } from '../utilities';
import { Callout, Link, DirectionalHint } from 'office-ui-fabric-react';

const calloutContent = (
  <p className='ms-CalloutExample-subText' id={'callout-description-1'}>
    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
</p>);

const defaultProps = {
  target: '#target',
  calloutWidth: 200
};

// tslint:disable:jsx-ban-props
const CalloutDecorator = story => (
  <div style={{ alignItems: 'center', width: '800px', height: '300px', display: 'flex', justifyContent: 'center' }}>
    <div id='target'>Width of callout is 200 unless otherwise noted</div>
    {story()}
  </div>
);

const CalloutScreenerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default')
      .end()
    }
  >
    {story()}
  </Screener>
);

const calloutStories = {
  decorators: [CalloutDecorator, FabricDecoratorTall, CalloutScreenerDecorator],
  stories: {
    'Root': () => (
      <Callout {...defaultProps} >
        {calloutContent}
      </Callout>
    ),
    'Bottom auto edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomAutoEdge} >
        {calloutContent}
      </Callout>
    ),
    'Bottom center': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomCenter} >
        {calloutContent}
      </Callout>
    ),
    'Bottom left edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomLeftEdge} >
        {calloutContent}
      </Callout>
    ),
    'Bottom right edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.bottomRightEdge} >
        {calloutContent}
      </Callout>
    ),
    'Left bottom edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.leftBottomEdge} >
        {calloutContent}
      </Callout>
    ),
    'Left center': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.leftCenter} >
        {calloutContent}
      </Callout>
    ),
    'Left top edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.leftTopEdge} >
        {calloutContent}
      </Callout>
    ),
    'Right bottom edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.rightBottomEdge} >
        {calloutContent}
      </Callout>
    ),
    'Right center': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.rightCenter} >
        {calloutContent}
      </Callout>
    ),
    'Right top edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.rightTopEdge} >
        {calloutContent}
      </Callout>
    ),
    'Top auto edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.topAutoEdge} >
        {calloutContent}
      </Callout>
    ),
    'Top center': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.topCenter} >
        {calloutContent}
      </Callout>
    ),
    'Top left edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.topLeftEdge} >
        {calloutContent}
      </Callout>
    ),
    'Top right edge': () => (
      <Callout {...defaultProps} directionalHint={DirectionalHint.topRightEdge} >
        {calloutContent}
      </Callout>
    ),
    'Beak 25': () => (
      <Callout {...defaultProps} beakWidth={25} >
        {calloutContent}
      </Callout>
    ),
    'Gap space 25': () => (
      <Callout {...defaultProps} gapSpace={25}>
        {calloutContent}
      </Callout>
    ),
    'No beak': () => (
      <Callout {...defaultProps} isBeakVisible={false} >
        {calloutContent}
      </Callout>
    ),
    'No callout width specified': () => (
      <Callout {...defaultProps} calloutWidth={undefined} >
        {calloutContent}
      </Callout>
    )
  }
};

runStories('Callout', calloutStories);