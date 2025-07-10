/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { SSRProvider } from '@fluentui/react-utilities';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Portal } from './Portal';

describe('Portal (node)', () => {
  it('renders hidden span as virtual parent in SSR', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const component = renderer.create(
      <SSRProvider>
        <Portal>portals content</Portal>
      </SSRProvider>,
    );

    expect(component.toJSON()).toMatchInlineSnapshot(`
      <span
        hidden={true}
      />
    `);
  });
});
