import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { createComponent } from './createComponent';
import type { IStyleableComponentProps } from './IComponent';

describe('createComponent', () => {
  interface ITestTokens {
    testComponentToken?: number;
    testPropToken?: number;
  }
  interface ITestProps extends IStyleableComponentProps<ITestProps, ITestTokens, {}> {}

  const TestComponent: React.FunctionComponent<ITestProps> = createComponent(() => null, {
    tokens: [{ testComponentToken: 1 }, { testComponentToken: 21 }],
  });

  it(`resolves tokens without a runtime error`, () => {
    renderer.create(<TestComponent tokens={{ testPropToken: 42 }} />);
  });
});
