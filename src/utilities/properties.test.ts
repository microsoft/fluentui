import {
  getNativeProps,
  divProperties
} from './properties';
import * as React from 'react';
let { expect } = chai;

describe('getNativeProps', () => {

  it('can pass through data tags', () => {
    let result = getNativeProps<React.HTMLProps<HTMLDivElement>>({
      'data-automation-id': 1
    }, divProperties);
    expect(result['data-automation-id']).equals(1);
  });

  it('can pass through aria tags', () => {
    let result = getNativeProps<React.HTMLProps<HTMLDivElement>>({
      'aria-label': 1
    }, divProperties);
    expect(result['aria-label']).equals(1);
  });

  it('can pass through basic div properties and events', () => {
    let result = getNativeProps<React.HTMLProps<HTMLDivElement>>({
      className: 'foo',
      onClick: () => { /* no-op */ },
      onClickCapture: () => { /* no-op */ }
    }, divProperties);
    expect(result.className).equals('foo');
    expect(result.onClick).is.instanceof(Function, 'onClick not function');
    expect(result['onClickCapture']).is.instanceof(Function, 'onClickCapture not function');  // tslint:disable-line:no-string-literal
  });

  it('can remove unexpected properties', () => {
    let result = getNativeProps<React.HTMLProps<HTMLDivElement>>({
      'foobar': 1,
      className: 'hi'
    }, divProperties);
    expect(result.className).equals('hi');
    expect(result['foobar']).equals(undefined); // tslint:disable-line:no-string-literal
  });

});