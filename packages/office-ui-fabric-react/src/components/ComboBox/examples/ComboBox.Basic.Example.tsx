// @codepen
import * as React from 'react';
import { ComboBox, IComboBoxOption, VirtualizedComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import './ComboBox.Basic.Example.scss';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import { IComboBox } from '../ComboBox.types';
import { PrimaryButton } from '../../../Button';

const INITIAL_OPTIONS = [
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

export class ComboBoxBasicExample extends React.Component<
  {},
  {
    // For controled single select
    options: IComboBoxOption[];
    selectedOptionKey?: string | number;
    value?: string;

    // For controled multi select
    optionsMulti: IComboBoxOption[];
    selectedOptionKeys?: string[];
    valueMulti?: string;
  }
> {
  private _testOptions = [
    { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
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
    { key: 'J', text: 'Option j', disabled: true }
  ];

  private _fontMapping: { [key: string]: string } = {
    ['Arial Black']: '"Arial Black", "Arial Black_MSFontService", sans-serif',
    ['Time New Roman']: '"Times New Roman", "Times New Roman_MSFontService", serif',
    ['Comic Sans MS']: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy',
    ['Calibri']: 'Calibri, Calibri_MSFontService, sans-serif'
  };

  private scaleOptions: IComboBoxOption[] = [];
  private _basicCombobox: IComboBox;

  constructor(props: {}) {
    super(props);
    this.state = {
      options: [],
      optionsMulti: [],
      selectedOptionKey: undefined,
      value: 'Calibri',
      valueMulti: 'Calibri'
    };

    for (let i = 0; i < 1000; i++) {
      this.scaleOptions.push({
        key: `${i}`,
        text: `Option ${i}`
      });
    }
    this.scaleOptions.push({ key: '1000', text: 'Very Very Very Very long option' });
  }

  public render(): JSX.Element {
    const { options, selectedOptionKey, value } = this.state;
    const { optionsMulti } = this.state;

    return (
      <div className="ms-ComboBoxBasicExample">
        <ComboBox
          defaultSelectedKey="C"
          label="Basic uncontrolled example (allowFreeform: T, AutoComplete: T):"
          id="Basicdrop1"
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          componentRef={this._basicComboBoxComponentRef}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          onPendingValueChanged={(option, pendingIndex, pendingValue) =>
            console.log('Preview value was changed. Pending index: ' + pendingIndex + '. Pending value: ' + pendingValue)
          }
          // tslint:enable:jsx-no-lambda
        />

        <PrimaryButton text="Set focus" onClick={this._basicComboBoxOnClick} />

        <ComboBox
          multiSelect
          defaultSelectedKey={['C', 'E']}
          label="Basic uncontrolled multi select example (allowFreeform: T, AutoComplete: T):"
          id="Basicdrop11"
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          defaultSelectedKey="C"
          label="Basic uncontrolled example (allowFreeform: T, AutoComplete: F):"
          id="Basicdrop2"
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="off"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          selectedKey="C"
          label="Basic uncontrolled example (allowFreeform: F, AutoComplete: T):"
          id="Basicdrop3"
          ariaLabel="Basic ComboBox example"
          allowFreeform={false}
          autoComplete="on"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        <VirtualizedComboBox
          defaultSelectedKey="C"
          label="Scaled example with 1000 items (allowFreeform: T, AutoComplete: T):"
          id="Basicdrop1"
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this.scaleOptions}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          onPendingValueChanged={(option, pendingIndex, pendingValue) =>
            console.log('Preview value was changed. Pending index: ' + pendingIndex + '. Pending value: ' + pendingValue)
          }
          // tslint:enable:jsx-no-lambda
          dropdownMaxWidth={200}
          useComboBoxAsMenuWidth={true}
        />

        <VirtualizedComboBox
          defaultSelectedKey="C"
          label="Scaled example with 1000 items (allowFreeform: T, AutoComplete: T):"
          id="Basicdrop1"
          ariaLabel="Basic ComboBox example"
          allowFreeform={true}
          autoComplete="on"
          options={this.scaleOptions}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          onPendingValueChanged={(option, pendingIndex, pendingValue) =>
            console.log('Preview value was changed. Pending index: ' + pendingIndex + '. Pending value: ' + pendingValue)
          }
          // tslint:enable:jsx-no-lambda
          dropdownMaxWidth={400}
          useComboBoxAsMenuWidth={true}
        />

        <ComboBox
          defaultSelectedKey="C"
          label="Basic uncontrolled example (allowFreeform: F, AutoComplete: F):"
          id="Basicdrop4"
          ariaLabel="Basic ComboBox example"
          allowFreeform={false}
          autoComplete="off"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          label="Basic uncontrolled example:"
          id="Basicdrop5"
          ariaLabel="Basic ComboBox example"
          errorMessage="Error! Here is some text!"
          options={this._testOptions}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        <ComboBox
          label="Disabled uncontrolled example with defaultSelectedKey:"
          defaultSelectedKey="D"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
          disabled={true}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />

        {value ? (
          <ComboBox
            label="Basic controlled example:"
            id="Basicdrop5"
            ariaLabel="Basic ComboBox example"
            allowFreeform={true}
            autoComplete="on"
            options={options}
            onChange={this._onChange}
            onResolveOptions={this._getOptions}
            text={value && value}
            onRenderOption={this._onRenderFontOption}
            // tslint:disable:jsx-no-lambda
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            onMenuOpen={() => console.log('ComboBox menu opened')}
            // tslint:enable:jsx-no-lambda
          />
        ) : (
          <ComboBox
            selectedKey={selectedOptionKey && selectedOptionKey}
            label="Basic controlled example:"
            id="Basicdrop5"
            ariaLabel="Basic ComboBox example"
            allowFreeform={true}
            autoComplete="on"
            options={options}
            onChange={this._onChange}
            onResolveOptions={this._getOptions}
            onRenderOption={this._onRenderFontOption}
            // tslint:disable:jsx-no-lambda
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            onMenuOpen={() => console.log('ComboBox menu opened')}
            // tslint:enable:jsx-no-lambda
          />
        )}

        <ComboBox
          multiSelect
          selectedKey={this.state.selectedOptionKeys}
          label="Basic controlled ComboBox multi-select example:"
          id="Basicdrop5"
          ariaLabel="Basic controlled ComboBox multi-select example"
          allowFreeform={true}
          autoComplete="on"
          options={optionsMulti}
          onChange={this._onChangeMulti}
          onResolveOptions={this._getOptionsMulti}
          onRenderOption={this._onRenderFontOption}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onMenuOpen={() => console.log('ComboBox menu opened')}
          // tslint:enable:jsx-no-lambda
        />
      </div>
    );
  }

  // Render content of item
  private _onRenderFontOption = (item: IComboBoxOption): JSX.Element => {
    if (item.itemType === SelectableOptionMenuItemType.Header || item.itemType === SelectableOptionMenuItemType.Divider) {
      return <span className={'ms-ComboBox-optionText'}>{item.text}</span>;
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

    return (
      <span className={'ms-ComboBox-optionText'} style={{ fontFamily: fontFamily && fontFamily }}>
        {item.text}
      </span>
    );
  };

  private _getOptions = (currentOptions: IComboBoxOption[]): IComboBoxOption[] => {
    if (this.state.options.length > 0) {
      return this.state.options;
    }

    this.setState({
      options: INITIAL_OPTIONS,
      selectedOptionKey: 'C1',
      value: undefined
    });

    return INITIAL_OPTIONS;
  };

  private _getOptionsMulti = (currentOptions: IComboBoxOption[]): IComboBoxOption[] => {
    if (this.state.optionsMulti.length > 0) {
      return this.state.optionsMulti;
    }

    this.setState({
      optionsMulti: INITIAL_OPTIONS,
      selectedOptionKeys: ['C1'],
      valueMulti: undefined
    });

    return INITIAL_OPTIONS;
  };

  private _onChange = (event: React.FormEvent<IComboBox>, option: IComboBoxOption, index: number, value: string): void => {
    console.log('_onChanged() is called: option = ' + JSON.stringify(option));
    if (option !== undefined) {
      this.setState({
        selectedOptionKey: option.key,
        value: undefined
      });
    } else if (index !== undefined && index >= 0 && index < this.state.options.length) {
      this.setState({
        selectedOptionKey: this.state.options[index].key,
        value: undefined
      });
    } else if (value !== undefined) {
      const newOption: IComboBoxOption = { key: value, text: value };

      this.setState({
        options: [...this.state.options, newOption],
        selectedOptionKey: newOption.key,
        value: undefined
      });
    }
  };

  private _onChangeMulti = (event: React.FormEvent<IComboBox>, option: IComboBoxOption, index: number, value: string) => {
    console.log('_onChangeMulti() is called: option = ' + JSON.stringify(option));
    if (option !== undefined) {
      // User selected/de-selected an existing option
      this.setState({
        selectedOptionKeys: this._updateSelectedOptionKeys(this.state.selectedOptionKeys || [], option),
        valueMulti: undefined
      });
    } else if (value !== undefined) {
      // User typed a freeform option
      const newOption: IComboBoxOption = { key: value, text: value };
      const updatedSelectedKeys: string[] = this.state.selectedOptionKeys
        ? [...this.state.selectedOptionKeys, newOption.key as string]
        : [newOption.key as string];
      this.setState({
        optionsMulti: [...this.state.optionsMulti, newOption],
        selectedOptionKeys: updatedSelectedKeys,
        valueMulti: undefined
      });
    }
  };

  private _updateSelectedOptionKeys = (selectedKeys: string[], option: IComboBoxOption): string[] => {
    if (selectedKeys && option) {
      const index = selectedKeys.indexOf(option.key as string);
      if (option.selected && index < 0) {
        selectedKeys.push(option.key as string);
      } else {
        selectedKeys.splice(index, 1);
      }
    }
    return selectedKeys;
  };

  private _basicComboBoxOnClick = (): void => {
    this._basicCombobox.focus(true);
  };

  private _basicComboBoxComponentRef = (component: IComboBox): void => {
    this._basicCombobox = component;
  };
}
