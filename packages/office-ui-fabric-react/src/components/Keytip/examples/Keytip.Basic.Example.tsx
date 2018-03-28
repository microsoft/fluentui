import * as React from 'react';
import { IKeytipProps, Keytip } from 'office-ui-fabric-react/lib/Keytip';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { convertSequencesToKeytipID } from 'office-ui-fabric-react/lib/Utilities';

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

export class KeytipBasicExample extends React.Component<{}, IKeytipExampleState> {
  private keytipMap: IKeytipMap = {};

  constructor(props: {}) {
    super(props);

    this.state = {
      keytipVisible: false,
    };

    // Setup keytips
    this.keytipMap.Keytip1 = {
      content: 'A',
      keySequences: [{ keys: ['a'] }],
    } as IKeytipProps;
  }

  /* tslint:disable:jsx-ban-props */
  public render(): JSX.Element {
    const btnClick = onKeytipButtonClick.bind(this);

    return (
      <div>
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