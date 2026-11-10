import * as React from 'react';
import { render } from '@testing-library/react';
import { IStyleableComponentProps } from './IComponent';
import { createComponent } from './createComponent';

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
    render(<TestComponent tokens={{ testPropToken: 42 }} />);
  });
});
