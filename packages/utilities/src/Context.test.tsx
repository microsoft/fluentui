import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as ReactDOM from 'react-dom/server';
import { provideContext } from './Context';

const TestContext = provideContext(
  {
    isTest: PropTypes.bool
  },
  (props: { isTest: boolean }) => {
    return { isTest: props.isTest };
  }
);

class Child extends React.Component {
  public static contextTypes: PropTypes.ValidationMap<{ isTest: boolean }> = {
    isTest: PropTypes.bool
  };

  public render(): JSX.Element {
    return <div>{`${this.context.isTest || false}`}</div>;
  }
}

class Parent extends React.Component {
  public render(): JSX.Element {
    return <Child />;
  }
}

describe('Context', () => {
  it('can provide context for child components', () => {
    expect(ReactDOM.renderToStaticMarkup(<Parent />)).toEqual('<div>false</div>');
    expect(
      ReactDOM.renderToStaticMarkup(
        <TestContext isTest={true}>
          <Parent />
        </TestContext>
      )
    ).toEqual('<div>true</div>');
  });
});
