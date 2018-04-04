import * as React from 'react';
import { IKeytipProps, Keytip } from '../../Keytip';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { convertSequencesToKeytipID } from '../../../Utilities';

export interface IKeytipExampleState {
  keytipVisible: boolean;
}

export interface IKeytipMap {
  [componentKeytipId: string]: IKeytipProps;
}

export function onKeytipButtonClick(): void {
  this.setState((previousState: IKeytipExampleState) => {
    const currentKeytipVisible = !previousState.keytipVisible;
    return { keytipVisible: currentKeytipVisible };
  });
}

export class KeytipOffsetExample extends React.Component<{}, IKeytipExampleState> {
  private keytipMap: IKeytipMap = {};

  constructor(props: {}) {
    super(props);

    this.state = {
      keytipVisible: false,
    };

    this.keytipMap.Keytip1 = {
      content: 'X',
      keySequences: ['x'],
      offset: { x: 19, y: 17 }
    } as IKeytipProps;
  }

  /* tslint:disable:jsx-ban-props */
  public render(): JSX.Element {
    const btnClick = onKeytipButtonClick.bind(this);

    return (
      <div>
        <p>The offset property will align the keytip from the top-left corner of the element it's attached to</p>
        <DefaultButton
          text='Click to toggle offset keytip'
          data-ktp-target={ convertSequencesToKeytipID(this.keytipMap.Keytip1.keySequences) }
          onClick={ btnClick }
        />
        <Keytip { ...this.keytipMap.Keytip1 } visible={ this.state.keytipVisible } />
      </div>
    );
  }
}