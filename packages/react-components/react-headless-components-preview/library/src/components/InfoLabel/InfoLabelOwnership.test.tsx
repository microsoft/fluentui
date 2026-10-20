import * as React from 'react';
import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { InfoLabel } from './InfoLabel';
import { useInfoLabel } from './useInfoLabel';
import type { InfoLabelProps } from './InfoLabel.types';
import type { InfoButtonProps } from './InfoButton/InfoButton.types';
import type { PopoverProps } from '../Popover/Popover.types';

type ExampleProps = Omit<InfoLabelProps, 'infoButton'> & {
  automaticButton?: boolean;
  infoButton?:
    | (Omit<Partial<InfoButtonProps>, 'popover'> &
        RefAttributes<HTMLButtonElement> & { popover?: Partial<PopoverProps> })
    | null;
};

const Example = ({ infoButton, automaticButton = false, ...props }: ExampleProps) => (
  <>
    <InfoLabel
      root={{ id: 'ownership' }}
      info={'info' in props ? props.info : 'Information'}
      infoButton={
        automaticButton
          ? undefined
          : infoButton === null
          ? null
          : {
              id: 'info-trigger',
              ...infoButton,
              popover: { id: 'information-popup', ...infoButton?.popover },
            }
      }
      {...props}
    >
      Label
    </InfoLabel>
    <button data-testid="outside">Outside</button>
  </>
);

const strict = (element: React.ReactElement) => <React.StrictMode>{element}</React.StrictMode>;
const ownership = (container: HTMLElement) => container.querySelector('#ownership')!;
const trigger = (container: HTMLElement) => container.querySelector<HTMLButtonElement>('#info-trigger')!;

describe('InfoLabel ownership lifecycle', () => {
  it('retains initial focus, consumer refs and blur handlers without closing on an unknown destination', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const surfaceRef = React.createRef<HTMLDialogElement>();
    const buttonBlur = jest.fn();
    const surfaceBlur = jest.fn();
    const change = jest.fn();
    const { container, getByRole } = render(
      strict(
        <>
          <Example
            infoButton={{
              ref: buttonRef,
              onBlur: buttonBlur,
              info: { ref: surfaceRef, onBlurCapture: surfaceBlur },
              popover: { defaultOpen: true, onOpenChange: change },
            }}
          />
          <InfoLabel root={{ id: 'second' }} info="Other information">
            Other label
          </InfoLabel>
        </>,
      ),
    );
    expect(buttonRef.current).toBe(trigger(container));
    expect(surfaceRef.current).toBe(getByRole('note', { hidden: true }));
    expect(surfaceRef.current).toHaveFocus();
    fireEvent.blur(surfaceRef.current!, { relatedTarget: null });
    fireEvent.blur(buttonRef.current!, { relatedTarget: null });
    expect(buttonBlur).toHaveBeenCalledTimes(1);
    expect(surfaceBlur).toHaveBeenCalledTimes(1);
    expect(change).not.toHaveBeenCalled();
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(container.querySelector('#second')).not.toHaveAttribute('aria-owns');
    expect(getByRole('note', { hidden: true })).toBeInTheDocument();
  });

  it('does not emit callbacks for controlled parent changes or rejected opening requests', () => {
    const change = jest.fn();
    const element = (open: boolean) => strict(<Example infoButton={{ popover: { open, onOpenChange: change } }} />);
    const { container, rerender, queryByRole } = render(element(false));
    fireEvent.click(trigger(container));
    expect(change).toHaveBeenCalledTimes(1);
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    expect(queryByRole('note', { hidden: true })).toBeNull();
    change.mockClear();
    rerender(element(true));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    rerender(element(false));
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    expect(change).not.toHaveBeenCalled();
  });

  it('ignores a removed lifetime callback after reinserting the same key', () => {
    const oldChange = jest.fn();
    const newChange = jest.fn();
    const initialProps: InfoLabelProps = {
      info: 'Information',
      infoButton: { key: 'same', popover: { onOpenChange: oldChange } },
    };
    const { result, rerender } = renderHook((props: InfoLabelProps) => useInfoLabel(props, null), { initialProps });
    const oldRequest = result.current.infoButton?.popover;
    const event = new MouseEvent('click');
    if (!oldRequest || typeof oldRequest !== 'object' || !('onOpenChange' in oldRequest)) {
      throw new Error('Expected a resolved popover slot');
    }
    const oldCallback = oldRequest.onOpenChange;
    rerender({ infoButton: null });
    rerender({
      info: 'Information',
      infoButton: { key: 'same', popover: { defaultOpen: true, onOpenChange: newChange } },
    });
    expect(result.current.root['aria-owns']).toBeDefined();
    act(() => oldCallback?.(event, { type: 'click', event, open: false }));
    expect(result.current.root['aria-owns']).toBeDefined();
    expect(oldChange).toHaveBeenCalledTimes(1);
    expect(newChange).not.toHaveBeenCalled();
  });

  it('closes through one merged callback after destination focus is established', async () => {
    const change = jest.fn();
    const buttonBlur = jest.fn();
    const infoBlur = jest.fn();
    const { container, getByTestId, getByRole, queryByRole } = render(
      strict(
        <Example
          infoButton={{
            onBlur: buttonBlur,
            info: { onBlurCapture: infoBlur },
            popover: { onOpenChange: change },
          }}
        />,
      ),
    );
    for (let cycle = 0; cycle < 2; cycle++) {
      fireEvent.click(trigger(container));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      change.mockClear();
      buttonBlur.mockClear();
      infoBlur.mockClear();
      act(() => getByRole('note', { hidden: true }).focus());
      act(() => trigger(container).focus());
      change.mockImplementation((_event, data) => {
        if (!data.open) {
          expect(getByTestId('outside')).toHaveFocus();
        }
      });
      act(() => getByTestId('outside').focus());
      await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
      expect(ownership(container)).not.toHaveAttribute('aria-owns');
      expect(change).toHaveBeenCalledTimes(1);
      expect(infoBlur).toHaveBeenCalledTimes(1);
      expect(buttonBlur).toHaveBeenCalledTimes(1);
    }
  });

  it('keeps controlled state authoritative when opening and closing requests are rejected', async () => {
    const change = jest.fn();
    const { container, getByTestId, getByRole, rerender } = render(
      strict(<Example infoButton={{ popover: { open: false, onOpenChange: change } }} />),
    );
    fireEvent.click(trigger(container));
    expect(change).toHaveBeenCalledTimes(1);
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    change.mockClear();
    rerender(strict(<Example infoButton={{ popover: { open: true, onOpenChange: change } }} />));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(change).not.toHaveBeenCalled();
    act(() => getByRole('note', { hidden: true }).focus());
    act(() => getByTestId('outside').focus());
    await waitFor(() => expect(change).toHaveBeenCalledTimes(1));
    expect(getByRole('note', { hidden: true })).toBeInTheDocument();
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    change.mockClear();
    rerender(strict(<Example infoButton={{ popover: { open: false, onOpenChange: change } }} />));
    await waitFor(() => expect(ownership(container)).not.toHaveAttribute('aria-owns'));
    expect(change).not.toHaveBeenCalled();
  });

  it('updates controlled ownership only after the parent accepts a real request', async () => {
    const change = jest.fn();
    const Controlled = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <Example
          infoButton={{
            popover: {
              open,
              onOpenChange: (event, data) => {
                change(event, data);
                setOpen(data.open);
              },
            },
          }}
        />
      );
    };
    const { container, getByTestId, queryByRole } = render(strict(<Controlled />));
    fireEvent.click(trigger(container));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    change.mockClear();
    act(() => getByTestId('outside').focus());
    await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    expect(change).toHaveBeenCalledTimes(1);
  });

  (['explicit-null', 'automatic'] as const).forEach(removal => {
    it(`resets ownership across two ${removal} removal/reinsertion cycles`, () => {
      const change = jest.fn();
      const present =
        removal === 'automatic' ? (
          <Example automaticButton info="Information" />
        ) : (
          <Example infoButton={{ popover: { onOpenChange: change } }} />
        );
      const absent =
        removal === 'explicit-null' ? <Example infoButton={null} /> : <Example automaticButton info={undefined} />;
      const { container, queryByRole, rerender } = render(strict(present));
      for (let cycle = 0; cycle < 2; cycle++) {
        fireEvent.click(ownership(container).querySelector('button')!);
        expect(ownership(container)).toHaveAttribute('aria-owns');
        change.mockClear();
        rerender(strict(absent));
        expect(ownership(container)).not.toHaveAttribute('aria-owns');
        expect(ownership(container).querySelector('button')).toBeNull();
        expect(queryByRole('note', { hidden: true })).toBeNull();
        rerender(strict(present));
        expect(ownership(container)).not.toHaveAttribute('aria-owns');
        expect(queryByRole('note', { hidden: true })).toBeNull();
        expect(change).not.toHaveBeenCalled();
      }
    });
  });

  (
    [
      { from: 1, to: '1', remount: false },
      { from: null, to: 'null', remount: false },
      { from: undefined, to: null, remount: true },
      { from: 'first', to: 'second', remount: true },
    ] as const
  ).forEach(({ from, to, remount }) => {
    it(`matches React key normalization for ${String(from)} to ${String(to)}`, () => {
      const change = jest.fn();
      const snapshots: Array<string | null> = [];
      const rootRef = React.createRef<HTMLSpanElement>();
      const element = (key: React.Key | null | undefined) =>
        strict(
          <React.Profiler
            id="ownership"
            onRender={() => snapshots.push(rootRef.current?.getAttribute('aria-owns') ?? null)}
          >
            <Example root={{ id: 'ownership', ref: rootRef }} infoButton={{ key, popover: { onOpenChange: change } }} />
          </React.Profiler>,
        );
      const { container, queryByRole, rerender } = render(element(from));
      fireEvent.click(trigger(container));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      change.mockClear();
      snapshots.length = 0;
      rerender(element(to));
      if (remount) {
        expect(ownership(container)).not.toHaveAttribute('aria-owns');
        expect(queryByRole('note', { hidden: true })).toBeNull();
        expect(snapshots.every(value => value === null)).toBe(true);
      } else {
        expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
        expect(queryByRole('note', { hidden: true })).not.toBeNull();
      }
      expect(change).not.toHaveBeenCalled();
    });
  });

  it('initializes ownership from defaultOpen only for the actual slot lifetime', () => {
    const change = jest.fn();
    const element = (key: string, defaultOpen: boolean) =>
      strict(<Example infoButton={{ key, popover: { defaultOpen, onOpenChange: change } }} />);
    const { container, getByRole, queryByRole, rerender } = render(element('first', true));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(getByRole('note', { hidden: true })).toBeInTheDocument();
    rerender(element('first', false));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(getByRole('note', { hidden: true })).toBeInTheDocument();
    rerender(element('second', false));
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    expect(queryByRole('note', { hidden: true })).toBeNull();
    rerender(element('third', true));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(getByRole('note', { hidden: true })).toBeInTheDocument();
    expect(change).not.toHaveBeenCalled();
  });
});
