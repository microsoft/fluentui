/*
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SSRProvider } from '@fluentui/react-utilities';
import { Tooltip } from './Tooltip';

describe('Tooltip secondary content SSR', () => {
  it.each([true, 'true'] as const)('excludes aria-hidden=%p secondary content from the string fallback', ariaHidden => {
    expect(
      renderToString(
        <SSRProvider>
          <Tooltip
            content="Bold"
            secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': ariaHidden }}
            relationship="label"
          >
            <button>Trigger</button>
          </Tooltip>
        </SSRProvider>,
      ),
    ).toBe('<button aria-label="Bold">Trigger</button>');
  });

  it.each([
    ['description', 'aria-describedby', 'summary'],
    ['description', 'aria-describedby', 'shortcut'],
    ['label', 'aria-labelledby', 'summary'],
    ['label', 'aria-labelledby', 'shortcut'],
    ['label', 'aria-describedby', 'summary'],
    ['label', 'aria-describedby', 'shortcut'],
    ['label', 'aria-labelledby', 'tooltip'],
    ['label', 'aria-describedby', 'tooltip'],
  ] as const)('defers relationship=%s %s=%s until hydration', (relationship, attribute, targetId) => {
    const markup = renderToString(
      <SSRProvider>
        <Tooltip
          visible
          content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
          secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
          relationship={relationship}
        >
          <button {...{ [attribute]: targetId }}>Trigger</button>
        </Tooltip>
      </SSRProvider>,
    );
    expect(markup).toContain(`${attribute}="${targetId}"`);
    expect(markup).not.toContain('id="tooltip"');
    expect(markup).not.toContain('id="summary"');
    expect(markup).not.toContain('id="shortcut"');
    expect(markup).not.toContain('role="tooltip"');
  });

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
