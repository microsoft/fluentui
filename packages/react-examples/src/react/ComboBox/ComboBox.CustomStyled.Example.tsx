import * as React from 'react';
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  Stack,
  IStackTokens,
} from '@fluentui/react';

const fontMapping: { [fontName: string]: string } = {
  ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
  ['Times New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
  ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
  ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif',
  ['Some sort of script font with a really long name that should wrap']: 'script, fantasy, sans-serif',
};

const fonts = Object.keys(fontMapping);

const customStyles: Partial<IComboBoxStyles> = {
  // Note that this is actually the wrapper of the input and caret (doesn't include the label)
  root: {
    maxWidth: '300px',
    backgroundColor: '#b4a0ff',
  },
  input: {
    backgroundColor: '#b4a0ff',
  },
  optionsContainerWrapper: {
    maxWidth: '300px',
  },
};
const optionsWithCustomStyling: IComboBoxOption[] = fonts.map((fontName: string) => ({
  key: fontName,
  text: fontName,
  styles: {
    optionText: {
      fontFamily: fontMapping[fontName],
      overflow: 'visible',
      whiteSpace: 'normal',
    },
  },
}));

const optionsForCustomRender: IComboBoxOption[] = [
  {
    key: 'header1',
    text: 'Theme fonts',
    itemType: SelectableOptionMenuItemType.Header,
  },
  ...fonts.map((fontName: string) => ({ key: fontName, text: fontName })),
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  {
    key: 'header2',
    text: 'Other options',
    itemType: SelectableOptionMenuItemType.Header,
  },
];

const onRenderOption = (item: IComboBoxOption) => {
  switch (item.itemType) {
    case SelectableOptionMenuItemType.Header:
    case SelectableOptionMenuItemType.Divider:
      return <span>{item.text}</span>;

    default:
      let fontFamily = fontMapping[item.text];

      if (!fontFamily) {
        const newFontName = item.text;
        fontFamily = fontMapping[newFontName] = `"${newFontName}","Segoe UI",Tahoma,Sans-Serif`;
      }

      return <span style={{ fontFamily: fontFamily }}>{item.text}</span>;
  }
};

// Basic styling to make the example look nicer
const basicStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const ComboBoxCustomStyledExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <ComboBox
        defaultSelectedKey="Calibri"
        label="Custom styled ComboBox with wrapping option text"
        options={optionsWithCustomStyling}
        styles={customStyles}
      />
      <ComboBox
        defaultSelectedKey="Calibri"
        label="ComboBox with custom option rendering (type the name of a font and the option will render in that font)"
        allowFreeform
        autoComplete="on"
        options={optionsForCustomRender}
        onRenderOption={onRenderOption}
        styles={basicStyles}
      />
    </Stack>
  );
};
