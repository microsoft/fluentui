import * as React from 'react';
import { useWindow, useDocument, WindowProvider } from './WindowProvider';
import { safeMount } from '@uifabric/test-utilities';

describe('WindowProvider', () => {
  let lastWindow: Window | undefined;
  let lastDocument: Document | undefined;

  const Foo: React.FunctionComponent<{}> = () => {
    lastWindow = useWindow();
    lastDocument = useDocument();

    return null;
  };

  it('can provide defaults for node', () => {
    safeMount(<Foo />);

    expect(lastWindow).toBe(window);
    expect(lastDocument).toBe(document);
  });

  it('can override defaults', () => {
    const mockDocument = ({} as unknown) as Document;
    const mockWindow = ({ document: mockDocument } as unknown) as Window;

    safeMount(
      <WindowProvider window={mockWindow}>
        <Foo />
      </WindowProvider>,
    );

    expect(lastWindow).toBe(mockWindow);
    expect(lastDocument).toBe(mockDocument);
  });
});
