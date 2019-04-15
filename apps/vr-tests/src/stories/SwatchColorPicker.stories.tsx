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
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')"
        )
        .executeScript("document.getElementsByClassName('ms-Button')[1].focus()")
        .snapshot('not selected focus', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('ms-Button')[1].blur()")
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('selected focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')"
        )
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Circle', () => <SwatchColorPicker {...props} />, { rtl: true })
  .addStory('Circle over 24px size', () => <SwatchColorPicker {...props} cellHeight={35} cellWidth={35} />)
  .addStory('Square', () => <SwatchColorPicker {...props} cellShape="square" />)
  .addStory('Square over 24px size', () => <SwatchColorPicker {...props} cellShape="square" cellHeight={35} cellWidth={35} />)
  .addStory('Disabled', () => <SwatchColorPicker {...props} disabled />)
  .addStory('Multiple rows', () => <SwatchColorPicker {...props} columnCount={4} colorCells={props.colorCells.concat(props.colorCells)} />);
