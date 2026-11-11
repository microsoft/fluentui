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

  it.each(['summary', 'shortcut'])('defers the descendant description target %s until hydration', targetId => {
    const markup = renderToString(
      <SSRProvider>
        <Tooltip
          visible
          content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
          secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
          relationship="description"
        >
          <button aria-describedby={targetId}>Format</button>
        </Tooltip>
      </SSRProvider>,
    );
    expect(markup).toContain(`aria-describedby="${targetId}"`);
    expect(markup).not.toContain('id="summary"');
    expect(markup).not.toContain('id="shortcut"');
    expect(markup).not.toContain('role="tooltip"');
  });

  it.each([
    ['aria-labelledby', 'summary'],
    ['aria-labelledby', 'shortcut'],
    ['aria-describedby', 'summary'],
    ['aria-describedby', 'shortcut'],
  ] as const)('defers a label trigger descendant %s target %s until hydration', (attribute, targetId) => {
    const markup = renderToString(
      <SSRProvider>
        <Tooltip
          visible
          content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
          secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
          relationship="label"
        >
          <button {...{ [attribute]: targetId }}>Trigger</button>
        </Tooltip>
      </SSRProvider>,
    );
    expect(markup).toContain(`${attribute}="${targetId}"`);
    expect(markup).not.toContain('id="summary"');
    expect(markup).not.toContain('id="shortcut"');
    expect(markup).not.toContain('role="tooltip"');
  });

  it.each(['aria-labelledby', 'aria-describedby'] as const)(
    'defers an authored %s target until hydration',
    attribute => {
      const markup = renderToString(
        <SSRProvider>
          <Tooltip
            visible
            content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
            secondaryContent="Ctrl+B"
            relationship="label"
          >
            <button {...{ [attribute]: 'tooltip-help' }}>Trigger</button>
          </Tooltip>
        </SSRProvider>,
      );
      expect(markup).toContain(`${attribute}="tooltip-help"`);
      expect(markup).not.toContain('id="tooltip-help"');
      expect(markup).not.toContain('role="tooltip"');
    },
  );

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
