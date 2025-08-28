import * as React from 'react';

import { getReactElementRef } from './getReactElementRef';

const reactVersion = parseInt(React.version, 10);

describe('getReactElementRef', () => {
  if (reactVersion >= 19) {
    describe('React 19 behavior', () => {
      it('returns ref from element.props.ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        const element = React.createElement('div', { ref });

        expect(getReactElementRef(element)).toBe(ref);
      });

      it('returns undefined when no ref is provided', () => {
        const element = React.createElement('div');

        expect(getReactElementRef(element)).toBeUndefined();
      });

      it('handles function refs', () => {
        const mockFunctionRef = jest.fn();
        const element = React.createElement('div', { ref: mockFunctionRef });

        expect(getReactElementRef(element)).toBe(mockFunctionRef);
      });

      it('handles null refs', () => {
        const element = React.createElement('div', { ref: null });

        expect(getReactElementRef(element)).toBeNull();
      });
    });
  }

  if (reactVersion < 19) {
    describe('Pre-React 19 behavior', () => {
      function createReactElementWithRef<T>(ref?: React.Ref<T>): React.ReactElement & { ref?: React.Ref<T> } {
        return { ...React.createElement('div'), ref };
      }

      it('returns ref from element.ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        const element = createReactElementWithRef(ref);

        expect(getReactElementRef(element)).toBe(ref);
      });

      it('returns undefined when no ref is provided', () => {
        const element = createReactElementWithRef();

        expect(getReactElementRef(element)).toBeUndefined();
      });

      it('handles function refs in pre-React 19', () => {
        const mockFunctionRef = jest.fn(() => null) as React.RefCallback<HTMLDivElement>;
        const element = createReactElementWithRef(mockFunctionRef);

        expect(getReactElementRef(element)).toBe(mockFunctionRef);
      });

      it('handles null refs', () => {
        const element = createReactElementWithRef(null);

        expect(getReactElementRef(element)).toBeNull();
      });
    });
  }
});
