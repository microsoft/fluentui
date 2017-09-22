/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { BaseComponent } from './BaseComponent';

let _originalOnError = BaseComponent.onError;

class TestComponent extends BaseComponent<{}, {}> {

  public componentWillMount(): void {
    this._createNullRef();
  }

  public componentDidMount(): void {
    this._createNullRef();
  }

  public shouldComponentUpdate(nextProps?: {}, nextState?: {}): boolean {
    this._createNullRef();

    return true;
  }

  public componentWillUpdate(): void {
    this._createNullRef();
  }

  public componentWillReceiveProps(): void {
    this._createNullRef();
  }

  public render(): JSX.Element | null {
    this._createNullRef();
    return null;
  }

  public componentDidUpdate(): void {
    this._createNullRef();
  }

  public componentWillUnmount(): void {
    this._createNullRef();
  }

  private _createNullRef(): void {
    // tslint:disable-next-line:no-any
    let foo: any = null;

    // Calling a null
    foo();
  }
}

describe('BaseComponent', () => {
  afterEach(() => {
    BaseComponent.onError = _originalOnError;
  });

  _buildTestFor('componentWillMount');
  _buildTestFor('componentDidMount');
  _buildTestFor('shouldComponentUpdate');
  _buildTestFor('componentWillUpdate');
  _buildTestFor('componentWillReceiveProps');
  _buildTestFor('render');
  _buildTestFor('componentDidUpdate');
  _buildTestFor('componentWillUnmount');

  it('can resolve refs', () => {
    class Foo extends BaseComponent<{}, {}> {
      public root: HTMLElement;

      public render(): JSX.Element {
        return <div ref={ this._resolveRef('root') } />;
      }
    }

    let component = ReactTestUtils.renderIntoDocument(
      <Foo />
      // tslint:disable-next-line:no-any
    ) as any;

    expect(component.root).toBeDefined();
  });
});

function _buildTestFor(methodName: string): void {
  it(`calls the error logger on ${methodName} exception`, () => {
    let lastErrorMessage;

    BaseComponent.onError = (errorMessage: string | undefined) => lastErrorMessage = errorMessage;

    let c = new TestComponent();

    // tslint:disable-next-line:no-any
    (c as any)[methodName]();

    expect(lastErrorMessage).toBeDefined();
  });
}