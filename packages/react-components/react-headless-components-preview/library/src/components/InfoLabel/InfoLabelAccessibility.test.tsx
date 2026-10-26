import * as React from 'react';
import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import type { ExtractSlotProps, RefAttributes, SlotRenderFunction } from '@fluentui/react-utilities';
import { InfoLabel } from './InfoLabel';
import { InfoButton } from './InfoButton/InfoButton';
import type { InfoLabelProps } from './InfoLabel.types';
import type { InfoButtonProps } from './InfoButton/InfoButton.types';

const strict = (element: React.ReactElement) => <React.StrictMode>{element}</React.StrictMode>;
const renderRoot: SlotRenderFunction<ExtractSlotProps<InfoLabelProps['root']>> = (Component, props) => (
  <Component {...props} />
);
const renderButton: SlotRenderFunction<InfoButtonProps & RefAttributes<HTMLButtonElement>> = (Component, props) => (
  <Component {...props} />
);

describe('InfoLabel accessibility relationships', () => {
  it('keeps controlled requests subordinate to parent state without generating ownership', async () => {
    const change = jest.fn();
    const element = (open: boolean) =>
      strict(
        <InfoLabel
          root={{ id: 'owner' }}
          info="Information"
          infoButton={{ popover: { id: 'popup', open, onOpenChange: change } }}
        >
          Label
        </InfoLabel>,
      );
    const { container, getByRole, queryByRole, rerender } = render(element(false));
    const trigger = getByRole('button');
    fireEvent.click(trigger);
    expect(change.mock.calls[0][1].open).toBe(true);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-details');
    expect(queryByRole('note', { hidden: true })).toBeNull();
    change.mockClear();
    rerender(element(true));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-details', 'popup');
    expect(getByRole('note', { hidden: true })).toHaveAttribute('id', 'popup');
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(trigger);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][1].open).toBe(false);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    change.mockClear();
    rerender(element(false));
    await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
    expect(trigger).not.toHaveAttribute('aria-details');
    expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
    expect(change).not.toHaveBeenCalled();
  });

  it('accepts controlled trigger requests exactly once', async () => {
    const change = jest.fn();
    const Controlled = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <InfoLabel
          root={{ id: 'owner' }}
          info="Information"
          infoButton={{
            popover: {
              open,
              onOpenChange: (event, data) => {
                change(event, data);
                setOpen(data.open);
              },
            },
          }}
        >
          Label
        </InfoLabel>
      );
    };
    const { container, getByRole, queryByRole } = render(strict(<Controlled />));
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAttribute('aria-details', getByRole('note', { hidden: true }).id);
    expect(change).toHaveBeenCalledTimes(1);
    change.mockClear();
    fireEvent.click(getByRole('button'));
    await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
    expect(getByRole('button')).not.toHaveAttribute('aria-details');
    expect(change).toHaveBeenCalledTimes(1);
    expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
  });

  (['root', 'infoButton'] as const).forEach(target => {
    (
      [
        { from: undefined, to: null, remount: true },
        { from: null, to: 'null', remount: false },
      ] as const
    ).forEach(({ from, to, remount }) => {
      it(`preserves ${target} null-key normalization for ${String(from)} to ${String(to)}`, () => {
        const element = (key: React.Key | null | undefined, defaultOpen: boolean) =>
          strict(
            <InfoLabel
              info="Information"
              root={{ key: target === 'root' ? key : undefined }}
              infoButton={{ key: target === 'infoButton' ? key : undefined, popover: { defaultOpen } }}
            >
              Label
            </InfoLabel>,
          );
        const { getByRole, queryByRole, rerender } = render(element(from, true));
        const first = getByRole('button');
        rerender(element(to, false));
        if (remount) {
          expect(getByRole('button')).not.toBe(first);
          expect(getByRole('button')).not.toHaveAttribute('aria-details');
          expect(queryByRole('note', { hidden: true })).toBeNull();
        } else {
          expect(getByRole('button')).toBe(first);
          expect(first).toHaveAttribute('aria-details', getByRole('note', { hidden: true }).id);
        }
      });
    });

    (['default', 'custom'] as const).forEach(renderer => {
      it(`preserves normalized ${target} key lifetimes with ${renderer} rendering`, () => {
        const change = jest.fn();
        const element = (key: React.Key, defaultOpen: boolean) =>
          strict(
            <InfoLabel
              root={{
                id: 'owner',
                key: target === 'root' ? key : undefined,
                children: renderer === 'custom' ? renderRoot : undefined,
              }}
              info="Information"
              infoButton={{
                key: target === 'infoButton' ? key : undefined,
                children: renderer === 'custom' ? renderButton : undefined,
                popover: { defaultOpen, onOpenChange: change },
              }}
            >
              Label
            </InfoLabel>,
          );
        const { container, getByRole, queryByRole, rerender } = render(element(1, true));
        const first = getByRole('button');
        expect(first).toHaveAttribute('aria-details', getByRole('note', { hidden: true }).id);
        rerender(element('1', false));
        expect(getByRole('button')).toBe(first);
        expect(getByRole('note', { hidden: true })).toBeInTheDocument();
        rerender(element('replacement', false));
        expect(getByRole('button')).not.toBe(first);
        expect(getByRole('button')).not.toHaveAttribute('aria-details');
        expect(queryByRole('note', { hidden: true })).toBeNull();
        expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
        expect(change).not.toHaveBeenCalled();
      });
    });

    it(`clears the details link for actual renderer-owned ${target} key replacement`, () => {
      const element = (key: string, defaultOpen: boolean) => {
        const customRoot: typeof renderRoot = (Component, props) => <Component {...props} key={key} />;
        const customButton: typeof renderButton = (Component, props) => <Component {...props} key={key} />;
        return strict(
          <InfoLabel
            root={{ id: 'owner', children: target === 'root' ? customRoot : undefined }}
            info="Information"
            infoButton={{ children: target === 'infoButton' ? customButton : undefined, popover: { defaultOpen } }}
          >
            Label
          </InfoLabel>,
        );
      };
      const { container, getByRole, queryByRole, rerender } = render(element('first', true));
      const first = getByRole('button');
      rerender(element('first', false));
      expect(getByRole('button')).toBe(first);
      expect(first).toHaveAttribute('aria-details', getByRole('note', { hidden: true }).id);
      rerender(element('second', false));
      expect(getByRole('button')).not.toBe(first);
      expect(getByRole('button')).not.toHaveAttribute('aria-details');
      expect(queryByRole('note', { hidden: true })).toBeNull();
      expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
    });

    it(`keeps relationships correct across ${target} default/custom renderer transitions`, () => {
      const element = (custom: boolean) =>
        strict(
          <InfoLabel
            root={{ id: 'owner', key: 'root', children: target === 'root' && custom ? renderRoot : undefined }}
            info="Information"
            infoButton={{ key: 'button', children: target === 'infoButton' && custom ? renderButton : undefined }}
          >
            Label
          </InfoLabel>,
        );
      const { container, getByRole, queryByRole, rerender } = render(element(false));
      for (const custom of [true, false]) {
        fireEvent.click(getByRole('button'));
        expect(getByRole('button')).toHaveAttribute('aria-details', getByRole('note', { hidden: true }).id);
        rerender(element(custom));
        expect(getByRole('button')).not.toHaveAttribute('aria-details');
        expect(queryByRole('note', { hidden: true })).toBeNull();
        expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
      }
    });
  });

  it('reinitializes an optional button without stale relationships', () => {
    const element = (present: boolean) =>
      strict(
        <InfoLabel root={{ id: 'owner' }} info={present ? 'Information' : undefined}>
          Label
        </InfoLabel>,
      );
    const { container, getByRole, queryByRole, rerender } = render(element(true));
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAttribute('aria-details');
    rerender(element(false));
    expect(queryByRole('button')).toBeNull();
    expect(queryByRole('note', { hidden: true })).toBeNull();
    rerender(element(true));
    expect(getByRole('button')).not.toHaveAttribute('aria-details');
    expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
  });

  it('preserves consumer ownership and consumer refs and blur callbacks', () => {
    const button = React.createRef<HTMLButtonElement>();
    const surface = React.createRef<HTMLDivElement>();
    const onBlur = jest.fn();
    const onBlurCapture = jest.fn();
    const { container } = render(
      strict(
        <InfoLabel
          root={{ id: 'owner', 'aria-owns': 'consumer-target' }}
          info={{
            ref: surface,
            onBlurCapture,
            children: 'Information',
          }}
          infoButton={{ ref: button, onBlur, popover: { defaultOpen: true } }}
        >
          Label
        </InfoLabel>,
      ),
    );
    expect(surface.current).toHaveFocus();
    act(() => button.current?.focus());
    act(() => surface.current?.focus());
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlurCapture).toHaveBeenCalledTimes(1);
    expect(container.querySelector('#owner')).toHaveAttribute('aria-owns', 'consumer-target');
  });

  it('links a portaled note without generating ownership or changing its role', () => {
    const portal = document.createElement('div');
    document.body.appendChild(portal);
    type NoteProps = Extract<ExtractSlotProps<InfoButtonProps['info']>, { as: 'div' }>;
    const renderNote: SlotRenderFunction<NoteProps> = (Component, props) =>
      createPortal(
        <Component {...props} as="div">
          Information
        </Component>,
        portal,
      );
    try {
      const { container, getByRole, unmount } = render(
        strict(
          <InfoLabel
            root={{ id: 'owner' }}
            info={{
              as: 'div',
              children: renderNote,
            }}
            infoButton={{ popover: { defaultOpen: true } }}
          >
            Label
          </InfoLabel>,
        ),
      );
      const note = getByRole('note', { hidden: true });
      expect(portal.contains(note)).toBe(true);
      expect(container.contains(note)).toBe(false);
      expect(getByRole('button')).toHaveAttribute('aria-details', note.id);
      expect(getByRole('button')).toHaveAttribute('aria-haspopup', 'false');
      expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
      unmount();
    } finally {
      portal.remove();
    }
  });

  it('keeps generated details targets unique across multiple and nested components', () => {
    const { getAllByRole, container } = render(
      strict(
        <>
          <InfoLabel info={<InfoButton info="Nested" />} infoButton={{ popover: { defaultOpen: true } }}>
            First
          </InfoLabel>
          <InfoLabel info="Second" infoButton={{ popover: { defaultOpen: true } }}>
            Second
          </InfoLabel>
        </>,
      ),
    );
    const notes = getAllByRole('note', { hidden: true });
    expect(notes).toHaveLength(2);
    expect(new Set(notes.map(note => note.id)).size).toBe(2);
    getAllByRole('button')
      .filter(button => button.getAttribute('aria-expanded') === 'true')
      .forEach(button => {
        expect(notes.some(note => note.id === button.getAttribute('aria-details'))).toBe(true);
      });
    expect(container.querySelector('[aria-owns]')).toBeNull();
  });

  it.each(['controlled', 'default'] as const)(
    'renders %s SSR relationships without ownership or menu semantics',
    mode => {
      const markup = renderToString(
        <InfoLabel
          info="Information"
          infoButton={{
            popover: { id: 'popup', ...(mode === 'controlled' ? { open: true } : { defaultOpen: true }) },
          }}
        >
          Label
        </InfoLabel>,
      );
      expect(markup).toContain('aria-expanded="true"');
      expect(markup).toContain('aria-details="popup"');
      expect(markup).toContain('aria-haspopup="false"');
      expect(markup).not.toContain('aria-owns');
    },
  );
});
