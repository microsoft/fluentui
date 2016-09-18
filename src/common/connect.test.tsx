/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-addons-test-utils';
import { connect } from './connect';
import { BaseStore } from './BaseStore';
import { StoreHost } from './StoreHost';

let { expect } = chai;

interface ITestComponentProps extends React.HTMLProps<HTMLDivElement> { }

// Dumb component.
const TestComponent = (props: ITestComponentProps) => (
  <div { ...props } />
);

// Dumb store.
class HelloStore extends BaseStore {
  public message: string;

  public say(message) {
    this.message = message;
    this.emitChange();
  }
}

describe('connect', () => {
  it('can observe store changes', () => {
    let localStores = { hello: new HelloStore() };
    let Connected = connect(
      TestComponent,
      (props: ITestComponentProps, stores: any) => ({
        children: stores.hello.message
      } as ITestComponentProps),
      ['hello']);
    let root = ReactTestUtils.renderIntoDocument(
      <div>
        <StoreHost stores={ localStores }>
          <Connected />
        </StoreHost>
      </div>
    );
    let rootElement = ReactDOM.findDOMNode(root);

    expect(rootElement.textContent).equals('');

    localStores.hello.say('hello');

    expect(rootElement.textContent).equals('hello');
  });
});