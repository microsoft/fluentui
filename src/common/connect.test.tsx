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
interface IHelloStore {
  message: string;

  say(message: string): void;
}

class HelloStore extends BaseStore implements IHelloStore {
  public message: string = '';

  public say(message) {
    this.message = message;
    this.emitChange();
  }
}

describe('connect', () => {
  it('can observe store changes', () => {
    let localStores: any = {
      'hello1': new HelloStore(),
      'hello2': new HelloStore()
    };

    let Connected = connect(
      TestComponent,
      ['hello1', 'hello2'],
      (props: ITestComponentProps, hello1: IHelloStore, hello2: IHelloStore) => ({
        children: hello1.message + hello2.message
      } as ITestComponentProps)
    );
    let root = ReactTestUtils.renderIntoDocument(
      <div>
        <StoreHost stores={ localStores }>
          <Connected />
        </StoreHost>
      </div>
    );
    let rootElement = ReactDOM.findDOMNode(root);

    expect(rootElement.textContent).equals('');

    localStores.hello1.say('hello');
    expect(rootElement.textContent).equals('hello');

    localStores.hello2.say(' world');
    expect(rootElement.textContent).equals('hello world');
  });

  it('can throw when requiring a store in an environment without stores', () => {
    let Connected = connect(
      TestComponent,
      ['hello'],
      () => { /* empty */ }
    );
    let threwException = false;

    try {
      ReactTestUtils.renderIntoDocument(
        <div>
          <Connected />
        </div>
      );
    } catch (e) { threwException = true; }

    expect(threwException).to.be.true;
  });

  it('can throw in an environment that does not contain the required store', () => {
    let Connected = connect(
      TestComponent,
      ['hello'],
      () => { /* empty */ }
    );
    let threwException = false;

    try {
      ReactTestUtils.renderIntoDocument(
        <StoreHost stores={{ /* empty */ }}>
          <div>
            <Connected />
          </div>
        </StoreHost>
      );
    } catch (e) { threwException = true; }

    expect(threwException).to.be.true;
  });

});
