import * as React from 'react';
import { IKeytipProps, Keytip } from '@uifabric/experiments/lib/Keytip';
import { convertSequencesToKeytipID } from '../../../utilities/keysequence/IKeySequence';
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
      keySequences: [{ keys: ['b'] }],
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
          data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Keytip1.keySequences) }
          onClick={ btnClick }
        />
        <Keytip
          content={ this.keytipMap.Keytip1.content }
          keySequences={ this.keytipMap.Keytip1.keySequences }
          visible={ this.state.keytipVisible }
          disabled={ this.keytipMap.Keytip1.disabled }
        />
      </div>
    );
  }
}