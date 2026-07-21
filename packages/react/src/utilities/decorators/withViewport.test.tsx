import * as React from 'react';
import { render } from '@testing-library/react';
import { withViewport } from './withViewport';

import type { IViewport, IWithViewportProps } from './withViewport';
import type { JSXElement } from '@fluentui/utilities';

interface TestComponentProps extends IWithViewportProps {
  renderId: number;
  viewport?: IViewport;
}

class TestComponent extends React.Component<TestComponentProps> {
  public render(): JSXElement {
    return <div>{this.props.renderId}</div>;
  }
}

const ViewportComponent = withViewport(TestComponent);

interface ResizeObserverInstanceMock {
  observe: jest.Mock;
  disconnect: jest.Mock;
}

function createResizeObserverMock() {
  const instances: ResizeObserverInstanceMock[] = [];
  const constructor = jest.fn().mockImplementation(() => {
    const instance = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };

    instances.push(instance);
    return instance;
  });

  return { constructor, instances };
}

function setResizeObserver(targetWindow: Window, value: jest.Mock | undefined): () => void {
  const descriptor = Object.getOwnPropertyDescriptor(targetWindow, 'ResizeObserver');

  Object.defineProperty(targetWindow, 'ResizeObserver', {
    configurable: true,
    writable: true,
    value,
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(targetWindow, 'ResizeObserver', descriptor);
    } else {
      Reflect.deleteProperty(targetWindow, 'ResizeObserver');
    }
  };
}

function createIframe(): { iframe: HTMLIFrameElement; frameWindow: Window; frameDocument: Document } {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);

  return {
    iframe,
    frameWindow: iframe.contentWindow!,
    frameDocument: iframe.contentDocument!,
  };
}

describe('withViewport', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('re-registers ResizeObserver when the root moves to another window', () => {
    const mainResizeObserver = createResizeObserverMock();
    const frameResizeObserver = createResizeObserverMock();
    const restoreMainResizeObserver = setResizeObserver(window, mainResizeObserver.constructor);
    const { iframe, frameWindow, frameDocument } = createIframe();
    const restoreFrameResizeObserver = setResizeObserver(frameWindow, frameResizeObserver.constructor);
    const { container, rerender, unmount } = render(<ViewportComponent renderId={0} />);
    const viewportRoot = container.querySelector('.ms-Viewport')!;

    try {
      expect(mainResizeObserver.constructor).toHaveBeenCalledTimes(1);
      expect(mainResizeObserver.instances[0].observe).toHaveBeenCalledWith(viewportRoot);

      rerender(<ViewportComponent renderId={1} />);

      expect(mainResizeObserver.constructor).toHaveBeenCalledTimes(1);
      expect(mainResizeObserver.instances[0].disconnect).not.toHaveBeenCalled();

      frameDocument.body.appendChild(viewportRoot);
      rerender(<ViewportComponent renderId={2} />);

      expect(mainResizeObserver.instances[0].disconnect).toHaveBeenCalledTimes(1);
      expect(frameResizeObserver.constructor).toHaveBeenCalledTimes(1);
      expect(frameResizeObserver.instances[0].observe).toHaveBeenCalledWith(viewportRoot);
    } finally {
      container.appendChild(viewportRoot);
      unmount();
      restoreFrameResizeObserver();
      restoreMainResizeObserver();
      iframe.remove();
    }
  });

  it('moves the fallback resize listener to the destination window', () => {
    const restoreMainResizeObserver = setResizeObserver(window, undefined);
    const { iframe, frameWindow, frameDocument } = createIframe();
    const restoreFrameResizeObserver = setResizeObserver(frameWindow, undefined);
    const mainAddEventListener = jest.spyOn(window, 'addEventListener');
    const mainRemoveEventListener = jest.spyOn(window, 'removeEventListener');
    const frameAddEventListener = jest.spyOn(frameWindow, 'addEventListener');
    const { container, rerender, unmount } = render(<ViewportComponent renderId={0} disableResizeObserver />);
    const viewportRoot = container.querySelector('.ms-Viewport')!;

    try {
      const mainResizeRegistration = mainAddEventListener.mock.calls.find(call => call[0] === 'resize');
      expect(mainResizeRegistration).toBeDefined();

      frameDocument.body.appendChild(viewportRoot);
      rerender(<ViewportComponent renderId={1} disableResizeObserver />);

      expect(mainRemoveEventListener).toHaveBeenCalledWith(
        'resize',
        mainResizeRegistration![1],
        mainResizeRegistration![2],
      );
      expect(frameAddEventListener.mock.calls.some(call => call[0] === 'resize')).toBe(true);
    } finally {
      container.appendChild(viewportRoot);
      unmount();
      restoreFrameResizeObserver();
      restoreMainResizeObserver();
      iframe.remove();
    }
  });
});
