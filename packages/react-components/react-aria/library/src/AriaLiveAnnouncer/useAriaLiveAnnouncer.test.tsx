import { Provider_unstable as Provider } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAriaLiveAnnouncer_unstable as useAriaLiveAnnouncer } from './useAriaLiveAnnouncer';

const ANNOUNCE_TIMEOUT = 500;
const ANNOUNCE_SUFFIX = '. ';

describe('useAriaLiveAnnouncer', () => {
  describe('announce', () => {
    let liveRegionNode: HTMLDivElement | null;
    let politeRegionNode: HTMLDivElement | null;
    let innerNode: HTMLSpanElement | null;
    let divCount: number;

    const targetDocument = {
      createElement: (type: string) => {
        if (type === 'div') {
          return divCount++ % 2 === 0 ? liveRegionNode : politeRegionNode;
        }

        innerNode = document.createElement('span');
        return innerNode;
      },
      body: {
        append: jest.fn(),
      },
      defaultView: global,
    } as unknown as Document;
    const ContextWrapper: React.FC<{ children?: React.ReactNode }> = props => {
      return <Provider value={{ dir: 'ltr', targetDocument }}>{props.children}</Provider>;
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();

      liveRegionNode = document.createElement('div');
      politeRegionNode = document.createElement('div');
      innerNode = null;
      divCount = 0;
    });

    afterEach(() => {
      jest.useRealTimers();

      liveRegionNode = null;
      politeRegionNode = null;
      innerNode = null;
    });

    it('should append assertive and polite regions to <body>', () => {
      const append = jest.spyOn(document.body, 'append');
      const { rerender, unmount } = renderHook(() => useAriaLiveAnnouncer({}));

      expect(append).toHaveBeenCalledTimes(2);
      expect(append).toHaveBeenCalledWith(expect.any(HTMLDivElement));
      const [assertive, polite] = append.mock.calls.map(call => call[0] as HTMLElement);
      expect(assertive.getAttribute('aria-live')).toBe('assertive');
      expect(polite.getAttribute('aria-live')).toBe('polite');
      expect(assertive.hasAttribute('data-tabster-never-hide')).toBe(true);
      expect(polite.hasAttribute('data-tabster-never-hide')).toBe(true);

      // Ensure that the same element is not appended again
      rerender();
      expect(append).toHaveBeenCalledTimes(2);
      unmount();
      expect(assertive.isConnected).toBe(false);
      expect(polite.isConnected).toBe(false);
    });

    it('routes polite and assertive messages to separate regions', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('polite message', { polite: true });
      result.current.announce('assertive message', { polite: false });
      result.current.announce('legacy default');
      jest.advanceTimersByTime(0);

      expect(politeRegionNode?.getAttribute('aria-live')).toBe('polite');
      expect((politeRegionNode?.firstElementChild as HTMLElement)?.innerText).toBe('polite message. ');
      expect(liveRegionNode?.getAttribute('aria-live')).toBe('assertive');
      expect((liveRegionNode?.firstElementChild as HTMLElement)?.innerText).toBe('assertive message. legacy default. ');

      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(politeRegionNode?.childElementCount).toBe(0);
      expect(liveRegionNode?.childElementCount).toBe(0);
    });

    it('moves a replaced batch to the latest message politeness', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('original', { batchId: 'message', polite: true });
      result.current.announce('replacement', { batchId: 'message', polite: false });
      jest.advanceTimersByTime(0);

      expect(politeRegionNode?.childElementCount).toBe(0);
      expect((liveRegionNode?.firstElementChild as HTMLElement)?.innerText).toBe('replacement. ');
    });

    it('announces higher-priority messages first within a region', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('low', { priority: 0, polite: true });
      result.current.announce('high', { priority: 3, polite: true });
      result.current.announce('medium', { priority: 2, polite: true });
      result.current.announce('next', { priority: 1, polite: true });
      jest.advanceTimersByTime(0);

      expect((politeRegionNode?.firstElementChild as HTMLElement)?.innerText).toBe('high. medium. next. low. ');
    });

    it('should update the announcement message', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded');
      jest.advanceTimersByTime(0);
      expect(innerNode?.innerText).toBe('message loaded' + ANNOUNCE_SUFFIX);
    });

    it('should announce frequent messages in batches', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded');
      jest.advanceTimersByTime(100);

      result.current.announce('message unloaded');
      result.current.announce('message reloaded');
      expect(innerNode?.innerText).toBe('message loaded' + ANNOUNCE_SUFFIX);

      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(innerNode?.innerText).toBe('message unloaded' + ANNOUNCE_SUFFIX + 'message reloaded' + ANNOUNCE_SUFFIX);
    });

    it('should only update the last of batched messages', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message reloaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message revolutions', { batchId: 'test' });
      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(innerNode?.innerText).toBe('message revolutions' + ANNOUNCE_SUFFIX);
    });

    it('should handle multiple batches', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message reloaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message revolutions', { batchId: 'test2' });
      jest.advanceTimersByTime(100);

      result.current.announce('message resurrections', { batchId: 'test2' });
      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);

      expect(innerNode?.innerText).toBe(
        'message reloaded' + ANNOUNCE_SUFFIX + 'message resurrections' + ANNOUNCE_SUFFIX,
      );
    });

    it('should handle batched messages in the same tick, and announce only the last', () => {
      const appendChild = jest.spyOn(liveRegionNode!, 'appendChild');
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded', { batchId: 'test' });
      result.current.announce('message reloaded', { batchId: 'test' });
      result.current.announce('message revolutions', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      expect(appendChild).toHaveBeenCalledTimes(1);
      expect(innerNode?.innerText).toBe('message revolutions' + ANNOUNCE_SUFFIX);
    });

    it('should announce batched and unbatched messages', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message reloaded', { batchId: 'test' });
      jest.advanceTimersByTime(100);

      result.current.announce('message revolutions');
      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(innerNode?.innerText).toBe('message reloaded' + ANNOUNCE_SUFFIX + 'message revolutions' + ANNOUNCE_SUFFIX);
    });

    it('should clear the announcement message after a delay', async () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message resurrections');
      jest.advanceTimersByTime(0);
      expect(innerNode?.innerText).toBe('message resurrections' + ANNOUNCE_SUFFIX);

      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(liveRegionNode?.textContent).toBe('');
    });
  });
});
