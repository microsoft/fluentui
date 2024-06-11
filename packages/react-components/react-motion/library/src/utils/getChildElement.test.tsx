import * as React from 'react';
import { getChildElement } from './getChildElement';

describe('getChildElement', () => {
  it('throws if multiple elements are passed', () => {
    expect(() => {
      getChildElement([<div key="1" />, <div key="2" />] as unknown as React.ReactElement);
    }).toThrow('@fluentui/react-motion: Invalid child element');
  });

  it('throws if passed element does not support ref forwarding', () => {
    const TestA = () => <div />;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    function TestB() {
      return <div />;
    }

    expect(() => {
      getChildElement(<TestA />);
    }).toThrow('@fluentui/react-motion: Invalid child element');
    expect(() => {
      getChildElement(<TestB />);
    }).toThrow('@fluentui/react-motion: Invalid child element');
  });

  it('does not throw if passed element does supports ref forwarding', () => {
    const Test = React.forwardRef(() => <div />);

    expect(() => {
      getChildElement(<Test />);
    }).not.toThrow();
    expect(() => {
      getChildElement(<div />);
    }).not.toThrow();
  });
});
