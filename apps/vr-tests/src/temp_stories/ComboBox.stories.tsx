/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTallFixedWidth } from '../utilities';
import { ComboBox, SelectableOptionMenuItemType, ISelectableOption } from 'office-ui-fabric-react';

const testOptions = [
  { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Arial Black' },
  { key: 'B', text: 'Times New Roman' },
  { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
  { key: 'D', text: 'Option d' }
];

const fontMapping: { [key: string]: string } = {
  'Arial Black': '"Arial Black", "Arial Black_MSFontService", sans-serif',
  'Time New Roman': '"Times New Roman", "Times New Roman_MSFontService", serif'
};

const onRenderFontOption = (item: ISelectableOption) => {
  if (
    item.itemType === SelectableOptionMenuItemType.Header ||
    item.itemType === SelectableOptionMenuItemType.Divider
  ) {
    return <span>{item.text}</span>;
  }

  let fontFamily = fontMapping[item.text];

  if (!fontFamily) {
    // This is a new user-entered font. Add a font family definition for it.
    const newFontName = item.text;
    fontFamily = fontMapping[newFontName] = `"${newFontName}","Segoe UI",Tahoma,Sans-Serif`;
  }

  return <span style={{ fontFamily: fontFamily }}>{item.text}</span>;
};

storiesOf('ComboBox', module)
  .addDecorator(FabricDecoratorTallFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-ComboBox-Input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('click', { cropTo: '.ms-Layer' }) // Dropdown extends beyond testWrapper
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <ComboBox
        defaultSelectedKey="A"
        label="Default with dividers"
        autoComplete="on"
        options={testOptions}
      />
    ),
    { rtl: true }
  )
  .addStory('Styled', () => (
    <ComboBox
      defaultSelectedKey="A"
      label="Styled with dividers"
      autoComplete="on"
      options={testOptions}
      onRenderOption={onRenderFontOption}
    />
  ))
  .addStory('Disabled', () =>
    // prettier-ignore
    <ComboBox
      defaultSelectedKey="A"
      label="Disabled"
      options={testOptions}
      disabled />
  )
  .addStory('Placeholder', () =>
    // prettier-ignore
    <ComboBox
      placeholder="Select an option"
      label="With a placeholder"
      options={testOptions} />
  );
