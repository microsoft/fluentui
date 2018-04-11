import * as React from 'react';
import { createRef } from './createRef';

describe('createRef', () => {
  it('to have a value prop that is null on creation', () => {
    expect(createRef().value).toEqual(null);
  });

  it('when called with ReactElement it sets the value to the passed component', () => {
    const component = React.createElement('span');
    const refObject = createRef<React.ReactElement<{}>>();

    refObject(component);

    expect(refObject.value).toBe(component);
  });

  it('when called with HTMLElement it sets the value to the passed element', () => {
    const component = document.createElement('span');
    const refObject = createRef();

    refObject(component);

    expect(refObject.value).toBe(component);
  });
});
