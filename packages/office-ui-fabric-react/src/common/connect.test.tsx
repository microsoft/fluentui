/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-addons-test-utils';
import { connect } from './connect';
import { BaseStore } from './BaseStore';
import { StoreHost } from './StoreHost';
import { StoreSet } from './StoreSet';
import { storeKey } from './storeKey';
import { ISubscribable } from './ISubscribable';

let { expect } = chai;

interface ITestComponentProps extends React.HTMLAttributes<HTMLDivElement> { }

// Dumb component.
const TestComponent = (props: ITestComponentProps) => (
  <div { ...props } />
);

// Dumb store.
interface IHelloStore extends ISubscribable {
  message: string;

  say(message: string): void;
}

class HelloStore extends BaseStore implements IHelloStore {
  public message: string = '';

  public say(message: string) {
    this.message = message;
    this.emitChange();
  }
}

describe('connect', () => {
  it('can observe store changes', (done) => {
    let hello1 = storeKey('hello1');
    let hello2 = storeKey('hello2');
    let localStores = new StoreSet()
      .add(hello1, new HelloStore())
      .add(hello2, new HelloStore());

    let Connected = connect<ITestComponentProps, {}>(
      TestComponent,
      [hello1, hello2],
      (props: ITestComponentProps, hello1Store: IHelloStore, hello2Store: IHelloStore) => ({
        children: hello1Store.message + hello2Store.message
      })
    );
    let root = ReactTestUtils.renderIntoDocument(
      <div>
        <StoreHost stores={ localStores }>
          <Connected />
        </StoreHost>
      </div>
    );
    let rootElement = ReactDOM.findDOMNode(root as React.ReactInstance);

    expect(rootElement.textContent).equals('');

    localStores.getStore<IHelloStore>(hello1).say('hello');
    setTimeout(() => {
      try {
        expect(rootElement.textContent).equals('hello');
        localStores.getStore<IHelloStore>(hello2).say(' world');

        setTimeout(() => {
          try {
            expect(rootElement.textContent).equals('hello world');
            done();
          } catch (e) { done(e); }
        }, 10);

      } catch (e) { done(e); }
    }, 10);

  });

  it('can throw when requiring a store in an environment without any stores hosted', () => {
    let hello = storeKey('hello');
    let Connected = connect<ITestComponentProps, {}>(
      TestComponent,
      [hello],
      () => ({ /* empty */ })
    );
    let threwException = false;

    try {
      ReactTestUtils.renderIntoDocument(
        <div>
          <Connected />
        </div>
      );
    } catch (e) { threwException = true; }

    expect(threwException).equals(true);
  });

  it('can throw in an environment that does not contain the required store', () => {
    let hello = storeKey('hello');
    let Connected = connect<ITestComponentProps, {}>(
      TestComponent,
      [hello],
      () => ({ /* empty */ })
    );
    let threwException = false;

    try {
      ReactTestUtils.renderIntoDocument(
        <StoreHost stores={ new StoreSet() }>
          <div>
            <Connected />
          </div>
        </StoreHost>
      );
    } catch (e) { threwException = true; }

    expect(threwException).equals(true);
  });

  it('renders a connected component 1 time when multiple stores fire changes', (done) => {
    let resolves = 0;
    let renders = 0;

    const Dumb = () => {
      renders++;
      return <div>hi</div>;
    };

    let hello1 = storeKey('hello1');
    let hello2 = storeKey('hello2');
    let localStores = new StoreSet()
      .add(hello1, new HelloStore())
      .add(hello2, new HelloStore());
    let Connected = connect(
      Dumb,
      [hello1, hello2],
      () => {
        resolves++;
        return {};
      });

    ReactTestUtils.renderIntoDocument(
      <div>
        <StoreHost stores={ localStores }>
          <Connected />
        </StoreHost>
      </div>
    );

    expect(resolves).to.equal(1, 'resolve was not 1');
    expect(renders).to.equal(1, 'render was not 1');

    // Cause 2 store changes. This should setImmediate and cause 1 resolve.
    localStores.getStore<IHelloStore>(hello1).say('hello');
    localStores.getStore<IHelloStore>(hello2).say(' world');

    setTimeout(() => {
      try {
        expect(resolves).to.equal(2, 'resolve was not 2');
        expect(renders).to.equal(1, 'render was not 1');
        done();
      } catch (e) { done(e); }
    }, 10);
  });
});
