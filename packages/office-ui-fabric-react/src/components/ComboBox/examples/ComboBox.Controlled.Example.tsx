import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox, SelectableOptionMenuItemType, Fabric, mergeStyles } from 'office-ui-fabric-react/lib/index';

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' }
];

const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});

export interface IComboBoxControlledExampleState {
  /** Current options for the single-select example */
  options: IComboBoxOption[];
  /** Current selected option for the single-select example */
  selectedOptionKey?: string | number;
  /**
   * Initial display value for the single-select example.
   * This will be cleared after the options are resolved for the first time.
   */
  initialDisplayValue?: string;

  /** Current options for the multi-select example */
  optionsMulti: IComboBoxOption[];
  /** Current selected options for the multi-select example */
  selectedOptionKeys?: string[];
  /**
   * Initial display value for the multi-select example.
   * This will be cleared after the options are resolved for the first time.
   */
  initialDisplayValueMulti?: string;
}

// tslint:disable:jsx-no-lambda
export class ComboBoxControlledExample extends React.Component<{}, IComboBoxControlledExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      // The options will be resolved (and updated in state) the first time each example is focused
      options: [],
      optionsMulti: [],
      // This is the text of the option which will be initially selected after the options are resolved
      initialDisplayValue: 'Option C',
      initialDisplayValueMulti: 'Option C, Option D'
    };
  }

  public render(): JSX.Element {
    const state = this.state;

    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          selectedKey={state.selectedOptionKey}
          label="Controlled single-select ComboBox (allowFreeform: T)"
          allowFreeform={true}
          autoComplete="on"
          options={state.options}
          onChange={this._onChange}
          onResolveOptions={this._getOptions}
          text={state.initialDisplayValue}
        />

        <ComboBox
          multiSelect
          selectedKey={state.selectedOptionKeys}
          label="Controlled multi-select ComboBox (allowFreeform: T)"
          allowFreeform={true}
          autoComplete="on"
          options={state.optionsMulti}
          onChange={this._onChangeMulti}
          onResolveOptions={this._getOptionsMulti}
          text={state.initialDisplayValueMulti}
        />
      </Fabric>
    );
  }

  private _getOptions = (currentOptions: IComboBoxOption[]): IComboBoxOption[] => {
    if (this.state.options.length > 0) {
      return this.state.options;
    }

    const options = [...INITIAL_OPTIONS];

    this.setState({
      options: options,
      selectedOptionKey: 'C',
      initialDisplayValue: undefined
    });

    return options;
  };

  private _getOptionsMulti = (currentOptions: IComboBoxOption[]): IComboBoxOption[] => {
    if (this.state.optionsMulti.length > 0) {
      return this.state.optionsMulti;
    }

    const options = [...INITIAL_OPTIONS];

    this.setState({
      optionsMulti: options,
      selectedOptionKeys: ['C', 'D'],
      initialDisplayValueMulti: undefined
    });

    return options;
  };

  private _onChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
    console.log('_onChanged() is called: option = ' + JSON.stringify(option));
    if (option) {
      // User chose an existing option
      this.setState({
        selectedOptionKey: option.key
      });
    } else if (value !== undefined) {
      // User typed a new option
      const newOption: IComboBoxOption = { key: value, text: value };

      this.setState({
        options: [...this.state.options, newOption],
        selectedOptionKey: newOption.key
      });
    }
  };

  private _onChangeMulti = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
    console.log('_onChangeMulti() is called: option = ' + JSON.stringify(option));
    const currentSelectedKeys = this.state.selectedOptionKeys || [];
    if (option) {
      // User selected/de-selected an existing option
      this.setState({
        selectedOptionKeys: this._updateSelectedOptionKeys(currentSelectedKeys, option)
      });
    } else if (value !== undefined) {
      // User typed a freeform option
      const newOption: IComboBoxOption = { key: value, text: value };
      const updatedSelectedKeys: string[] = [...currentSelectedKeys, newOption.key as string];
      this.setState({
        optionsMulti: [...this.state.optionsMulti, newOption],
        selectedOptionKeys: updatedSelectedKeys
      });
    }
  };

  private _updateSelectedOptionKeys = (selectedKeys: string[], option: IComboBoxOption): string[] => {
    selectedKeys = [...selectedKeys]; // modify a copy
    const index = selectedKeys.indexOf(option.key as string);
    if (option.selected && index < 0) {
      selectedKeys.push(option.key as string);
    } else {
      selectedKeys.splice(index, 1);
    }
    return selectedKeys;
  };
}
