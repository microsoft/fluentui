import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useChildElement } from './useChildElement';

const TestComponent: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [child] = useChildElement(children);

  return child;
};

describe('useChildElement', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Silence React errors, we capture errors in the tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      /* empty */
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the child element and a ref to it', () => {
    const { result } = renderHook(() => useChildElement(<div />));

    expect(result.current[0].type).toBe('div');
    expect(result.current[1]).toMatchObject({ current: null });
  });

  it('should not log errors if a ref was assigned to the child', () => {
    const ComponentWithRef = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />);

    render(
      <TestComponent>
        <ComponentWithRef />
      </TestComponent>,
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should throw an error if no child is passed', () => {
    expect(() => render(<TestComponent children={undefined as unknown as React.ReactElement} />))
      .toThrowErrorMatchingInlineSnapshot(`
      "@fluentui/react-motion: Invalid child element.
      Motion factories require a single child element to be passed. That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."
    `);
    expect(() => render(<TestComponent children={null as unknown as React.ReactElement} />))
      .toThrowErrorMatchingInlineSnapshot(`
      "@fluentui/react-motion: Invalid child element.
      Motion factories require a single child element to be passed. That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."
    `);
  });

  it('should throw an error if multiple children are passed', () => {
    expect(() =>
      render(<TestComponent children={[<div key="1" />, <div key="2" />] as unknown as React.ReactElement} />),
    ).toThrowErrorMatchingInlineSnapshot(`
      "@fluentui/react-motion: Invalid child element.
      Motion factories require a single child element to be passed. That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."
    `);
  });

  it('should log an error if the child does not support ref forwarding', () => {
    const NonForwardingRefComponent: React.FC = () => {
      return null;
    };

    render(
      <TestComponent>
        <NonForwardingRefComponent />
      </TestComponent>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('@fluentui/react-motion: Invalid child element.'),
    );
  });
});
