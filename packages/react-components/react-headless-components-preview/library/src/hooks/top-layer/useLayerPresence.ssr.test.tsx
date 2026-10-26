import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { act } from '@testing-library/react';
import { useLayerOpenState } from './useLayerOpenState';
import { useLayerPresence } from './useLayerPresence';
import { isPopoverOpen } from './utils';

const HintLayer = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popover } = useLayerOpenState(ref, { open: true, mode: 'hint' });
  const { shouldRender } = useLayerPresence(ref, { open: true });
  return shouldRender ? <div ref={ref} role="status" popover={popover} /> : null;
};

// React 17 has no `react-dom/client` (`hydrateRoot`).
const getHydrateRoot = (): typeof import('react-dom/client').hydrateRoot | undefined => {
  try {
    return require('react-dom/client').hydrateRoot;
  } catch {
    return undefined;
  }
};

const hydrateRoot = getHydrateRoot();
const describeWithHydrateRoot = hydrateRoot ? describe : describe.skip;

describeWithHydrateRoot('useLayerOpenState and useLayerPresence SSR', () => {
  it('renders hidden on the server and shows the element after hydration without a mismatch', async () => {
    const ui = <HintLayer />;
    const container = document.createElement('div');
    container.innerHTML = renderToString(ui);
    document.body.appendChild(container);
    const layer = container.firstElementChild as HTMLElement;
    expect(layer).toHaveAttribute('popover', 'hint');
    expect(isPopoverOpen(layer)).toBe(false);

    const errors: string[] = [];
    const consoleError = jest.spyOn(console, 'error').mockImplementation((...args) => errors.push(String(args[0])));
    await act(async () => {
      hydrateRoot!(container, ui, { onRecoverableError: error => errors.push(String(error)) });
    });
    consoleError.mockRestore();

    expect(errors).toEqual([]);
    expect(container.firstElementChild).toBe(layer);
    expect(layer).toHaveAttribute('popover', 'hint');
    expect(isPopoverOpen(layer)).toBe(true);
  });
});
