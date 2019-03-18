// @codepen
import * as React from 'react';
import { ComboBox, Fabric, IComboBoxOption, mergeStyles } from 'office-ui-fabric-react/lib/index';

const INITIAL_OPTIONS: IComboBoxOption[] = [{ key: 'A', text: 'Option A' }, { key: 'B', text: 'Option B' }, { key: 'C', text: 'Option C' }];

const wrapperClassName = mergeStyles({
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});

export interface IComboBoxRequiredExampleState {
  requiredField: boolean;
}

// tslint:disable:jsx-no-lambda
export class ComboBoxRequiredExample extends React.Component<{}, IComboBoxRequiredExampleState> {
  public state: IComboBoxRequiredExampleState = {
    requiredField: true
  };

  public render(): JSX.Element {
    const state = this.state;
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          label="ComboBox with required input"
          key={'' + state.requiredField}
          options={INITIAL_OPTIONS}
          required={true}
          autoComplete="off"
        />
      </Fabric>
    );
  }
}
