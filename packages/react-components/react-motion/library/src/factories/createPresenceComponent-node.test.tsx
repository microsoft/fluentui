/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { createPresenceComponent } from './createPresenceComponent';

const keyframes = [{ opacity: 0 }, { opacity: 1 }];
const options = { duration: 500, fill: 'forwards' as const };

const TestPresence = createPresenceComponent({
  enter: { keyframes, ...options },
  exit: { keyframes: keyframes.slice().reverse(), ...options },
});

// Heads up!
//
// Unfortunately, jsdom (the optional environment for Jest) does not support the Web Animations API, which is used by
// createPresenceComponent() to animate elements.
//
// This test suite ensures that the component works correctly in tests using that environment.

describe('createPresenceComponent (node)', () => {
  it('renders a child component when "visible" is "true"', () => {
    const html = renderToStaticMarkup(
      <TestPresence visible>
        <div data-tid="child" />
      </TestPresence>,
    );

    expect(html).toMatchInlineSnapshot(`"<div data-tid=\\"child\\"></div>"`);
  });

  it('does not render a child component when "visible" is "false" & "unmountOnExit"', () => {
    const html = renderToStaticMarkup(
      <TestPresence unmountOnExit visible={false}>
        <div data-tid="child" />
      </TestPresence>,
    );

    expect(html).toMatchInlineSnapshot(`""`);
  });
});
