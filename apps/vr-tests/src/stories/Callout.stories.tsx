/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Callout, Link, DirectionalHint } from 'office-ui-fabric-react';

let calloutContent = (
  <p className='ms-CalloutExample-subText' id={ 'callout-description-1' }>
    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
</p>);

let defaultProps = {
  target: '#target',
  calloutWidth: 200
};

// tslint:disable:jsx-ban-props
storiesOf('Callout', module)
  .addDecorator(story => (
    <div style={ { alignItems: 'center', width: '800px', height: '300px', display: 'flex', justifyContent: 'center' } }>
      <div id='target'>Width of callout is 200 unless otherwise noted</div>
      { story() }
    </div>
  ))
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Callout {...defaultProps} >
      { calloutContent }
    </Callout>
  )).add('Bottom auto edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.bottomAutoEdge } >
      { calloutContent }
    </Callout>
  )).add('Bottom center', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.bottomCenter } >
      { calloutContent }
    </Callout>
  )).add('Bottom left edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.bottomLeftEdge } >
      { calloutContent }
    </Callout>
  )).add('Bottom right edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.bottomRightEdge } >
      { calloutContent }
    </Callout>
  )).add('Left bottom edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.leftBottomEdge } >
      { calloutContent }
    </Callout>
  )).add('Left center', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.leftCenter } >
      { calloutContent }
    </Callout>
  )).add('Left top edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.leftTopEdge } >
      { calloutContent }
    </Callout>
  )).add('Right bottom edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.rightBottomEdge } >
      { calloutContent }
    </Callout>
  )).add('Right center', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.rightCenter } >
      { calloutContent }
    </Callout>
  )).add('Right top edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.rightTopEdge } >
      { calloutContent }
    </Callout>
  )).add('Top auto edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.topAutoEdge } >
      { calloutContent }
    </Callout>
  )).add('Top center', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.topCenter } >
      { calloutContent }
    </Callout>
  )).add('Top left edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.topLeftEdge } >
      { calloutContent }
    </Callout>
  )).add('Top right edge', () => (
    <Callout {...defaultProps} directionalHint={ DirectionalHint.topRightEdge } >
      { calloutContent }
    </Callout>
  )).add('Beak 25', () => (
    <Callout {...defaultProps} beakWidth={ 25 } >
      { calloutContent }
    </Callout>
  )).add('Gap space 25', () => (
    <Callout {...defaultProps} gapSpace={ 25 }>
      { calloutContent }
    </Callout>
  )).add('No beak', () => (
    <Callout {...defaultProps} isBeakVisible={ false } >
      { calloutContent }
    </Callout>
  )).add('No callout width specified', () => (
    <Callout {...defaultProps} calloutWidth={ undefined } >
      { calloutContent }
    </Callout>
  ));