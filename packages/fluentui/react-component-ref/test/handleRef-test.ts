import { handleRef } from '@fluentui/react-component-ref';
import * as React from 'react';

describe('handleRef', () => {
  it('throws an error when "ref" is string', () => {
    const node = document.createElement('div');

    expect(() => {
      // handleRef() does not accept string, but in this test we want ensure that this case will be handled
      handleRef('ref' as any, node);
    }).toThrowError();
  });

  it('calls with node when "ref" is function', () => {
    const ref = jest.fn();
    const node = document.createElement('div');

    handleRef(ref, node);
    expect(ref).toBeCalledWith(node);
  });

  it('does not do anything when "ref" is null', () => {
    const node = document.createElement('div');

    expect(() => {
      handleRef(null, node);
    }).not.toThrowError();
  });

  it('assigns to "current" when "ref" is object', () => {
    const ref = React.createRef<HTMLDivElement>();
    const node = document.createElement('div');

    handleRef(ref, node);
    expect(ref.current).toBe(node);
  });
});
