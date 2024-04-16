import * as React from 'react';
import { act, render } from '@testing-library/react';
import { AriaLive } from './AriaLive';
import { isConformant } from '../../testing/isConformant';
import { Announce, AriaLivePoliteness } from './AriaLive.types';

describe('AriaLive', () => {
  isConformant({
    Component: AriaLive,
    displayName: 'AriaLive',
    isInternal: true,
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'make-styles-overrides-win',
    ],
  });

  beforeEach(jest.useRealTimers);

  it('renders a default state', () => {
    const result = render(<AriaLive announceRef={React.createRef()}>Default AriaLive</AriaLive>);
    expect(result.container).toMatchSnapshot();
  });

  it('should render live areas on mount', () => {
    const { container } = render(<AriaLive announceRef={React.createRef()}>Default AriaLive</AriaLive>);

    expect(container.querySelector('[aria-live="assertive"]')).not.toBeNull();
    expect(container.querySelector('[aria-live="polite"]')).not.toBeNull();
  });

  it('should announce polite message', () => {
    const msg = 'test message';
    const ref = React.createRef<Announce>();
    const { container } = render(<AriaLive announceRef={ref}>Default AriaLive</AriaLive>);

    expect(ref.current).not.toBeUndefined();
    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.(msg, { politeness: 'polite' });
    });
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toEqual(msg);
  });

  it('should announce assertive message', () => {
    const msg = 'test message';
    const ref = React.createRef<Announce>();
    const { container } = render(<AriaLive announceRef={ref}>Default AriaLive</AriaLive>);

    expect(ref.current).not.toBeUndefined();
    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.(msg, { politeness: 'assertive' });
    });

    expect(container.querySelector('[aria-live="assertive"]')?.textContent).toEqual(msg);
  });

  it.each(['polite', 'assertive'] as const)('should announce %s messages in queue', politeness => {
    jest.useFakeTimers();
    const selector = `[aria-live="${politeness}"]`;
    const msgs = ['msg1', 'msg2', 'msg3', 'msg4'];
    const ref = React.createRef<Announce>();
    const { container } = render(<AriaLive announceRef={ref}>Default AriaLive</AriaLive>);

    expect(ref.current).not.toBeUndefined();
    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.(msgs[0], { politeness });
    });

    expect(container.querySelector(selector)?.textContent).toEqual(msgs[0]);

    msgs.shift();

    // queue up announcements
    for (const msg of msgs) {
      act(() => {
        ref.current?.(msg, { politeness });
      });
    }

    // advance timer and expect announcements to be in order of creation
    for (const msg of msgs) {
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(container.querySelector(selector)?.textContent).toEqual(msg);
    }
  });

  it('should announce assertive before polite messages in queue', () => {
    jest.useFakeTimers();
    const msgs: [string, AriaLivePoliteness][] = [
      ['polite1', 'polite'],
      ['polite2', 'polite'],
      ['polite3', 'polite'],
      ['polite4', 'polite'],
      ['assertive', 'assertive'],
    ];
    const ref = React.createRef<Announce>();
    const { container } = render(<AriaLive announceRef={ref}>Default AriaLive</AriaLive>);

    expect(ref.current).not.toBeUndefined();
    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.(msgs[0][0], { politeness: msgs[0][1] });
    });

    expect(container.querySelector('[aria-live="polite"]')?.textContent).toEqual(msgs[0][0]);
    msgs.shift();

    // queue up announcements
    for (const [msg, politeness] of msgs) {
      act(() => {
        ref.current?.(msg, { politeness });
      });
    }

    const expectedOrder = [
      ['assertive', 'assertive'],
      ['polite2', 'polite'],
      ['polite3', 'polite'],
      ['polite4', 'polite'],
    ];

    for (const [msg, politeness] of expectedOrder) {
      act(() => {
        jest.advanceTimersByTime(500);
      });

      const selector = `[aria-live="${politeness}"]`;
      expect(container.querySelector(selector)?.textContent).toEqual(msg);
    }
  });
});
