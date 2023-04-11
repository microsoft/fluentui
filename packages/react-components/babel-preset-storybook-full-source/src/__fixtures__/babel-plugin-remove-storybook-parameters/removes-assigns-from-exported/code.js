import * as React from 'react';

export const TestComponent = () => 'Hello world';

TestComponent.parameters = {
  foo: 'bar',
};

TestComponent.somethingElse = {
  foo: 'bar',
  test: {
    someKey: 'foo',
  },
};

TestComponent['parameters'] = 1;

TestComponent['parameters'] = { foo: 'bar' };
