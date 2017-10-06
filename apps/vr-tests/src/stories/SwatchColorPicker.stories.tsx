/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { SwatchColorPicker } from 'office-ui-fabric-react';

let props = {
  columnCount: 4,
  cellShape: 'circle' as any,
  colorCells:
  [
    { id: 'a', label: 'green', color: '#00ff00' },
    { id: 'b', label: 'orange', color: '#ffa500' },
    { id: 'c', label: 'blue', color: '#0000ff' },
    { id: 'd', label: 'red', color: '#ff0000' }
  ]
};
storiesOf('SwatchColorPicker', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('ms-Button-flexContainer')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('ms-Button-flexContainer')
        .snapshot('mousedown', { cropTo: '.testWrapper' })
        .click('ms-Button-flexContainer')
        .hover('ms-Button-flexContainer')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Circle', () => (
    <SwatchColorPicker
      { ...props }
    />
  )).add('Square', () => (
    <SwatchColorPicker
      { ...props }
      cellShape='square'
    />
  )).add('Disabled', () => (
    <SwatchColorPicker
      { ...props }
      disabled
    />
  )).add('Multiple rows', () => (
    <SwatchColorPicker
      { ...props }
      columnCount={ 4 }
      colorCells={ props.colorCells.concat(props.colorCells) }
    />
  ));