import * as React from 'react';
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  Fabric,
  mergeStyles,
} from 'office-ui-fabric-react/lib/index';

const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' },
  },
});

const fontMapping: { [fontName: string]: string } = {
  ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
  ['Times New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
  ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
  ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif',
};

const fonts = Object.keys(fontMapping);

const ComboBoxCustomStyledExampleStyles = {
  container: {
    maxWidth: '300px',
  },
  root: {
    backgroundColor: '#b4a0ff',
  },
  input: {
    backgroundColor: '#b4a0ff',
  },
};

const optionsWithCustomStyling: IComboBoxOption[] = fonts.map((fontName: string) => ({
  key: fontName,
  text: fontName,
  styles: {
    optionText: {
      fontFamily: fontMapping[fontName],
    },
  },
}));

const optionsForCustomRender: IComboBoxOption[] = [
  { key: 'header1', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  ...fonts.map((fontName: string) => ({ key: fontName, text: fontName })),
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'header2', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
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

export const ComboBoxCustomStyledExample: React.FC = () => (
  <Fabric className={wrapperClassName}>
    <ComboBox
      defaultSelectedKey="Calibri"
      label="Custom styled ComboBox"
      options={optionsWithCustomStyling}
      styles={ComboBoxCustomStyledExampleStyles}
    />
    <ComboBox
      defaultSelectedKey="Calibri"
      label={'ComboBox with custom option rendering (type the name of a font and the option will render in that font)'}
      allowFreeform
      autoComplete="on"
      options={optionsForCustomRender}
      onRenderOption={onRenderOption}
    />
  </Fabric>
);
