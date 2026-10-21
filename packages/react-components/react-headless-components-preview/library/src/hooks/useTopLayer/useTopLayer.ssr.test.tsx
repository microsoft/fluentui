import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { act } from '@testing-library/react';
import { useTopLayer } from './useTopLayer';
import { isPopoverOpen } from '../../utils/topLayer';

const HintLayer = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { shouldRender, popover } = useTopLayer(ref, { open: true, mode: 'hint' });
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

describeWithHydrateRoot('useTopLayer SSR', () => {
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
