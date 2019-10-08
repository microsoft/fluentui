import * as React from 'react';
import {
  ComboBox,
  Fabric,
  IComboBox,
  IComboBoxOption,
  IComboBoxProps,
  mergeStyles,
  PrimaryButton,
  SelectableOptionMenuItemType
} from 'office-ui-fabric-react/lib/index';

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

interface IComboBoxBasicExampleState {
  dynamicErrorValue: number | string;
}

// tslint:disable:jsx-no-lambda
export class ComboBoxBasicExample extends React.Component<{}, IComboBoxBasicExampleState> {
  private _basicComboBox = React.createRef<IComboBox>();

  constructor(props: {}) {
    super(props);
    this.state = {
      dynamicErrorValue: ''
    };
  }

  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <div>
          {/* This example demonstrates various props, but only `options` is required. */}
          <ComboBox
            defaultSelectedKey="C"
            label="Single-select ComboBox (uncontrolled, allowFreeform: T, autoComplete: T)"
            allowFreeform
            autoComplete="on"
            options={INITIAL_OPTIONS}
            componentRef={this._basicComboBox}
            onFocus={() => console.log('onFocus called for basic uncontrolled example')}
            onBlur={() => console.log('onBlur called for basic uncontrolled example')}
            onMenuOpen={() => console.log('ComboBox menu opened')}
            onPendingValueChanged={(option, pendingIndex, pendingValue) =>
              console.log(`Preview value was changed. Pending index: ${pendingIndex}. Pending value: ${pendingValue}.`)
            }
          />

          <PrimaryButton
            text="Open ComboBox"
            style={{ display: 'block', marginTop: '10px' }}
            onClick={() => {
              if (this._basicComboBox.current) {
                this._basicComboBox.current.focus(true);
              }
            }}
          />
        </div>

        <ComboBox
          multiSelect
          defaultSelectedKey={['C', 'E']}
          label="Multi-select ComboBox (uncontrolled)"
          allowFreeform
          autoComplete="on"
          options={INITIAL_OPTIONS}
        />

        <ComboBox
          label="ComboBox with placeholder text"
          placeholder="Select or type an option"
          allowFreeform
          autoComplete="on"
          options={INITIAL_OPTIONS}
        />

        <ComboBox
          label="ComboBox with persisted menu"
          defaultSelectedKey="B"
          allowFreeform
          autoComplete="on"
          persistMenu={true}
          options={INITIAL_OPTIONS}
        />

        <ComboBox
          label="ComboBox with static error message"
          defaultSelectedKey="B"
          errorMessage="Oh no! This ComboBox has an error!"
          options={INITIAL_OPTIONS}
        />

        <ComboBox
          label="ComboBox with dynamic error message"
          onChange={this._onChange}
          selectedKey={this.state.dynamicErrorValue}
          errorMessage={this._getErrorMessage(this.state.dynamicErrorValue)}
          options={INITIAL_OPTIONS}
        />

        <ComboBox disabled label="Disabled ComboBox" defaultSelectedKey="D" options={INITIAL_OPTIONS} />
      </Fabric>
    );
  }

  private _onChange: IComboBoxProps['onChange'] = (event, option) => {
    if (option) {
      this.setState({ dynamicErrorValue: option.key });
    }
  };

  private _getErrorMessage(value: number | string) {
    if (value === 'B') {
      return 'B is not an allowed option!';
    }
    return '';
  }
}
