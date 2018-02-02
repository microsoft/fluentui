import * as React from 'react';
import { KeytipLayer } from '../KeytipLayer';

export interface IKeytipLayerBasicExampleState {
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    const keytipProps = [
      {
        content: 'hello',
        calloutProps: { target: '#testing-123' }
      },
      {
        content: 'hello2',
        calloutProps: { target: '#testing-456' }
      }
    ];

    // <KeytipLayer id={ 'basic-keytip-layer' } keytips={ keytipProps } />
    return (
      <div>
        <button id='testing-123'>123</button>
        <button id='testing-456'>456</button>
      </div>
    );
  }
}