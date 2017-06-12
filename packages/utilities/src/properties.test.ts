import {
  getNativeProps,
  divProperties
} from './properties';
import * as React from 'react';
let { expect } = chai;

describe('getNativeProps', () => {

  it('can pass through data tags', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>({
      'data-automation-id': 1
    }, divProperties);
    expect((result as any)['data-automation-id']).equals(1);
  });

  it('can pass through aria tags', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>({
      'aria-label': 1
    }, divProperties);
    expect((result as any)['aria-label']).equals(1);
  });

  it('can pass through basic div properties and events', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>({
      className: 'foo',
      onClick: () => { /* no-op */ },
      onClickCapture: () => { /* no-op */ }
    }, divProperties);
    expect(result.className).equals('foo');
    expect(result.onClick).is.instanceof(Function, 'onClick not function');
    // tslint:disable-next-line:no-string-literal
    expect((result as any)['onClickCapture']).is.instanceof(Function, 'onClickCapture not function');
  });

  it('can remove unexpected properties', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>({
      'foobar': 1,
      className: 'hi'
    }, divProperties);
    expect(result.className).equals('hi');
    expect((result as any)['foobar']).equals(undefined); // tslint:disable-line:no-string-literal
  });

  it('can exclude properties', () => {
    let result = getNativeProps<any>({ a: 1, b: 2 }, ['a', 'b'], ['b']);

    expect(result.a).to.exist;
    expect(result.b).to.not.exist;
  });

});