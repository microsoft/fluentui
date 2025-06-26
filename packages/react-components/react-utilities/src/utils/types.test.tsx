import * as React from 'react';
import type { JSXElement, JSXIntrinsicElements, ReactVersionDependent } from './types';

describe(`types`, () => {
  describe(`JSXElement`, () => {
    it(`should be compatible with React.ReactElement`, () => {
      // Test that our JSXElement can be assigned to React.ReactElement
      const reactElement: React.ReactElement = <div />;
      const jsxElement: JSXElement = reactElement;

      // And vice versa - JSXElement should be assignable to React.ReactElement
      const backToReactElement: React.ReactElement = jsxElement;

      expect(reactElement).toBeDefined();
      expect(jsxElement).toBeDefined();
      expect(backToReactElement).toBeDefined();
    });

    it(`should work with function components returning JSXElement`, () => {
      // Test function component that explicitly returns JSXElement
      const TestComponent: React.FC = () => {
        return <div>test</div>;
      };

      const component: JSXElement = <TestComponent />;

      expect(TestComponent).toBeDefined();
      expect(component).toBeDefined();
    });

    it(`should work with forwardRef components`, () => {
      // Test forwardRef component with JSXElement return type
      const ForwardRefComponent = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
        (props, ref): JSXElement => {
          return <div ref={ref} {...props} />;
        },
      );

      const element: JSXElement = <ForwardRefComponent>test</ForwardRefComponent>;
      expect(React.isValidElement(element)).toBe(true);
    });

    it(`should be compatible with JSX expressions`, () => {
      // Test that JSXElement works with actual JSX syntax
      const jsxExpression: JSXElement = <div>Hello World</div>;
      const jsxWithProps: JSXElement = <button onClick={() => {}}>Click me</button>;
      const jsxWithChildren: JSXElement = (
        <div>
          <span>Child 1</span>
          <span>Child 2</span>
        </div>
      );

      expect(React.isValidElement(jsxExpression)).toBe(true);
      expect(React.isValidElement(jsxWithProps)).toBe(true);
      expect(React.isValidElement(jsxWithChildren)).toBe(true);
    });
  });

  describe(`JSXIntrinsicElements`, () => {
    it(`should include standard HTML elements`, () => {
      type DivProps = JSXIntrinsicElements['div'];
      type ButtonProps = JSXIntrinsicElements['button'];
      type InputProps = JSXIntrinsicElements['input'];

      // These should compile without errors
      const divProps: DivProps = { className: 'test' };
      const buttonProps: ButtonProps = { onClick: () => {}, disabled: true };
      const inputProps: InputProps = { type: 'text', value: 'test', onChange: () => {} };

      expect(divProps).toBeDefined();
      expect(buttonProps).toBeDefined();
      expect(inputProps).toBeDefined();
    });

    it(`should be compatible with global JSX.IntrinsicElements(react 17)/React.JSX.IntrinsicElements (React 18+)`, () => {
      type TestElement = 'div';

      const elementProps: JSXIntrinsicElements[TestElement] = {
        id: 'test',
        className: 'test-class',
      };

      expect(elementProps).toBeDefined();
      expect(elementProps.id).toBe('test');
      expect(elementProps.className).toBe('test-class');

      // Test that JSXIntrinsicElements works with element creation
      function createElement<T extends keyof JSXIntrinsicElements>(
        type: T,
        props: JSXIntrinsicElements[T],
      ): JSXElement {
        return React.createElement(type, props);
      }

      const div = createElement('div', { className: 'test' });
      const button = createElement('button', { disabled: true });

      expect(React.isValidElement(div)).toBe(true);
      expect(React.isValidElement(button)).toBe(true);
    });
  });

  describe(`ReactVersionDependent`, () => {
    it(`should detect React version correctly`, () => {
      // Test the ReactVersionDependent type works for version detection
      type VersionTest = ReactVersionDependent<'modern', 'legacy'>;

      const versionValue17: VersionTest = 'legacy';
      // @ts-expect-error -- repo is using react v 17, this will fail once repo migrates to react 18+
      const versionValue18: VersionTest = 'modern';

      expect(versionValue17).toBeDefined();
      expect(versionValue18).toBeDefined();
    });
  });
});
