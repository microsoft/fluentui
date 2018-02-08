import * as React from 'react';
import { IKeySequence } from '../../../utilities/keysequence';
import { Keytip } from '../Keytip';

export interface IKeytipBasicExampleState {
}

const keytipSequence: IKeySequence[] = [{ keys: ['a'] }];

export class KeytipBasicExample extends React.Component<{}, IKeytipBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Keytip
          keySequences={ keytipSequence }
          content={ 'A' }
        />
      </div>
    );
  }
}