/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { SSRProvider } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Portal } from './Portal';

describe('Portal (node)', () => {
  it('renders hidden span as virtual parent in SSR', () => {
    const html = renderToString(
      <SSRProvider>
        <Portal>portals content</Portal>
      </SSRProvider>,
    );

    // Portal renders nothing on the server
    expect(html).toMatchInlineSnapshot(`"<span hidden=\\"\\"></span>"`);
  });
});
