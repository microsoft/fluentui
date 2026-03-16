import * as React from 'react';
import { asAsync } from './asAsync';
import { act, render, waitFor } from '@testing-library/react';

describe('asAsync', () => {
  it('can async load exports', async () => {
    let _resolve: (result: React.ElementType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      },
    });
    const { container, unmount } = render(<AsyncThing />);

    expect(_loadCalled).toBe(true);
    expect(container).toBeEmptyDOMElement();
    expect(_resolve).toBeTruthy();

    await act(async () => {
      _resolve(() => <div>thing</div>);
      // allow microtasks to flush
      await Promise.resolve();
    });

    await waitFor(() => expect(container.firstChild).toHaveTextContent('thing'));
    _loadCalled = false;

    // Test cached case.
    render(<AsyncThing />);
    expect(_loadCalled).toBe(false);
    expect(container.firstChild).toHaveTextContent('thing');
    unmount();
  });

  it('can async load with placeholder', async () => {
    let _resolve: (result: React.ElementType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      },
    });
    const { container, unmount } = render(<AsyncThing asyncPlaceholder={() => <div>placeholder</div>} />);

    expect(_loadCalled).toBe(true);
    expect(container).toHaveTextContent('placeholder');
    expect(_resolve).toBeTruthy();

    await act(async () => {
      _resolve(() => <div>thing</div>);
      await Promise.resolve();
    });

    await waitFor(() => expect(container.firstChild).toHaveTextContent('thing'));
    unmount();
  });
});
