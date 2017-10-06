import * as React from 'react';
import {
  ComboBox,
  IComboBoxProps,
  IComboBoxOption
} from 'office-ui-fabric-react/lib/ComboBox';
import { List } from "office-ui-fabric-react/lib/List";
import './ComboBox.Basic.Example.scss';
import {
  assign,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.Props';

export class ComboBoxBasicExample extends React.Component<any, any> {
  private _testOptions =
  [{ key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Arial Black' },
  { key: 'B', text: 'Times New Roman' },
  { key: 'C', text: 'Comic Sans MS' },
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

  private _fontMapping: { [key: string]: string } = {
    ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ['Time New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
    ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif'
  };


  private scaleOptions: IComboBoxOption[] = [];

  constructor() {
    super();
    this.state = {
      options: [],
      selectedOptionKey: null,
      value: 'Calibri'
    };

    for (let i = 0; i < 10000; i++) {
      this.scaleOptions.push({
        key: `${i}`,
        text: `Option ${i}`
      });
    }
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
          autoComplete='on'
          options={ this.scaleOptions }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: T):'
          id='Basicdrop1'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='on'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />
        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: T):'
          id='Basicdrop1'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='on'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: F):'
          id='Basicdrop2'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='off'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          selectedKey='C'
          label='Basic uncontrolled example (allowFreeform: F, AutoComplete: T):'
          id='Basicdrop3'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ false }
          autoComplete='on'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: F, AutoComplete: F):'
          id='Basicdrop4'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ false }
          autoComplete='off'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          label='Basic uncontrolled example:'
          id='Basicdrop5'
          ariaLabel='Basic ComboBox example'
          errorMessage='Error! Here is some text!'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
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
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        // tslint:enable:jsx-no-lambda
        />

        { value ?
          <ComboBox
            label='Basic controlled example:'
            id='Basicdrop5'
            ariaLabel='Basic ComboBox example'
            allowFreeform={ true }
            autoComplete='on'
            options={ options }
            onChanged={ this._onChanged }
            onResolveOptions={ this._getOptions }
            value={ value && value }
            onRenderOption={ this._onRenderFontOption }
            // tslint:disable:jsx-no-lambda
            onFocus={ () => console.log('onFocus called') }
            onBlur={ () => console.log('onBlur called') }
          // tslint:enable:jsx-no-lambda
          />
          :
          <ComboBox
            selectedKey={ selectedOptionKey && selectedOptionKey }
            label='Basic controlled example:'
            id='Basicdrop5'
            ariaLabel='Basic ComboBox example'
            allowFreeform={ true }
            autoComplete='on'
            options={ options }
            onChanged={ this._onChanged }
            onResolveOptions={ this._getOptions }
            onRenderOption={ this._onRenderFontOption }
            // tslint:disable:jsx-no-lambda
            onFocus={ () => console.log('onFocus called') }
            onBlur={ () => console.log('onBlur called') }
          // tslint:enable:jsx-no-lambda
          />
        }
      </div>

    );
  }

  // Render content of item
  @autobind
  private _onRenderFontOption(item: IComboBoxOption): JSX.Element {

    if (item.itemType === SelectableOptionMenuItemType.Header ||
      item.itemType === SelectableOptionMenuItemType.Divider) {
      return <span className={ 'ms-ComboBox-optionText' }>{ item.text }</span>;
    }

    let fontFamily = this._fontMapping[item.text];

    if (fontFamily === null || fontFamily === undefined) {
      let newFontFamily: string = item.text;
      if (newFontFamily.indexOf(' ') > -1) {
        newFontFamily = '"' + newFontFamily + '"';
      }

      // add a default fallback font
      newFontFamily += ',"Segoe UI",Tahoma,Sans-Serif';

      this._fontMapping = assign({}, this._fontMapping, { [fontFamily as string]: newFontFamily });
      fontFamily = newFontFamily;
    }

    return <span className={ 'ms-ComboBox-optionText' } style={ { fontFamily: fontFamily && fontFamily } }>{ item.text }</span>;
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
  private _onChanged(option: IComboBoxOption, index: number, value: string) {
    if (option !== undefined) {
      this.setState({
        selectedOptionKey: option.key,
        value: null
      });
    } else if (index !== undefined && index >= 0 && index < this.state.options.length) {
      this.setState({
        selectedOptionKey: this.state.options[index].key,
        value: null
      });
    } else if (value !== undefined) {
      let newOption: IComboBoxOption = { key: value, text: value };

      this.setState({
        options: [...this.state.options, newOption],
        selectedOptionKey: newOption.key,
        value: null
      });
    }
  }
}
