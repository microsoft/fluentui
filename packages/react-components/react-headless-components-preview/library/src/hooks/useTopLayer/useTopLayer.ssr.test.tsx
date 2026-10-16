import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { act } from '@testing-library/react';
import { useTopLayer } from './useTopLayer';

const HintLayer = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { shouldRender, popover } = useTopLayer(ref, { open: true, mode: 'hint', role: 'status' });
  return shouldRender ? <div ref={ref} role="status" popover={popover} /> : null;
};

jest.mock('../../utils/topLayer', () => ({
  ...jest.requireActual('../../utils/topLayer'),
  // Simulate a browser without `popover="hint"` (Safari <= 26.5).
  supportsPopoverHint: () => false,
}));

describe('useTopLayer SSR', () => {
  it('hydrates popover="hint" without a mismatch and falls back to auto on the client', async () => {
    const ui = <HintLayer />;
    const container = document.createElement('div');
    container.innerHTML = renderToString(ui);
    document.body.appendChild(container);
    expect(container.firstElementChild).toHaveAttribute('popover', 'hint');

    const errors: string[] = [];
    const consoleError = jest.spyOn(console, 'error').mockImplementation((...args) => errors.push(String(args[0])));
    await act(async () => {
      hydrateRoot(container, ui, { onRecoverableError: error => errors.push(String(error)) });
    });
    consoleError.mockRestore();

    expect(errors).toEqual([]);
    expect(container.firstElementChild).toHaveAttribute('popover', 'auto');
  });
});
