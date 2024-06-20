import * as React from 'react';

import { childrenToString } from './childrenToString';

describe('childrenToString', () => {
  it('should return an empty string when no children are provided', () => {
    const result = childrenToString([]);
    expect(result).toEqual('');
  });

  it('should convert a single child to a string', () => {
    const child = <span>Hello</span>;
    const result = childrenToString(child);
    expect(result).toEqual('Hello');
  });

  it('should convert multiple children to a concatenated string', () => {
    const children = [<span key="1">Hello</span>, <span key="2">World</span>];
    const result = childrenToString(children);
    expect(result).toEqual('HelloWorld');
  });

  it('should ignore null and undefined children', () => {
    const children = [<span key="1">Hello</span>, null, undefined, <span key="2">World</span>];
    const result = childrenToString(children);
    expect(result).toEqual('HelloWorld');
  });

  it('should convert nested children to a flattened string', () => {
    const children = [
      <span key="1">Hello</span>,
      [<span key="2">Inner</span>, <span key="3">World</span>],
      <span key="4">!</span>,
    ];
    const result = childrenToString(children);
    expect(result).toEqual('HelloInnerWorld!');
  });
});
