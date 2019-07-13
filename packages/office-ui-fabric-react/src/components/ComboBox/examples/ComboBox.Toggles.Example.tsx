import * as React from 'react';
import { ComboBox, Fabric, IComboBoxOption, mergeStyles, SelectableOptionMenuItemType, Toggle } from 'office-ui-fabric-react/lib/index';

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
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});

export interface IComboBoxTogglesExampleState {
  autoComplete: boolean;
  allowFreeform: boolean;
}

// tslint:disable:jsx-no-lambda
export class ComboBoxTogglesExample extends React.Component<{}, IComboBoxTogglesExampleState> {
  public state: IComboBoxTogglesExampleState = {
    autoComplete: false,
    allowFreeform: true
  };

  public render(): JSX.Element {
    const state = this.state;
    return (
      <Fabric className={wrapperClassName}>
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
      </Fabric>
    );
  }
}
