import * as React from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';

export class FluentStylesComboBoxExample extends React.Component<{}, {}> {
  private _testOptions = [
    {
      key: 'A',
      text: 'Arial Black',
      styles: {
        optionText: {
          fontFamily: '"Arial Black", "Arial Black_MSFontService", sans-serif'
        }
      }
    },
    {
      key: 'B',
      text: 'Times New Roman',
      styles: {
        optionText: {
          fontFamily: '"Times New Roman", "Times New Roman_MSFontService", serif'
        }
      }
    },
    {
      key: 'C',
      text: 'Comic Sans MS',
      styles: {
        optionText: {
          fontFamily: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy'
        }
      }
    },
    {
      key: 'D',
      text: 'Calibri',
      styles: {
        optionText: {
          fontFamily: 'Calibri, Calibri_MSFontService, sans-serif'
        }
      }
    }
  ];

  public render(): JSX.Element {
    return (
      <div className="ms-ComboBoxExample">
        <ComboBox
          defaultSelectedKey="C"
          label="Uncontrolled ComboBox (allowFreeform: T, AutoComplete: T):"
          id="Basicdrop6"
          ariaLabel="ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this._testOptions}
        />
      </div>
    );
  }
}
