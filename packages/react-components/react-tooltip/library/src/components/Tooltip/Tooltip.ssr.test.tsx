/*
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SSRProvider } from '@fluentui/react-utilities';
import { Tooltip } from './Tooltip';

describe('Tooltip secondary content SSR', () => {
  it('renders a combined string label without a portal', () => {
    expect(
      renderToString(
        <SSRProvider>
          <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
            <button>Trigger</button>
          </Tooltip>
        </SSRProvider>,
      ),
    ).toBe('<button aria-label="Bold Ctrl+B">Trigger</button>');
  });

  it('keeps the primary string label until rich secondary content can mount', () => {
    expect(
      renderToString(
        <SSRProvider>
          <Tooltip content="Bold" secondaryContent={<kbd>Ctrl+B</kbd>} relationship="label">
            <button>Trigger</button>
          </Tooltip>
        </SSRProvider>,
      ),
    ).toBe('<button aria-label="Bold">Trigger</button>');
  });
});
