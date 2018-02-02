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
        <DefaultButton text='123' keytipProps={ { content: 'hello' } } />
        <DefaultButton text='456' keytipProps={ { content: 'hello too ' } } />
        <DefaultButton text='789' keytipProps={ { content: 'hello three ' } } />
        <Keytip
          content={ 'A' }
        />
      </div>
    );
  }
}