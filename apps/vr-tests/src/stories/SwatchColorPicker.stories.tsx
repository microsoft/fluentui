/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { SwatchColorPicker, ISwatchColorPickerProps } from 'office-ui-fabric-react';

const props: ISwatchColorPickerProps = {
  columnCount: 4,
  cellShape: 'circle' as any,
  colorCells: [
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
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button-flexContainer')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button-flexContainer')
        .snapshot('mousedown', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Circle', () => <SwatchColorPicker {...props} />, { rtl: true })
  .addStory('Square', () => <SwatchColorPicker {...props} cellShape="square" />)
  .addStory('Disabled', () => <SwatchColorPicker {...props} disabled />)
  .addStory('Multiple rows', () => <SwatchColorPicker {...props} columnCount={4} colorCells={props.colorCells.concat(props.colorCells)} />);
