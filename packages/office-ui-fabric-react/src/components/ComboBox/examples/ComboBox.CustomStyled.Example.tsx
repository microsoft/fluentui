import * as React from 'react';
import { ComboBox, IComboBoxOption, SelectableOptionMenuItemType, Fabric, mergeStyles } from 'office-ui-fabric-react/lib/index';

const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});

export class ComboBoxCustomStyledExample extends React.Component<any, any> {
  private _optionsWithCustomStyling: IComboBoxOption[];
  private _optionsForCustomRender: IComboBoxOption[];

  private _fontMapping: { [fontName: string]: string } = {
    ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ['Times New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
    ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif'
  };

  constructor(props: any) {
    super(props);

    const fonts = Object.keys(this._fontMapping);

    // Options for first example
    this._optionsWithCustomStyling = fonts.map((fontName: string) => ({
      key: fontName,
      text: fontName,
      styles: {
        optionText: {
          // This will cause the options to render with the given font
          fontFamily: this._fontMapping[fontName]
        }
      }
    }));

    // Options for second example
    this._optionsForCustomRender = [
      // Default font options are listed under this heading
      { key: 'header1', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
      ...fonts.map((fontName: string) => ({ key: fontName, text: fontName })),
      { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
      // User-added font options will be listed under this heading
      { key: 'header2', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header }
    ];
  }

  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          defaultSelectedKey="Calibri"
          label="Custom styled ComboBox"
          options={this._optionsWithCustomStyling}
          styles={{
            container: {
              maxWidth: '300px'
            },
            // Light purple input background
            root: {
              backgroundColor: '#b4a0ff'
            },
            input: {
              backgroundColor: '#b4a0ff'
            }
          }}
          caretDownButtonStyles={{
            // Purple caret button with white text on hover or press
            rootHovered: {
              color: 'white',
              backgroundColor: '#5c2d91'
            },
            rootChecked: {
              color: 'white',
              backgroundColor: '#5c2d91'
            },
            rootCheckedHovered: {
              color: 'white',
              backgroundColor: '#32145a'
            }
          }}
          comboBoxOptionStyles={{
            optionText: {
              fontFamily: 'initial' // this should be overriden by custom styles for each option
            }
          }}
        />

        <ComboBox
          defaultSelectedKey="Calibri"
          label="ComboBox with custom option rendering (type the name of a font and the option will render in that font)"
          allowFreeform={true}
          autoComplete="on"
          options={this._optionsForCustomRender}
          onRenderOption={this._onRenderOption}
        />
      </Fabric>
    );
  }

  /**
   * Render function for non-header/divider options in the second example.
   */
  private _onRenderOption = (item: IComboBoxOption): JSX.Element => {
    if (item.itemType === SelectableOptionMenuItemType.Header || item.itemType === SelectableOptionMenuItemType.Divider) {
      return <span>{item.text}</span>;
    }

    let fontFamily = this._fontMapping[item.text];

    if (!fontFamily) {
      // This is a new user-entered font. Add a font family definition for it.
      const newFontName = item.text;
      fontFamily = this._fontMapping[newFontName] = `"${newFontName}","Segoe UI",Tahoma,Sans-Serif`;
    }

    return <span style={{ fontFamily: fontFamily }}>{item.text}</span>;
  };
}
