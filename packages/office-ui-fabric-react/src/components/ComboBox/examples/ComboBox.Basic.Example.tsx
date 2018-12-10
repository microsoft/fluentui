// @codepen
import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import './ComboBox.Example.scss';

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

// tslint:disable:jsx-no-lambda
export class ComboBoxBasicExample extends React.Component<
  {},
  {
    // Only used for the example with toggles (last one)
    autoComplete: boolean;
    allowFreeform: boolean;
  }
> {
  private _basicComboBox = React.createRef<IComboBox>();

  constructor(props: any) {
    super(props);
    this.state = {
      autoComplete: false,
      allowFreeform: true
    };
  }

  public render(): JSX.Element {
    const state = this.state;
    return (
      <Fabric className="ms-ComboBoxExample">
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
            className="openButton"
            text="Open ComboBox"
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
          label="ComboBox with error message"
          defaultSelectedKey="B"
          errorMessage="Oh no! This ComboBox has an error!"
          options={INITIAL_OPTIONS}
        />

        <ComboBox disabled label="Disabled ComboBox" defaultSelectedKey="D" options={INITIAL_OPTIONS} />

        <div className="ms-ComboBoxExample-toggles">
          <ComboBox
            label="ComboBox with toggleable freeform/auto-complete"
            key={'' + state.autoComplete + state.allowFreeform /*key causes re-render when toggles change*/}
            allowFreeform={state.allowFreeform}
            autoComplete={state.autoComplete ? 'on' : 'off'}
            options={INITIAL_OPTIONS}
          />
          <Toggle
            label="Allow freeform"
            checked={state.allowFreeform}
            onChange={(ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
              this.setState({ allowFreeform: !!checked });
            }}
          />
          <Toggle
            label="Auto-complete"
            checked={state.autoComplete}
            onChange={(ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
              this.setState({ autoComplete: !!checked });
            }}
          />
        </div>
      </Fabric>
    );
  }
}
