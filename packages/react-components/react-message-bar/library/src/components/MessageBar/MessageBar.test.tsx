import * as React from 'react';
import { render, act } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';
import { MessageBarActions } from '../MessageBarActions/MessageBarActions';
import { resetIdsForTests } from '@fluentui/react-utilities';
import type { MessageBarProps } from './MessageBar.types';
import { messageBarClassNames } from './useMessageBarStyles.styles';

describe('MessageBar', () => {
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

  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant<MessageBarProps>({
    Component: MessageBar,
    displayName: 'MessageBar',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Icon',
            layout: 'multiline',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<MessageBar>Default MessageBar</MessageBar>);
    expect(result.container).toMatchSnapshot();
  });

  it.each([
    ['assertive', 'error'] as const,
    ['assertive', 'warning'] as const,
    ['assertive', 'success'] as const,
    ['polite', 'info'] as const,
  ])('should announce %s with %s intent', (politeness, intent) => {
    const announce = jest.fn();
    render(
      <AnnounceProvider value={{ announce }}>
        <MessageBar intent={intent}>
          <MessageBarBody>
            <MessageBarTitle>Title</MessageBarTitle>Body
          </MessageBarBody>
        </MessageBar>
      </AnnounceProvider>,
    );

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('TitleBody', {
      alert: politeness === 'assertive',
      polite: politeness === 'polite',
    });
  });

  it('should announce actions', () => {
    const announce = jest.fn();
    render(
      <AnnounceProvider value={{ announce }}>
        <MessageBar>
          <MessageBarBody>
            <MessageBarTitle>Title</MessageBarTitle>Body
          </MessageBarBody>
          <MessageBarActions containerAction={<button>Container action</button>}>
            <button>Action 1</button>
            <button>Action 2</button>
          </MessageBarActions>
        </MessageBar>
      </AnnounceProvider>,
    );

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('TitleBody,Action 1Action 2', expect.anything());
  });

  describe('should not flicker during reflow', () => {
    let originalResizeObserver: typeof ResizeObserver;
    let resizeCallback: ResizeObserverCallback | undefined;
    let observedElement: HTMLElement | undefined;

    beforeAll(() => {
      originalResizeObserver = global.ResizeObserver;
      global.ResizeObserver = class MockResizeObserver {
        constructor(cb: ResizeObserverCallback) {
          resizeCallback = cb;
        }
        public observe(el: Element) {
          observedElement = el as HTMLElement;
          Object.defineProperty(observedElement, 'scrollWidth', {
            configurable: true,
            get() {
              return 640;
            },
          });
        }
        public unobserve() {
          /* noop */
        }
        public disconnect() {
          /* noop */
        }
      } as unknown as typeof ResizeObserver;
    });

    afterAll(() => {
      global.ResizeObserver = originalResizeObserver;
    });

    beforeEach(() => {
      resizeCallback = undefined;
      observedElement = undefined;
    });

    const renderMessageBar = () =>
      render(
        <MessageBar>
          <MessageBarBody>
            <MessageBarTitle>Title</MessageBarTitle>
            This message bar body is long enough that it needs to reflow to multiple lines.
          </MessageBarBody>
        </MessageBar>,
      );

    const isReflowing = (container: HTMLElement) =>
      container.querySelector(`.${messageBarClassNames.bottomReflowSpacer}`) !== null;

    // Simulate the container being resized (e.g. dragging the window / page) to a given width.
    const resizeTo = (inlineSize: number) =>
      act(() => {
        resizeCallback?.(
          [
            {
              target: observedElement,
              borderBoxSize: [{ inlineSize, blockSize: 0 }],
            } as unknown as ResizeObserverEntry,
          ],
          {} as ResizeObserver,
        );
      });

    it('reflows to multiline when the container is narrower than the content', () => {
      const { container } = renderMessageBar();
      const singleLineWidth = observedElement!.scrollWidth;

      // Wider than the content - stays single line.
      resizeTo(singleLineWidth + 100);
      expect(isReflowing(container)).toBe(false);

      // Narrower than the content - reflows to multiline.
      resizeTo(singleLineWidth - 100);
      expect(isReflowing(container)).toBe(true);
    });

    it('does not flicker while the container width changes during a drag resize', () => {
      const { container } = renderMessageBar();
      const singleLineWidth = observedElement!.scrollWidth;

      // Narrow enough to reflow.
      resizeTo(singleLineWidth - 100);
      expect(isReflowing(container)).toBe(true);

      // Simulate a drag where the width changes but always stays below the width of the single line layout.
      const observed: boolean[] = [];
      for (const width of [singleLineWidth - 120, singleLineWidth - 40, singleLineWidth - 80, singleLineWidth - 10]) {
        resizeTo(width);
        observed.push(isReflowing(container));
      }

      // It must stay multiline the entire time - no toggling back to single line.
      expect(observed).toEqual([true, true, true, true]);
    });

    it('returns to single line only once there is room for the content again', () => {
      const { container } = renderMessageBar();
      const singleLineWidth = observedElement!.scrollWidth;

      resizeTo(singleLineWidth - 100);
      expect(isReflowing(container)).toBe(true);

      // Growing but still not enough room - stays reflowed.
      resizeTo(singleLineWidth - 1);
      expect(isReflowing(container)).toBe(true);

      // Enough room for the single line layout again - returns to single line.
      resizeTo(singleLineWidth);
      expect(isReflowing(container)).toBe(false);
    });
  });
});
