import * as React from 'react';
import { act, render } from '@testing-library/react';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';
import { AriaLiveAnnouncer } from '@fluentui/react-aria';
import type { ToastAnnounce } from '@fluentui/react-toast';
import { AriaLive } from './AriaLive';

describe('AriaLive', () => {
  it('renders nothing visible', () => {
    const { container } = render(
      <AnnounceProvider value={{ announce: jest.fn() }}>
        <AriaLive announceRef={React.createRef()} />
      </AnnounceProvider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('populates announceRef with a callable function once mounted', () => {
    const announceRef = React.createRef<ToastAnnounce>();

    render(
      <AnnounceProvider value={{ announce: jest.fn() }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    expect(typeof announceRef.current).toBe('function');
  });

  it('forwards calls to the surrounding AnnounceProvider', () => {
    const announceSpy = jest.fn();
    const announceRef = React.createRef<ToastAnnounce>();

    render(
      <AnnounceProvider value={{ announce: announceSpy }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    act(() => {
      announceRef.current?.('hello', { politeness: 'assertive' });
    });

    expect(announceSpy).toHaveBeenCalledTimes(1);
    expect(announceSpy).toHaveBeenCalledWith('hello', { polite: false });
  });

  it('adapts politeness "polite" → polite: true', () => {
    const announceSpy = jest.fn();
    const announceRef = React.createRef<ToastAnnounce>();

    render(
      <AnnounceProvider value={{ announce: announceSpy }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    act(() => {
      announceRef.current?.('polite message', { politeness: 'polite' });
    });

    expect(announceSpy).toHaveBeenLastCalledWith('polite message', { polite: true });
  });

  it('adapts politeness "assertive" → polite: false', () => {
    const announceSpy = jest.fn();
    const announceRef = React.createRef<ToastAnnounce>();

    render(
      <AnnounceProvider value={{ announce: announceSpy }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    act(() => {
      announceRef.current?.('assertive message', { politeness: 'assertive' });
    });

    expect(announceSpy).toHaveBeenLastCalledWith('assertive message', { polite: false });
  });

  it('updates the bound ref when the context announce changes', () => {
    const first = jest.fn();
    const second = jest.fn();
    const announceRef = React.createRef<ToastAnnounce>();

    const { rerender } = render(
      <AnnounceProvider value={{ announce: first }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    act(() => {
      announceRef.current?.('msg-1', { politeness: 'polite' });
    });
    expect(first).toHaveBeenCalledWith('msg-1', { polite: true });

    rerender(
      <AnnounceProvider value={{ announce: second }}>
        <AriaLive announceRef={announceRef} />
      </AnnounceProvider>,
    );

    act(() => {
      announceRef.current?.('msg-2', { politeness: 'polite' });
    });
    expect(second).toHaveBeenCalledWith('msg-2', { polite: true });
    expect(first).toHaveBeenCalledTimes(1); // no double-fire
  });

  it('is a no-op when rendered without an AnnounceProvider ancestor', () => {
    const announceRef = React.createRef<ToastAnnounce>();

    render(<AriaLive announceRef={announceRef} />);

    expect(() => {
      act(() => {
        announceRef.current?.('orphan', { politeness: 'polite' });
      });
    }).not.toThrow();
  });

  describe('end-to-end via AriaLiveAnnouncer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('routes assertive announcements into the document.body live region', () => {
      const announceRef = React.createRef<ToastAnnounce>();

      render(
        <AriaLiveAnnouncer>
          <AriaLive announceRef={announceRef} />
        </AriaLiveAnnouncer>,
      );

      act(() => {
        announceRef.current?.('end-to-end message', { politeness: 'assertive' });
      });
      // useDomAnnounce schedules a 0ms cycle that commits the message into a
      // child span of the live region.
      act(() => {
        jest.advanceTimersByTime(0);
      });

      const liveRegion = document.body.querySelector('[aria-live="assertive"]');
      // useDomAnnounce sets the message via `.innerText` on a wrapping span
      // (a workaround for some SR/browsers); jsdom stores `innerText` but
      // doesn't reflect it to `textContent`, so we read it directly.
      const wrappingSpan = liveRegion?.querySelector('span');
      expect(wrappingSpan?.innerText).toContain('end-to-end message');
    });
  });
});
