import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getReactFiberFromNode } from 'src/utils/getReactFiberFromNode';

describe('getReactFiberFromNode', () => {
  it('returns a Fiber for DOM node', () => {
    const rootEl = document.createElement('div');
    document.body.appendChild(rootEl);

    ReactDOM.render(<div id="foo" />, rootEl);

    const renderedEl = document.querySelector('#foo');
    const fiber = getReactFiberFromNode(renderedEl);

    expect(renderedEl).toBeInTheDocument();

    expect(fiber).toHaveProperty('tag', 5);
    expect(fiber).toHaveProperty('type', 'div');
    expect(fiber).toHaveProperty('pendingProps', expect.objectContaining({ id: 'foo' }));

    ReactDOM.unmountComponentAtNode(rootEl);
    document.body.removeChild(rootEl);
  });

  it('throws on non-React node', () => {
    expect(() => getReactFiberFromNode(document.createElement('div'))).toThrow(
      /Failed to find a React Fiber on a node/,
    );
  });

  it('returns null if nothing was passed', () => {
    expect(getReactFiberFromNode(undefined)).toBe(null);
  });
});
