/*
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SSRProvider } from '@fluentui/react-utilities';
import { Tooltip } from './Tooltip';

describe('Tooltip secondary content SSR', () => {
  it.each(['Bold', <strong key="primary">Bold</strong>])(
    'preserves an authored render-function label without rendering visible content %p',
    content => {
      expect(
        renderToString(
          <SSRProvider>
            <Tooltip visible content={content} secondaryContent={<kbd>Ctrl+B</kbd>} relationship="label">
              {triggerProps =>
                React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' }, 'Trigger')
              }
            </Tooltip>
          </SSRProvider>,
        ),
      ).toBe('<button aria-label="Toggle bold formatting">Trigger</button>');
    },
  );

  it('renders a combined string label without a native layer', () => {
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
