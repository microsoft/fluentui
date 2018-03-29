import * as React from 'react';
import { IKeytipProps, Keytip } from 'office-ui-fabric-react/lib/Keytip';
import { convertSequencesToKeytipID } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IKeytipExampleState, onKeytipButtonClick } from './Keytip.Basic.Example';

export interface IKeytipMap {
  [componentKeytipId: string]: IKeytipProps;
}

export class KeytipDisabledExample extends React.Component<{}, IKeytipExampleState> {
  private keytipMap: IKeytipMap = {};

  constructor(props: {}) {
    super(props);

    this.state = {
      keytipVisible: false
    };

    // Setup keytips
    this.keytipMap.Keytip1 = {
      content: 'B',
      keySequences: ['b'],
      disabled: true
    } as IKeytipProps;
  }

  /* tslint:disable:jsx-ban-props */
  public render(): JSX.Element {
    const btnClick = onKeytipButtonClick.bind(this);
    return (
      <div>
        <p>A disabled keytip will be displayed when keytips are enabled, but the component will not
          be activated when its keys are pressed</p>
        <DefaultButton
          text='Click to toggle keytip'
          data-ktp-target={ convertSequencesToKeytipID(this.keytipMap.Keytip1.keySequences) }
          onClick={ btnClick }
        />
        <Keytip { ...this.keytipMap.Keytip1 } visible={ this.state.keytipVisible } />
      </div>
    );
  }
}