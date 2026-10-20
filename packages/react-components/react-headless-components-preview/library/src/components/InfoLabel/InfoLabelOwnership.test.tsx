import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ExtractSlotProps, RefAttributes, SlotRenderFunction } from '@fluentui/react-utilities';
import { InfoLabel } from './InfoLabel';
import { InfoButton } from './InfoButton/InfoButton';
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
const renderRootWithoutKey: SlotRenderFunction<ExtractSlotProps<InfoLabelProps['root']>> = (
  Component,
  { key: _key, ...props },
) => <Component {...props} />;
const renderButtonWithoutKey: SlotRenderFunction<InfoButtonProps & RefAttributes<HTMLButtonElement>> = (
  Component,
  { key: _key, ...props },
) => <Component {...props} />;

describe('InfoLabel ownership lifecycle', () => {
  it('retains initial focus, consumer refs and blur handlers when focus moves inside the button and surface', () => {
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
    act(() => buttonRef.current?.focus());
    act(() => surfaceRef.current?.focus());
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

  it('reports one merged callback per uncontrolled trigger toggle', async () => {
    const change = jest.fn();
    const { container, getByRole, queryByRole } = render(
      strict(<Example infoButton={{ popover: { onOpenChange: change } }} />),
    );
    for (let cycle = 0; cycle < 2; cycle++) {
      fireEvent.click(trigger(container));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toHaveFocus();
      expect(change).toHaveBeenCalledTimes(1);
      expect(change.mock.calls[0][1].open).toBe(true);
      change.mockClear();
      fireEvent.click(trigger(container));
      await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
      expect(ownership(container)).not.toHaveAttribute('aria-owns');
      expect(change).toHaveBeenCalledTimes(1);
      expect(change.mock.calls[0][1].open).toBe(false);
      change.mockClear();
    }
  });

  it('keeps controlled state authoritative when opening and closing requests are rejected', async () => {
    const change = jest.fn();
    const { container, getByRole, rerender } = render(
      strict(<Example infoButton={{ popover: { open: false, onOpenChange: change } }} />),
    );
    fireEvent.click(trigger(container));
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][1].open).toBe(true);
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    change.mockClear();
    rerender(strict(<Example infoButton={{ popover: { open: true, onOpenChange: change } }} />));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(trigger(container));
    await waitFor(() => expect(change).toHaveBeenCalledTimes(1));
    expect(change.mock.calls[0][1].open).toBe(false);
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
    const { container, queryByRole } = render(strict(<Controlled />));
    fireEvent.click(trigger(container));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    change.mockClear();
    fireEvent.click(trigger(container));
    await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][1].open).toBe(false);
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

  (['root', 'infoButton'] as const).forEach(target => {
    (['default', 'render-function'] as const).forEach(renderer => {
      (
        [
          { from: 1, to: '1', remount: false },
          { from: null, to: 'null', remount: false },
          { from: undefined, to: null, remount: true },
          { from: 'first', to: 'second', remount: true },
        ] as const
      ).forEach(({ from, to, remount }) => {
        it(`matches ${target} React key normalization for ${String(from)} to ${String(
          to,
        )} with ${renderer} rendering`, () => {
          const change = jest.fn();
          const snapshots: Array<string | null> = [];
          const rootRef = React.createRef<HTMLSpanElement>();
          const element = (key: React.Key | null | undefined) =>
            strict(
              <React.Profiler
                id="ownership"
                onRender={() => snapshots.push(rootRef.current?.getAttribute('aria-owns') ?? null)}
              >
                <Example
                  root={{
                    id: 'ownership',
                    ref: rootRef,
                    key: target === 'root' ? key : undefined,
                    children: renderer === 'render-function' ? renderRootWithoutKey : undefined,
                  }}
                  infoButton={{
                    key: target === 'infoButton' ? key : undefined,
                    children: renderer === 'render-function' ? renderButtonWithoutKey : undefined,
                    popover: { onOpenChange: change },
                  }}
                />
              </React.Profiler>,
            );
          const { container, queryByRole, rerender } = render(element(from));
          const originalButton = trigger(container);
          fireEvent.click(originalButton);
          expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
          change.mockClear();
          snapshots.length = 0;
          rerender(element(to));
          if (remount) {
            expect(trigger(container)).not.toBe(originalButton);
            expect(ownership(container)).not.toHaveAttribute('aria-owns');
            expect(queryByRole('note', { hidden: true })).toBeNull();
            expect(snapshots.every(value => value === null)).toBe(true);
          } else {
            expect(trigger(container)).toBe(originalButton);
            expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
            expect(queryByRole('note', { hidden: true })).not.toBeNull();
          }
          expect(change).not.toHaveBeenCalled();
        });
      });
    });
  });

  it('initializes defaultOpen again after a custom root render function remounts the button', () => {
    const change = jest.fn();
    const element = (key: string, defaultOpen: boolean) =>
      strict(
        <Example
          root={{
            id: 'ownership',
            key,
            children: renderRootWithoutKey,
          }}
          infoButton={{ popover: { defaultOpen, onOpenChange: change } }}
        />,
      );
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

  (['root', 'infoButton'] as const).forEach(target => {
    it(`follows actual ${target} renderer-owned keys without resetting for new inline render functions`, () => {
      const change = jest.fn();
      const element = (returnedKey: string, defaultOpen: boolean) => {
        const renderRoot: typeof renderRootWithoutKey = (Component, props) => (
          <Component {...props} key={returnedKey} />
        );
        const renderButton: typeof renderButtonWithoutKey = (Component, props) => (
          <Component {...props} key={returnedKey} />
        );
        return strict(
          <Example
            root={{ id: 'ownership', children: target === 'root' ? renderRoot : undefined }}
            infoButton={{
              children: target === 'infoButton' ? renderButton : undefined,
              popover: { defaultOpen, onOpenChange: change },
            }}
          />,
        );
      };
      const { container, getByRole, queryByRole, rerender } = render(element('first', true));
      const firstButton = trigger(container);
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      rerender(element('first', false));
      expect(trigger(container)).toBe(firstButton);
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      rerender(element('second', false));
      expect(trigger(container)).not.toBe(firstButton);
      expect(ownership(container)).not.toHaveAttribute('aria-owns');
      expect(queryByRole('note', { hidden: true })).toBeNull();
      rerender(element('third', true));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      expect(change).not.toHaveBeenCalled();
    });

    it(`resets ownership for same-key ${target} default/custom renderer transitions in both directions`, () => {
      const change = jest.fn();
      const element = (custom: boolean, defaultOpen = false) =>
        strict(
          <Example
            root={{
              id: 'ownership',
              key: 'root',
              children: target === 'root' && custom ? renderRootWithoutKey : undefined,
            }}
            infoButton={{
              key: 'button',
              children: target === 'infoButton' && custom ? renderButtonWithoutKey : undefined,
              popover: { defaultOpen, onOpenChange: change },
            }}
          />,
        );
      const { container, getByRole, queryByRole, rerender } = render(element(false));
      for (const custom of [true, false, true, false]) {
        fireEvent.click(trigger(container));
        expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
        change.mockClear();
        const previousButton = trigger(container);
        rerender(element(custom));
        expect(trigger(container)).not.toBe(previousButton);
        expect(ownership(container)).not.toHaveAttribute('aria-owns');
        expect(queryByRole('note', { hidden: true })).toBeNull();
        expect(change).not.toHaveBeenCalled();
      }
      rerender(element(true, true));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      expect(change).not.toHaveBeenCalled();
    });
  });

  it.each(['root', 'infoButton'] as const)(
    'ignores callbacks retained from an actual rendered %s replacement',
    target => {
      const change = jest.fn();
      let oldCallback: PopoverProps['onOpenChange'];
      const element = (key: string) => {
        const renderButton: typeof renderButtonWithoutKey = (Component, props) => {
          const popover = props.popover;
          if (key === 'first' && popover && typeof popover === 'object' && 'onOpenChange' in popover) {
            oldCallback = popover.onOpenChange;
          }
          return <Component {...props} key={target === 'infoButton' ? key : 'button'} />;
        };
        const renderRoot: typeof renderRootWithoutKey = (Component, props) => <Component {...props} key={key} />;
        return strict(
          <Example
            root={{ id: 'ownership', children: target === 'root' ? renderRoot : undefined }}
            infoButton={{
              children: renderButton,
              popover: { defaultOpen: true, onOpenChange: change },
            }}
          />,
        );
      };
      const { container, getByRole, rerender } = render(element('first'));
      rerender(element('second'));
      const event = new MouseEvent('click');
      act(() => oldCallback?.(event, { type: 'click', event, open: false }));
      expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      expect(change).toHaveBeenCalledTimes(1);
    },
  );

  it('preserves consumer ownership while actual button state changes', () => {
    const { container } = render(strict(<Example root={{ id: 'ownership', 'aria-owns': 'consumer-popup' }} />));
    fireEvent.click(trigger(container));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'consumer-popup');
    fireEvent.click(trigger(container));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'consumer-popup');
  });

  it('reports mounted state separately for multiple InfoLabels', () => {
    const { container, getByRole } = render(
      strict(
        <>
          <InfoLabel root={{ id: 'first-owner' }} info="First information">
            First label
          </InfoLabel>
          <InfoLabel root={{ id: 'second-owner' }} info="Second information">
            Second label
          </InfoLabel>
        </>,
      ),
    );
    const firstOwner = container.querySelector('#first-owner')!;
    const secondOwner = container.querySelector('#second-owner')!;
    expect(firstOwner).not.toHaveAttribute('aria-owns');
    expect(secondOwner).not.toHaveAttribute('aria-owns');
    fireEvent.click(getByRole('button', { name: 'First label information' }));
    expect(firstOwner).toHaveAttribute('aria-owns');
    expect(secondOwner).not.toHaveAttribute('aria-owns');
  });

  it('does not let a nested InfoButton replace the owning button report', () => {
    const element = (nestedId: string) =>
      strict(
        <Example
          info={<InfoButton info="Nested information" popover={{ id: nestedId }} />}
          infoButton={{ popover: { defaultOpen: true } }}
        />,
      );
    const { container, rerender } = render(element('first-nested-popup'));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
    rerender(element('second-nested-popup'));
    expect(ownership(container)).toHaveAttribute('aria-owns', 'information-popup');
  });

  it('does not keep projected default ownership when a custom renderer omits the button', () => {
    const { container, queryByRole } = render(
      strict(<Example infoButton={{ children: () => null, popover: { defaultOpen: true } }} />),
    );
    expect(queryByRole('button', { name: /information/ })).toBeNull();
    expect(ownership(container)).not.toHaveAttribute('aria-owns');
  });

  it.each(['controlled', 'default'] as const)('projects initial %s ownership in server-rendered markup', mode => {
    const markup = renderToString(
      <Example infoButton={{ popover: mode === 'controlled' ? { open: true } : { defaultOpen: true } }} />,
    );
    expect(markup).toContain('aria-owns="information-popup"');
  });
});
