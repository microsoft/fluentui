import * as React from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxProps,
  IComboBoxOption,
  VirtualizedComboBox
} from 'office-ui-fabric-react/lib/ComboBox';
import {
  DefaultButton,
  IButton
} from 'office-ui-fabric-react/lib/Button';
import './ComboBox.Basic.Example.scss';
import {
  assign,
  autobind,
  KeyCodes
} from 'office-ui-fabric-react/lib/Utilities';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';

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
    { key: 'J', text: 'Option j', disabled: true },
    ];

  private _fontMapping: { [key: string]: string } = {
    ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ['Time New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
    ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif'
  };

  private scaleOptions: IComboBoxOption[] = [];
  private IButtonRef: IButton;  /* FOR TEST ONLY   */
  private IButtonRefFocus: IButton;  /* FOR TEST ONLY   */
  private IComboBoxRef: IComboBox;  /* FOR TEST ONLY   */
  private selectLowerContent: boolean = false; /* FOR TEST ONLY   */

  constructor() {
    super();
    this.state = {
      options: [],
      selectedOptionKey: null,
      value: 'Calibri'
    };

    for (let i = 0; i < 1000; i++) {
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
        {/* FOR TEST ONLY START   */ }

        <ComboBox
          componentRef={ this.setComponentRef }
          defaultSelectedKey='C'
          label='TEST 1: With all fixes (works)'
          id='Basicdrop11'
          ariaLabel='Basic ComboBox example'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          onFocus={ this.onFocus }
          onKeyDown={ this.onKeyDown }
          onRenderLowerContent={ this.lowerContent }
          preventInputFocus={ this.state.preventFocus }
        />

        <ComboBox
          defaultSelectedKey='C'
          label='TEST 2: Without fixes  (not working)'
          id='Basicdrop12'
          ariaLabel='Basic ComboBox example'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          onRenderLowerContent={ this.lowerContentBasic }
        />

        <ComboBox
          componentRef={ this.setComponentRefButtonFocus }
          defaultSelectedKey='C'
          label='TEST 3: Add focus to button only (not working)'
          id='Basicdrop13'
          ariaLabel='Basic ComboBox example'
          options={ this._testOptions }
          onRenderOption={ this._onRenderFontOption }
          onKeyDown={ this.onKeyDownFocus }
          onRenderLowerContent={ this.lowerContentFocus }
        />

        <hr style={ { marginBottom: '100px' } } />

        {/* FOR TEST ONLY END  */ }

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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
        // tslint:enable:jsx-no-lambda
        />

        <VirtualizedComboBox
          defaultSelectedKey='C'
          label='Scaled example with 1000 items (allowFreeform: T, AutoComplete: T):'
          id='Basicdrop1'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='on'
          options={ this.scaleOptions }
          // tslint:disable:jsx-no-lambda
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
          onMenuOpen={ () => console.log('ComboBox menu opened') }
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
            onMenuOpen={ () => console.log('ComboBox menu opened') }
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
            onMenuOpen={ () => console.log('ComboBox menu opened') }
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

  /* FOR TEST ONLY START  */

  private setComponentRef = (component: IComboBox): void => {
    this.IComboBoxRef = component;
  }

  private setComponentRefButton = (component: IButton): void => {
    this.IButtonRef = component;
  }

  private setComponentRefButtonFocus = (component: IButton): void => {
    this.IButtonRefFocus = component;
  }

  private lowerContentBasic = () => {
    return (
      <DefaultButton
        className={ 'customButton' }
        data-automation-id='customButton'
        text='Custom'
        ariaLabel='Custom'
        // tslint:disable:jsx-no-lambda
        onClick={ () => console.log('onClick called') }
      // tslint:disable:jsx-no-lambda
      />
    );
  }

  private lowerContent = () => {
    return (
      <div onKeyDown={ this.onKeyDownLowerContent }>
        <DefaultButton
          componentRef={ this.setComponentRefButton }
          id={ 'customButton' }
          className={ 'customButton' }
          data-automation-id='customButton'
          text='Custom'
          ariaLabel='Custom'
          // tslint:disable:jsx-no-lambda
          onClick={ () => console.log('onClick called') }
          // tslint:disable:jsx-no-lambda
          aria-selected={ this.selectLowerContent }
          checked={ this.selectLowerContent }
        />
      </div>
    );
  }

  private lowerContentFocus = () => {
    return (
      <DefaultButton
        componentRef={ this.setComponentRefButtonFocus }
        className={ 'customButton' }
        data-automation-id='customButton'
        text='Custom'
        ariaLabel='Custom'
        // tslint:disable:jsx-no-lambda
        onClick={ () => console.log('onClick called') }
        // tslint:disable:jsx-no-lambda
        aria-selected={ this.selectLowerContent }
        checked={ this.selectLowerContent }
      />
    );
  }

  private onKeyDown = (event: React.KeyboardEvent<IComboBox>) => {

    // Tab-Back from comboBox input.  Focus on previous element (show code button)
    if (KeyCodes.tab && event.shiftKey) {
      // Prevent focus looping back around to custom button
      let inputField: any = document.getElementById('Basicdrop11-input');
      if (inputField === event.target) {
        this.IComboBoxRef.dismissMenu();
        this.selectLowerContent = false;
        this.setState({ preventFocus: false });
      }

      // Tab from comboBox input.  Focus on custom button
    } else if (KeyCodes.tab) {
      if (!this.props.onRenderLowerContent && document.getElementById('Basicdrop11-list')) {
        event.preventDefault();

        // Prevent menu from closing
        this.IComboBoxRef.dismissMenu(false);

        // Select custom button, prevent focus return to input
        this.selectLowerContent = true;
        this.IButtonRef.focus();
        this.setState({ preventFocus: true });
      }
    }

  }

  private onKeyDownFocus = (event: React.KeyboardEvent<IComboBox>) => {
    // Tab from comboBox input.  Focus on custom button
    if (KeyCodes.tab) {
      if (!this.props.onRenderLowerContent && document.getElementById('Basicdrop13-list')) {
        event.preventDefault();

        // Select custom button
        this.selectLowerContent = true;
        this.IButtonRefFocus.focus();
      }
    }

  }

  private onFocus = () => {
    if (this.selectLowerContent) {
      this.IButtonRef.focus();
      this.selectLowerContent = false;
    }
  }

  private onKeyDownLowerContent = (event: React.KeyboardEvent<HTMLDivElement>) => {

    // Tab-Back from custom button.  Focus on current comboBox input
    if (event.keyCode === 9 && event.shiftKey) {
      let customButton: any = document.getElementById('customButton');
      if (customButton === event.target) {
        event.preventDefault();

        this.selectLowerContent = false;
        this.setState({ preventFocus: false });
      }

      // Tab from custom button.  Focus on next comboBox input
    } else if (event.keyCode === 9) {
      let customButton: any = document.getElementById('customButton');
      if (customButton === event.target) {
        this.IComboBoxRef.dismissMenu();
        this.selectLowerContent = false;
        this.setState({ preventFocus: false });
      }
    }
  }

  /* FOR TEST ONLY END  */
}
