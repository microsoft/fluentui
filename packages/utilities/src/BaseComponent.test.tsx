/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-dom/test-utils';
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
