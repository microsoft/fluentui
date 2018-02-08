import * as React from 'react';
import { IKeySequence, IKeytipTransitionSequence, convertSequencesToKeytipID } from '../../../utilities/keysequence';
import { KeytipLayer } from '../KeytipLayer';
import { KeytipManager } from '../KeytipManager';
import { IKeytipProps } from '../../Keytip';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IKeytipLayerBasicExampleState {
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  private keySequence: IKeySequence = { keys: ['a'] };
  private startingKeySequence: IKeytipTransitionSequence = { keys: [{ key: 'Alt' }] };

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton data-ktp-id={ convertSequencesToKeytipID([this.keySequence]) } text='Test Button' />
        <KeytipLayer keytipStartSequences={ [this.startingKeySequence] } id={ 'test-id' } />
      </div>
    );
  }

  public componentDidMount(): void {
    // Manually add keytips to the KeytipManager
    let ktpMngr: KeytipManager = KeytipManager.getInstance();
    let ktpID: string = convertSequencesToKeytipID([this.keySequence]);
    let ktpProps: IKeytipProps = {
      // TODO: do we have to include the ID if we include the keySequence
      // shouldn't it be calculated for us
      id: ktpID,
      content: 'A',
      keySequences: [this.keySequence],
      keytipTarget: '[data-ktp-id="' + ktpID + '"]'
    };
    ktpMngr.registerKeytip(ktpProps);
  }
}