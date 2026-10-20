import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { flushSync } from 'react-dom';
import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';

describe('Popover frame observation lifecycle', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const settle = async (run: () => void) => {
    await act(async () => {
      run();
      jest.advanceTimersByTime(0);
    });
  };

  const Example = ({ open = true, onOpenChange = jest.fn() }) => (
    <>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverSurface as="div">
          <button>Inside</button>
          <iframe title="Inside frame" />
        </PopoverSurface>
      </Popover>
      <iframe title="Outside frame" />
      <button>Outside</button>
    </>
  );

  it('polls only during frame focus and stops when ordinary parent focus returns', async () => {
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const { getByText, getByTitle, unmount } = render(<Example />);
    await settle(() => getByText('Inside').focus());
    expect(interval).not.toHaveBeenCalled();
    await settle(() => getByTitle('Inside frame').focus());
    expect(interval).toHaveBeenCalledTimes(1);
    expect(interval).toHaveBeenCalledWith(expect.any(Function), 100);
    const id = interval.mock.results[0].value;
    await settle(() => getByText('Inside').focus());
    expect(clear).toHaveBeenCalledWith(id);
    unmount();
  });

  it('does not repeat a rejected close request and rearms after observed frame reentry', async () => {
    const change = jest.fn();
    const { getByText, getByTitle, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByText('Inside').focus());
    await settle(() => getByTitle('Inside frame').focus());
    await settle(() => getByTitle('Outside frame').focus());
    expect(change).toHaveBeenCalledTimes(1);
    await settle(() => jest.advanceTimersByTime(500));
    expect(change).toHaveBeenCalledTimes(1);
    await settle(() => getByTitle('Inside frame').focus());
    await settle(() => getByTitle('Outside frame').focus());
    expect(change).toHaveBeenCalledTimes(2);
    unmount();
  });

  it('cleans up pending frame checks and intervals on close and unmount', async () => {
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const change = jest.fn();
    const { getByTitle, rerender, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByTitle('Inside frame').focus());
    const id = interval.mock.results[0].value;
    fireEvent(window, new Event('blur'));
    rerender(<Example open={false} onOpenChange={change} />);
    expect(clear).toHaveBeenCalledWith(id);
    unmount();
    await settle(() => jest.advanceTimersByTime(500));
    expect(change).not.toHaveBeenCalled();
  });

  it('ignores genuine window blur and resumes frame observation on window focus', async () => {
    const hasFocus = jest.spyOn(document, 'hasFocus').mockReturnValue(true);
    const interval = jest.spyOn(window, 'setInterval');
    const clear = jest.spyOn(window, 'clearInterval');
    const change = jest.fn();
    const { getByTitle, unmount } = render(<Example onOpenChange={change} />);
    await settle(() => getByTitle('Inside frame').focus());
    const id = interval.mock.results[0].value;
    hasFocus.mockReturnValue(false);
    await settle(() => fireEvent(window, new Event('blur')));
    expect(clear).toHaveBeenCalledWith(id);
    expect(change).not.toHaveBeenCalled();
    hasFocus.mockReturnValue(true);
    await settle(() => fireEvent(window, new Event('focus')));
    expect(interval).toHaveBeenCalledTimes(2);
    expect(change).not.toHaveBeenCalled();
    unmount();
  });

  it('does not reattach observers when an older React capture continues after synchronous unmount', async () => {
    const add = jest.spyOn(document, 'addEventListener');
    const remove = jest.spyOn(document, 'removeEventListener');
    const lifecycle: { unmount?: () => void } = {};
    const result = render(
      <div
        onFocusCapture={() => {
          if (lifecycle.unmount) {
            flushSync(lifecycle.unmount);
          }
        }}
      >
        <Popover defaultOpen>
          <PopoverSurface as="div">
            <button>Inside</button>
          </PopoverSurface>
        </Popover>
      </div>,
    );
    lifecycle.unmount = result.unmount;
    const initialObservers = add.mock.calls.filter(call => call[0] === 'fuiframefocus').length;
    expect(initialObservers).toBeGreaterThan(0);
    await settle(() => {
      const inside = result.getByText('Inside');
      inside.blur();
      inside.focus();
    });
    expect(result.queryByText('Inside')).toBeNull();
    expect(add.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(initialObservers);
    expect(remove.mock.calls.filter(call => call[0] === 'fuiframefocus')).toHaveLength(initialObservers);
  });
});
