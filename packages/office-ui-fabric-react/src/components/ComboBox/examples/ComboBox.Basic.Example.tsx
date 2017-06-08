import * as React from 'react';
import { ComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import './ComboBox.Basic.Example.scss';
import {
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/Utilities/selectableOption/SelectableOption.Props';

export class ComboBoxBasicExample extends React.Component<any, any> {
  private _testOptions =
  [{ key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Arial Black', fontFamily: '"Arial Black", "Arial Black_MSFontService", sans-serif' },
  { key: 'B', text: 'Time New Roman', fontFamily: '"Times New Roman", "Times New Roman_MSFontService", serif' },
  { key: 'C', text: 'Comic Sans MS', fontFamily: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy' },
  { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' },
  { key: 'H', text: 'Option h' },
  { key: 'I', text: 'Option i' },
  { key: 'J', text: 'Option j' },
  ];

  constructor() {
    super();
    this.state = {
      options: [],
      selectedOptionKey: null,
      value: 'Calibri'
    };
  }

  public render() {
    let { options, selectedOptionKey, value } = this.state;

    return (
      <div className='ms-ComboBoxBasicExample'>

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: T):'
          id='Basicdrop1'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete={ true }
          options={ this._testOptions }
        />

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: F):'
          id='Basicdrop2'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete={ false }
          options={ this._testOptions }
        />

        <ComboBox
          selectedKey='C'
          label='Basic uncontrolled example (allowFreeform: F, AutoComplete: T):'
          id='Basicdrop3'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ false }
          autoComplete={ true }
          options={ this._testOptions }
        />

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: F, AutoComplete: F):'
          id='Basicdrop4'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ false }
          autoComplete={ false }
          options={ this._testOptions }
        />

        <ComboBox
          label='Basic uncontrolled example:'
          id='Basicdrop5'
          ariaLabel='Basic ComboBox example'
          errorMessage='Error! Here is some text!'
          options={ this._testOptions }
        />

        <ComboBox
          label='Disabled uncontrolled example with defaultSelectedKey:'
          defaultSelectedKey='D'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
          disabled={ true }
        />

        <ComboBox
          selectedKey={ selectedOptionKey && selectedOptionKey }
          label='Basic controlled example:'
          id='Basicdrop5'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete={ true }
          options={ options }
          onChanged={ this._onChanged }
          onResolveOptions={ this._getOptions }
          value={ value && value }
        />
      </div>

    );
  }

  @autobind
  private _getOptions(currentOptions: IComboBoxOption[]): IComboBoxOption[] {

    if (this.state.options.length > 0) {
      return this.state.options;
    }

    let newOptions =
      [
        { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
        { key: 'A', text: 'Arial Black', fontFamily: '"Arial Black", "Arial Black_MSFontService", sans-serif' },
        { key: 'B', text: 'Time New Roman', fontFamily: '"Times New Roman", "Times New Roman_MSFontService", serif' },
        { key: 'C', text: 'Comic Sans MS', fontFamily: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy' },
        { key: 'C1', text: 'Calibri', fontFamily: 'Calibri, Calibri_MSFontService, sans-serif' },
        { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
        { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
        { key: 'D', text: 'Option d' },
        { key: 'E', text: 'Option e' },
        { key: 'F', text: 'Option f' },
        { key: 'G', text: 'Option g' },
        { key: 'H', text: 'Option h' },
        { key: 'I', text: 'Option i' },
        { key: 'J', text: 'Option j' }
      ];
    this.setState({
      options: newOptions,
      selectedOptionKey: 'C1',
      value: null
    });

    return newOptions;
  }

  @autobind
  private _optionsContainsKey(key: string): boolean {
    return false;
  }

  @autobind
  private _onChanged(option: IComboBoxOption, index: number, value: string) {
    if (option != null) {
      this.setState({
        selectedOptionKey: option.key,
        value: null
      });
    } else if (index != null && index >= 0 && index < this.state.options.length) {
      this.setState({
        selectedOptionKey: this.state.options[index].key,
        value: null
      });
    } else if (value !== null) {
      if (!this._optionsContainsKey(value)) {
        let newFontFamily: string = '';
        if (value.indexOf(' ') > -1) {
          newFontFamily = '"' + value + '"';
        } else {
          newFontFamily = value;
        }

        // add a default fallback font
        newFontFamily += ',"Segoe UI",Tahoma,Sans-Serif;';

        let newOption: IComboBoxOption = { key: value, text: value, fontFamily: newFontFamily };

        this.setState({
          options: [...this.state.options, newOption],
          selectedOptionKey: newOption.key,
          value: null
        });
      }
    }
  }
}
