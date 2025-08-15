import * as React from 'react';

import { getRefFromReactElement } from './getRefFromReactElement';

describe('getRefFromReactElement', () => {
  let versionReplacer: jest.ReplaceProperty<string>;

  afterEach(() => {
    // Restore original React version
    versionReplacer?.restore();
  });

  describe('React 19 behavior', () => {
    beforeEach(() => {
      versionReplacer = jest.replaceProperty(React, 'version', '19.0.0');
    });

    it('returns ref from element.props.ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      const element = React.createElement('div', { ref });

      expect(getRefFromReactElement(element)).toBe(ref);
    });

    it('returns null when no ref is provided', () => {
      const element = React.createElement('div');

      expect(getRefFromReactElement(element)).toBeNull();
    });

    it('handles function refs', () => {
      const mockFunctionRef = jest.fn();
      const element = React.createElement('div', { ref: mockFunctionRef });

      expect(getRefFromReactElement(element)).toBe(mockFunctionRef);
    });

    it('handles null refs', () => {
      const element = React.createElement('div', { ref: null });

      expect(getRefFromReactElement(element)).toBeNull();
    });
  });

  describe('Pre-React 19 behavior', () => {
    function createReactElementWithRef<T>(ref?: React.Ref<T>): React.ReactElement & { ref?: React.Ref<T> } {
      return { ...React.createElement('div'), ref };
    }

    beforeEach(() => {
      versionReplacer = jest.replaceProperty(React, 'version', '18.3.1');
    });

    it('returns ref from element.ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      const element = createReactElementWithRef(ref);

      expect(getRefFromReactElement(element)).toBe(ref);
    });

    it('returns undefined when no ref is provided', () => {
      const element = createReactElementWithRef();

      expect(getRefFromReactElement(element)).toBeUndefined();
    });

    it('handles function refs in pre-React 19', () => {
      const mockFunctionRef = jest.fn(() => null) as React.RefCallback<HTMLDivElement>;
      const element = createReactElementWithRef(mockFunctionRef);

      expect(getRefFromReactElement(element)).toBe(mockFunctionRef);
    });

    it('handles null refs', () => {
      const element = createReactElementWithRef(null);

      expect(getRefFromReactElement(element)).toBeNull();
    });
  });
});
