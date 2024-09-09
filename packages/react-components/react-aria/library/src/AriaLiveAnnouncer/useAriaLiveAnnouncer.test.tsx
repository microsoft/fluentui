import { Provider_unstable as Provider } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAriaLiveAnnouncer_unstable as useAriaLiveAnnouncer } from './useAriaLiveAnnouncer';

const ANNOUNCE_TIMEOUT = 500;
const ANNOUNCE_SUFFIX = '. ';

describe('useAriaLiveAnnouncer', () => {
  describe('announce', () => {
    let liveRegionNode: HTMLDivElement | null;
    let innerNode: HTMLSpanElement | null;

    const targetDocument = {
      createElement: (type: string) => (type === 'div' ? liveRegionNode : innerNode),
      body: {
        append: jest.fn(),
      },
      defaultView: global,
    } as unknown as Document;
    const ContextWrapper: React.FC = props => {
      return <Provider value={{ dir: 'ltr', targetDocument }}>{props.children}</Provider>;
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.useFakeTimers();

      liveRegionNode = document.createElement('div');
      innerNode = document.createElement('span');
    });

    afterEach(() => {
      jest.useRealTimers();

      liveRegionNode = null;
      innerNode = null;
    });

    it('should append a "div" to <body>', () => {
      const append = jest.spyOn(document.body, 'append');
      const { rerender } = renderHook(() => useAriaLiveAnnouncer({}));

      expect(append).toBeCalledTimes(1);
      expect(append).toBeCalledWith(expect.any(HTMLDivElement));

      // Ensure that the same element is not appended again
      rerender();
      expect(append).toBeCalledTimes(1);
    });

    it('should update the announcement message', () => {
      const { result } = renderHook(() => useAriaLiveAnnouncer({}), { wrapper: ContextWrapper });

      result.current.announce('message loaded');
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
      expect(innerNode?.innerText).toBe('message resurrections' + ANNOUNCE_SUFFIX);

      jest.advanceTimersByTime(ANNOUNCE_TIMEOUT);
      expect(liveRegionNode?.innerText).toBe('');
    });
  });
});
