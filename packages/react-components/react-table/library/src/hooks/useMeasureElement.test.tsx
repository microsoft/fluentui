import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMeasureElement } from './useMeasureElement';
import { render } from '@testing-library/react';

describe('useMeasureElement', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  it('should not remove parent element on unmount', () => {
    const container = document.createElement('div');
    document.body.append(container);

    const TestComponent = () => {
      const { measureElementRef } = useMeasureElement();

      return ReactDOM.createPortal(<div ref={measureElementRef} />, container);
    };

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(container.parentElement).toBe(document.body);
  });
});
