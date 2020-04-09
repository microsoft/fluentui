import * as React from 'react';
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  Fabric,
  mergeStyles,
  IButtonStyles,
  IComboBoxStyles,
} from 'office-ui-fabric-react';

const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' },
  },
});

<<<<<<< HEAD
const fontMapping: { [fontName: string]: string } = {
  ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
  ['Times New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
  ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
  ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif',
};
=======
const comboBoxStyles: Partial<IComboBoxStyles> = {
  container: {
    maxWidth: '300px',
  },
  // Light purple input background
  root: {
    backgroundColor: '#b4a0ff',
  },
  input: {
    backgroundColor: '#b4a0ff',
  },
};

const caretDownButtonStyles: Partial<IButtonStyles> = {
  // Purple caret button with white text on hover or press
  rootHovered: {
    color: 'white',
    backgroundColor: '#5c2d91',
  },
  rootChecked: {
    color: 'white',
    backgroundColor: '#5c2d91',
  },
  rootCheckedHovered: {
    color: 'white',
    backgroundColor: '#32145a',
  },
};

export class ComboBoxCustomStyledExample extends React.Component<any, any> {
  private _optionsWithCustomStyling: IComboBoxOption[];
  private _optionsForCustomRender: IComboBoxOption[];
>>>>>>> fix styles prop in examples

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

<<<<<<< HEAD
const optionsWithCustomStyling: IComboBoxOption[] = fonts.map((fontName: string) => ({
  key: fontName,
  text: fontName,
  styles: {
    optionText: {
      fontFamily: fontMapping[fontName],
    },
  },
}));
=======
  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          defaultSelectedKey="Calibri"
          label="Custom styled ComboBox"
          options={this._optionsWithCustomStyling}
          styles={comboBoxStyles}
          caretDownButtonStyles={caretDownButtonStyles}
        />
>>>>>>> fix styles prop in examples

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
