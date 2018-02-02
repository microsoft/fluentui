import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Keytip } from '../Keytip';

export interface IKeytipBasicExampleState {
}

export class KeytipBasicExample extends React.Component<{}, IKeytipBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    // <KeytipLayer id='layer-id' />
    return (
      <div>
        <DefaultButton text='123' />
        <DefaultButton text='456' />
        <DefaultButton text='789' />
        <Keytip
          content={ 'A' }
        />
      </div>
    );
  }
}