import * as React from 'react';
import { createRef } from './createRef';

describe('createRef', () => {
  it('to have a current prop that is null on creation', () => {
    expect(createRef().current).toEqual(null);
  });

  it('when called with ReactElement it sets the current property to the passed component', () => {
    const component = React.createElement('span');
    const refObject = createRef<React.ReactElement<{}>>();

    refObject(component);

    expect(refObject.current).toBe(component);
  });

  it('when called with HTMLElement it sets the current property to the passed element', () => {
    const component = document.createElement('span');
    const refObject = createRef();

    refObject(component);

    expect(refObject.current).toBe(component);
  });

  it('when called with HTMLElement it sets the value to the passed element', () => {
    const component = document.createElement('span');
    const refObject = createRef();

    refObject(component);

    expect(refObject.current).toBe(component);
  });

  describe('the deprecated value prop', () => {
    it('is initialized to null', () => {
      expect(createRef().value).toEqual(null);
    });

    it('is set to the passed element', () => {
      const component = document.createElement('span');
      const refObject = createRef();

      refObject(component);

      expect(refObject.value).toBe(component);
    });

    it('is the same value as current', () => {
      const component = document.createElement('span');
      const refObject = createRef();

      refObject(component);

      expect(refObject.value).toBe(refObject.current);
    });
  });
});
