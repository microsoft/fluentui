import * as React from 'react';
import { Keytip } from '../Keytip';

export interface IKeytipBasicExampleState {
}

export class KeytipBasicExample extends React.Component<{}, IKeytipBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Keytip
          content={ 'A' }
        />
      </div>
    );
  }
}