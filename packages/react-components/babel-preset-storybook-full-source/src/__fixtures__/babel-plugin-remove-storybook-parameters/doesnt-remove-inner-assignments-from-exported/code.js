import * as React from 'react';

export const TestComponent = () => {
  const foo = { bar: 'baz' };
  foo.baz = 'bar';
  return 'Hello world';
};

TestComponent.parameters = {
  foo: 'bar',
};
