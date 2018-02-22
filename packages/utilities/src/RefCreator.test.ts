import * as React from 'react';
import { createRef } from './RefCreator';

describe('createRef', () => {
  it('to have a value prop that is null on creation', () => {
    expect(createRef().value).toEqual(null);
  });

  it('when called with ReactElement it sets the value to the passed component', () => {
    const component = React.createElement('span');
    const refCreator = createRef<React.ReactElement<{}>>();

    refCreator(component);

    expect(refCreator.value).toBe(component);
  });

  it('when called with HTMLElement it sets the value to the passed element', () => {
    const component = document.createElement('span');
    const refCreator = createRef();

    refCreator(component);

    expect(refCreator.value).toBe(component);
  });
});
