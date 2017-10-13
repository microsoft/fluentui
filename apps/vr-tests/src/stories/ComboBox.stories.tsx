/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { ComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react';

let testOptions = [
  { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Arial Black' },
  { key: 'B', text: 'Times New Roman' },
  { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
  { key: 'D', text: 'Option d' },
];

let fontMapping = {
  ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
  ['Time New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
};

let onRenderFontOption = (item) => {
  if (item.itemType === SelectableOptionMenuItemType.Header ||
    item.itemType === SelectableOptionMenuItemType.Divider) {
    return <span className={ 'ms-ComboBox-optionText' }>{ item.text }</span>;
  }

  let fontFamily = fontMapping[item.text];

  if (fontFamily === null || fontFamily === undefined) {
    let newFontFamily: string = item.text;
    if (newFontFamily.indexOf(' ') > -1) {
      newFontFamily = '"' + newFontFamily + '"';
    }

    // add a default fallback font
    newFontFamily += ',"Segoe UI",Tahoma,Sans-Serif';

    fontMapping = { ...fontMapping, [fontFamily]: newFontFamily };
    fontFamily = newFontFamily;
  }

  // tslint:disable-next-line:jsx-ban-props
  return <span className={ 'ms-ComboBox-optionText' } style={ { fontFamily: fontFamily && fontFamily } }>{ item.text }</span>;
};

storiesOf('ComboBox', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-ComboBox-Input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('click', { cropTo: '.ms-Layer' }) // Dropdown extends beyond testWrapper
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <ComboBox
      defaultSelectedKey='A'
      label='Default with dividers'
      ariaLabel='Basic ComboBox example'
      autoComplete='on'
      options={ testOptions }
    />
  ))
  .add('Styled', () => (
    <ComboBox
      defaultSelectedKey='A'
      label='Styled with dividers'
      ariaLabel='Basic ComboBox example'
      autoComplete='on'
      options={ testOptions }
      onRenderOption={ onRenderFontOption }
    />
  ))
  .add('Disabled', () => (
    <ComboBox
      defaultSelectedKey='A'
      label='Disabled'
      ariaLabel='Basic ComboBox example'
      autoComplete='on'
      options={ testOptions }
      disabled
    />
  ));
