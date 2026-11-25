import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { getDocument, getWindow, KeyCodes } from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { KeytipLayerBase } from './KeytipLayer.base';
import type { IKeytipLayerProps } from './KeytipLayer.types';
import type { IKeytipProps } from '../../Keytip';

describe('KeytipLayer activation behavior', () => {
  const manager = KeytipManager.getInstance();
  const layerRef = React.createRef<KeytipLayerBase>();
  const win = getWindow()!;
  const doc = getDocument()!;
  const onHome = jest.fn();
  const onChild = jest.fn();
  const onLeaf = jest.fn();
  const onEnter = jest.fn();
  const onExit = jest.fn();
  let target: HTMLButtonElement;

  const props: Omit<IKeytipLayerProps, 'ref'> = {
    componentRef: layerRef,
    content: 'Alt',
    keytipStartSequences: [
      { key: 'Alt' },
      { key: '.', modifierKeys: [KeyCodes.alt] },
      { key: 'Meta', modifierKeys: [KeyCodes.alt] },
    ],
    keytipExitSequences: [
      { key: 'Alt' },
      { key: '.', modifierKeys: [KeyCodes.alt] },
      { key: 'Meta', modifierKeys: [KeyCodes.alt] },
    ],
    keytipActivationBehavior: {
      consumeActivationEvent: true,
      unmatchedInputBehavior: 'exitAndPassThrough',
      consecutiveActivationBehavior: 'exitAndPassThrough',
    },
    onEnterKeytipMode: onEnter,
    onExitKeytipMode: onExit,
  };

  function mount(overrides: Partial<Omit<IKeytipLayerProps, 'ref'>> = {}) {
    return render(<KeytipLayerBase {...props} {...overrides} />);
  }

  function keyboard(type: string, key: string, init: KeyboardEventInit = {}): KeyboardEvent {
    const event = new KeyboardEvent(type, { bubbles: true, cancelable: true, key, ...init });
    act(() => {
      target.dispatchEvent(event);
    });
    return event;
  }

  function altDown(init: KeyboardEventInit = {}) {
    return keyboard('keydown', 'Alt', { altKey: true, ...init });
  }

  function altUp(init: KeyboardEventInit = {}) {
    return keyboard('keyup', 'Alt', init);
  }

  function altTap() {
    altDown();
    altUp();
  }

  function expectMode(active: boolean) {
    expect(layerRef.current!.state.inKeytipMode).toBe(active);
    expect(manager.inKeytipMode).toBe(active);
    if (!active) {
      expect(layerRef.current!.state.visibleKeytips).toHaveLength(0);
      expect(layerRef.current!.getCurrentSequence()).toBe('');
    }
  }

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    manager.shouldEnterKeytipMode = true;
    manager.delayUpdatingKeytipChange = false;
    manager.inKeytipMode = false;
    manager.persistedKeytips = {};
    const keytips: IKeytipProps[] = [
      { content: 'H', keySequences: ['h'], onExecute: onHome },
      { content: 'B', keySequences: ['h', 'b'], onExecute: onChild },
      { content: 'C', keySequences: ['c'], onExecute: onLeaf },
      { content: 'E1', keySequences: ['e1'], onExecute: onLeaf },
    ];
    manager.keytips = {};
    keytips.forEach((keytip, index) => {
      manager.keytips[index.toString()] = { keytip, uniqueID: index.toString() };
    });
    target = doc.createElement('button');
    doc.body.appendChild(target);
  });

  afterEach(() => {
    cleanup();
    target.remove();
    manager.keytips = {};
    manager.persistedKeytips = {};
    manager.inKeytipMode = false;
    manager.shouldEnterKeytipMode = true;
    manager.delayUpdatingKeytipChange = false;
    jest.useRealTimers();
  });

  it('consumes Alt keydown without entering and only displays keytips on keyup', () => {
    mount();
    const app = jest.fn();
    target.addEventListener('keydown', app);
    target.addEventListener('keyup', app);
    expect(altDown().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(true);
    expect(layerRef.current!.state.visibleKeytips.map(keytip => keytip.content)).toEqual(['H', 'C', 'E1']);
    expect(app).not.toHaveBeenCalled();
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith({ key: 'Alt', modifierKeys: undefined });
    expect(onExit).not.toHaveBeenCalled();
  });

  it.each([{ code: 'AltLeft', location: 1 }, { code: 'AltRight', location: 2 }, { code: 'AltRight' }, { location: 2 }])(
    'handles release-only entry, sequential input, and non-consecutive exit equally: %j',
    init => {
      mount();
      expect(altDown(init).defaultPrevented).toBe(true);
      expectMode(false);
      expect(altUp(init).defaultPrevented).toBe(true);
      expectMode(true);
      expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
      expect(onHome).toHaveBeenCalledTimes(1);
      expectMode(true);
      expect(altDown(init).defaultPrevented).toBe(true);
      expectMode(false);
      expect(altUp(init).defaultPrevented).toBe(true);
      expectMode(false);
    },
  );

  it.each(['h', 'c', 'x'])('passes Alt+%s through without entering or executing a keytip', key => {
    mount();
    altDown();
    expectMode(false);
    expect(keyboard('keydown', key, { altKey: true }).defaultPrevented).toBe(false);
    expectMode(false);
    expect(keyboard('keypress', key, { altKey: true }).defaultPrevented).toBe(false);
    expect(keyboard('keyup', key, { altKey: true }).defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onHome).not.toHaveBeenCalled();
    expect(onLeaf).not.toHaveBeenCalled();
  });

  it('does not enter after a chord even when Alt is released before the character', () => {
    mount();
    altDown({ code: 'AltRight', location: 2 });
    keyboard('keydown', 'h', { altKey: true });
    expect(altUp({ code: 'AltRight', location: 2 }).defaultPrevented).toBe(true);
    expect(keyboard('keyup', 'h').defaultPrevented).toBe(false);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
    expect(onHome).not.toHaveBeenCalled();
    altTap();
    expectMode(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it.each(['Shift', 'Control', 'Tab', 'Enter', 'ArrowDown'])(
    'cancels pending entry if another key intervenes, including modifiers: %s',
    key => {
      mount();
      altDown();
      expect(keyboard('keydown', key, { altKey: true }).defaultPrevented).toBe(false);
      keyboard('keyup', key, { altKey: true });
      altUp();
      expectMode(false);
      expect(onEnter).not.toHaveBeenCalled();
      expect(onExit).not.toHaveBeenCalled();
    },
  );

  it.each(['preventDefault', 'stopPropagation', 'stopImmediatePropagation'] as const)(
    'never flashes keytips for an application-owned Alt+C shortcut using %s',
    action => {
      mount();
      const app = jest.fn((event: KeyboardEvent) => {
        event[action]();
      });
      target.addEventListener('keydown', app);
      altDown();
      expectMode(false);
      const event = keyboard('keydown', 'c', { altKey: true });
      expectMode(false);
      altUp();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(app).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(action === 'preventDefault');
      expectMode(false);
      expect(onEnter).not.toHaveBeenCalled();
      expect(onExit).not.toHaveBeenCalled();
      expect(onLeaf).not.toHaveBeenCalled();
    },
  );

  it('ignores repeated Alt keydowns until release and does not count them as another invocation', () => {
    mount();
    altDown({ code: 'AltRight', location: 2 });
    expect(altDown({ repeat: true }).defaultPrevented).toBe(true);
    expect(altDown({ repeat: true }).defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
    expect(altUp({ code: 'AltRight', location: 2 }).defaultPrevented).toBe(true);
    expectMode(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(altDown({ code: 'AltLeft', location: 1 }).defaultPrevented).toBe(false);
    expectMode(false);
    expect(altDown({ repeat: true }).defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
  });

  it('does not restart pending entry on Alt repeats after a chord', () => {
    mount();
    altDown();
    keyboard('keydown', 'c', { altKey: true });
    expect(altDown({ repeat: true }).defaultPrevented).toBe(true);
    altUp();
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('does not activate from an orphaned repeated keydown', () => {
    mount();
    expect(altDown({ repeat: true }).defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('cancels release before the entry callback transfers focus and accepts sequential input', () => {
    const release = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Alt' });
    let canceledOnEntry = false;
    const { getByRole } = render(
      <>
        <KeytipLayerBase
          {...props}
          onEnterKeytipMode={() => {
            canceledOnEntry = release.defaultPrevented;
            getByRole('button', { name: 'Home tab' }).focus();
          }}
        />
        <button>Home tab</button>
      </>,
    );
    target.focus();
    altDown();
    expect(doc.activeElement).toBe(target);
    expectMode(false);
    act(() => {
      target.dispatchEvent(release);
    });
    expect(canceledOnEntry).toBe(true);
    expect(doc.activeElement).toBe(getByRole('button', { name: 'Home tab' }));
    expectMode(true);
    const input = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'h' });
    act(() => {
      getByRole('button', { name: 'Home tab' }).dispatchEvent(input);
    });
    expect(input.defaultPrevented).toBe(true);
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  it('keeps activation canceled if the entry callback exits immediately', () => {
    mount({ onEnterKeytipMode: () => manager.exitKeytipMode() });
    expect(altDown().defaultPrevented).toBe(true);
    expect(onExit).not.toHaveBeenCalled();
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('does not restore consecutive gesture state after callback-driven exit and programmatic reentry', () => {
    let reentered = false;
    mount({
      onEnterKeytipMode: () => {
        if (!reentered) {
          reentered = true;
          manager.exitKeytipMode();
          manager.enterKeytipMode();
        }
      },
    });
    altTap();
    expectMode(true);
    expect(altDown().defaultPrevented).toBe(true);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
  });

  it.each([false, true])('decides cancellation before the exit callback: consecutive=%s', consecutive => {
    let canceledOnExit: boolean | undefined;
    mount({ onExitKeytipMode: event => (canceledOnExit = event?.defaultPrevented) });
    altTap();
    if (!consecutive) {
      keyboard('keydown', 'h');
    }
    expect(altDown().defaultPrevented).toBe(!consecutive);
    expect(canceledOnExit).toBe(!consecutive);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(!consecutive);
    expectMode(false);
  });

  it('passes both events of a consecutive second modifier invocation through', () => {
    mount();
    altTap();
    const app = jest.fn();
    target.addEventListener('keydown', app);
    target.addEventListener('keyup', app);
    expect(altDown().defaultPrevented).toBe(false);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(app).toHaveBeenCalledTimes(2);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('consumes a non-consecutive modifier exit after partial input', () => {
    mount();
    altTap();
    expect(keyboard('keydown', 'e').defaultPrevented).toBe(true);
    expect(layerRef.current!.getCurrentSequence()).toBe('e');
    expect(onLeaf).not.toHaveBeenCalled();
    expect(altDown().defaultPrevented).toBe(true);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
  });

  it('executes sequential keytip input once on keydown, not keypress', () => {
    mount();
    altTap();
    expect(keyboard('keydown', 'H').defaultPrevented).toBe(true);
    expect(keyboard('keypress', 'H').defaultPrevented).toBe(false);
    expect(onHome).toHaveBeenCalledTimes(1);
    expectMode(true);
    expect(keyboard('keydown', 'b').defaultPrevented).toBe(true);
    expect(onChild).toHaveBeenCalledTimes(1);
    expectMode(false);
  });

  it('does not resume tree navigation when a keytip callback exits the mode', () => {
    mount();
    onHome.mockImplementationOnce(() => manager.exitKeytipMode());
    altTap();
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
    expect(onHome).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expectMode(false);
  });

  it('finishes accepted input when its callback removes the activation policy', () => {
    const { rerender } = mount();
    onHome.mockImplementationOnce(() => rerender(<KeytipLayerBase {...props} keytipActivationBehavior={undefined} />));
    altTap();
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
    expect(onHome).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expectMode(false);
  });

  it('does not enable plain Alt entry unless it is configured as a start sequence', () => {
    mount({ keytipStartSequences: [{ key: '.', modifierKeys: [KeyCodes.alt] }] });
    expect(altDown().defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('buffers partial keydowns and consumes only matching input', () => {
    mount();
    altTap();
    expect(keyboard('keydown', 'e').defaultPrevented).toBe(true);
    expect(layerRef.current!.getCurrentSequence()).toBe('e');
    expect(keyboard('keydown', '1').defaultPrevented).toBe(true);
    expect(onLeaf).toHaveBeenCalledTimes(1);
    expectMode(false);
  });

  it('exits without consuming unmatched sequential input', () => {
    mount();
    altTap();
    expect(keyboard('keydown', 'x').defaultPrevented).toBe(false);
    expectMode(false);
    expect(onHome).not.toHaveBeenCalled();
  });

  it('exits and passes through a mismatch after partial input', () => {
    mount();
    altTap();
    keyboard('keydown', 'e');
    expect(keyboard('keydown', 'x').defaultPrevented).toBe(false);
    expectMode(false);
  });

  it.each(['.', 'Meta'])('preserves explicit legacy activation chords on keydown: %s', key => {
    mount();
    altDown();
    expectMode(false);
    expect(keyboard('keydown', key, { altKey: true }).defaultPrevented).toBe(true);
    expectMode(true);
    expect(onEnter).toHaveBeenCalledWith({ key, modifierKeys: [KeyCodes.alt] });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onExit).not.toHaveBeenCalled();
    expect(altUp().defaultPrevented).toBe(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  it('does not pass a subsequent Alt invocation through after a legacy chord', () => {
    mount();
    altDown();
    keyboard('keydown', '.', { altKey: true });
    altUp();
    expect(altDown().defaultPrevented).toBe(true);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
  });

  it('supports a legacy chord when the initial modifier keydown was not observed', () => {
    mount();
    expect(keyboard('keydown', '.', { altKey: true }).defaultPrevented).toBe(true);
    expectMode(true);
    expect(altUp().defaultPrevented).toBe(false);
    keyboard('keydown', 'h');
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  describe.each([false, true])('with consumeActivationEvent=%s', consumeActivationEvent => {
    it.each([
      { key: '.', consecutive: false, releaseModifierFirst: false },
      { key: '.', consecutive: false, releaseModifierFirst: true },
      { key: '.', consecutive: true, releaseModifierFirst: false },
      { key: '.', consecutive: true, releaseModifierFirst: true },
      { key: 'Meta', consecutive: false, releaseModifierFirst: false },
      { key: 'Meta', consecutive: false, releaseModifierFirst: true },
      { key: 'Meta', consecutive: true, releaseModifierFirst: false },
      { key: 'Meta', consecutive: true, releaseModifierFirst: true },
    ])(
      'does not reenter through an alias during the exiting Alt gesture: %j',
      ({ key, consecutive, releaseModifierFirst }) => {
        mount({ keytipActivationBehavior: { ...props.keytipActivationBehavior, consumeActivationEvent } });
        altTap();
        if (!consecutive) {
          keyboard('keydown', 'h');
        }

        expect(altDown().defaultPrevented).toBe(consumeActivationEvent && !consecutive);
        expectMode(false);
        expect(keyboard('keydown', key, { altKey: true }).defaultPrevented).toBe(false);
        expectMode(false);
        if (releaseModifierFirst) {
          expect(altUp({ metaKey: key === 'Meta' }).defaultPrevented).toBe(consumeActivationEvent && !consecutive);
          keyboard('keyup', key);
        } else {
          keyboard('keyup', key, { altKey: true });
          expect(altUp().defaultPrevented).toBe(consumeActivationEvent && !consecutive);
        }
        expectMode(false);
        expect(onEnter).toHaveBeenCalledTimes(1);
        expect(onExit).toHaveBeenCalledTimes(1);

        altDown();
        keyboard('keydown', key, { altKey: true });
        keyboard('keyup', key, { altKey: true });
        altUp();
        expectMode(true);
        expect(onEnter).toHaveBeenCalledTimes(2);
        expect(onExit).toHaveBeenCalledTimes(1);
      },
    );

    it.each(['.', 'Meta'])('recovers configured %s activation after an exiting Alt keyup is lost', key => {
      mount({ keytipActivationBehavior: { ...props.keytipActivationBehavior, consumeActivationEvent } });
      altTap();
      altDown();
      expectMode(false);
      keyboard('keydown', 'h');
      altDown();
      keyboard('keydown', key, { altKey: true });
      altUp();
      expectMode(true);
      expect(onEnter).toHaveBeenCalledTimes(2);
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onHome).not.toHaveBeenCalled();
    });

    it.each(['.', 'Meta'])('decides configured %s exit chord cancellation before the callback', key => {
      let canceledOnExit: boolean | undefined;
      const onExitChord = jest.fn((event?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
        canceledOnExit = event?.defaultPrevented;
      });
      mount({
        keytipStartSequences: [{ key, modifierKeys: [KeyCodes.alt] }],
        keytipExitSequences: [{ key, modifierKeys: [KeyCodes.alt] }],
        keytipActivationBehavior: { ...props.keytipActivationBehavior, consumeActivationEvent },
        onExitKeytipMode: onExitChord,
      });
      altDown();
      keyboard('keydown', key, { altKey: true });
      keyboard('keyup', key, { altKey: true });
      altUp();
      expectMode(true);

      altDown();
      expectMode(true);
      const event = keyboard('keydown', key, { altKey: true });
      expect(event.defaultPrevented).toBe(consumeActivationEvent);
      expect(canceledOnExit).toBe(consumeActivationEvent);
      expect(onExitChord).toHaveBeenCalledTimes(1);
      expect(onExitChord).toHaveBeenCalledWith(event);
      keyboard('keyup', key, { altKey: true });
      altUp();
      expectMode(false);
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('still consumes return navigation at child and root levels', () => {
      const onExitReturn = jest.fn();
      mount({
        keytipActivationBehavior: { ...props.keytipActivationBehavior, consumeActivationEvent },
        onExitKeytipMode: onExitReturn,
      });
      altTap();
      keyboard('keydown', 'h');
      expect(keyboard('keydown', 'Escape').defaultPrevented).toBe(true);
      expect(layerRef.current!.getKeytipTree().currentKeytip).toBe(layerRef.current!.getKeytipTree().root);
      expect(onExitReturn).not.toHaveBeenCalled();
      expect(keyboard('keydown', 'Escape').defaultPrevented).toBe(true);
      expect(onExitReturn).toHaveBeenCalledTimes(1);
      expectMode(false);
    });
  });

  it('does not execute held-Alt input after an explicit legacy activation chord', () => {
    mount();
    altDown();
    keyboard('keydown', '.', { altKey: true });
    expectMode(true);
    expect(keyboard('keydown', 'h', { altKey: true }).defaultPrevented).toBe(false);
    expect(onHome).not.toHaveBeenCalled();
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it.each(['preventDefault', 'stopPropagation', 'stopImmediatePropagation'] as const)(
    'gives a colliding sequential application shortcut priority with %s',
    action => {
      mount();
      altTap();
      const app = jest.fn((event: KeyboardEvent) => {
        event[action]();
      });
      target.addEventListener('keydown', app);
      const event = keyboard('keydown', 'h');
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(app).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(action === 'preventDefault');
      expect(onHome).not.toHaveBeenCalled();
      expectMode(false);
      expect(onExit).toHaveBeenCalledTimes(1);
    },
  );

  it('does not leave a stopped event that exits a later programmatic entry', () => {
    mount();
    altTap();
    target.addEventListener('keydown', event => event.stopPropagation());
    keyboard('keydown', 'h');
    act(() => {
      manager.exitKeytipMode();
      manager.enterKeytipMode();
      jest.runOnlyPendingTimers();
    });
    expectMode(true);
    expect(onHome).not.toHaveBeenCalled();
  });

  it('runs keytip input only after application handlers', () => {
    mount();
    altTap();
    const app = jest.fn(() => expect(onHome).not.toHaveBeenCalled());
    target.addEventListener('keydown', app);
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
    expect(app).toHaveBeenCalledTimes(1);
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  it.each([
    { key: 'AltGraph', altKey: true, ctrlKey: true },
    { key: 'Alt', altKey: true, ctrlKey: true },
    { key: 'Alt', altKey: true, ctrlKey: true, code: 'AltRight', location: 2 },
    { key: 'Alt', altKey: true, isComposing: true },
    { key: 'Process', altKey: true },
  ])('does not capture international or composition input: %j', init => {
    mount();
    expect(keyboard('keydown', init.key, init).defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('does not capture right Alt reported as AltGraph', () => {
    mount();
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Alt',
      code: 'AltRight',
      location: 2,
      altKey: true,
    });
    jest.spyOn(event, 'getModifierState').mockImplementation(modifier => modifier === 'AltGraph');
    act(() => {
      target.dispatchEvent(event);
    });
    expect(event.defaultPrevented).toBe(false);
    altUp();
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it.each([false, true])('clears active or pending mode for AltGraph typing: active=%s', active => {
    mount();
    altDown();
    if (active) {
      altUp();
    }
    expect(keyboard('keydown', 'AltGraph', { ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
  });

  it('cancels pending entry during composition and recovers after composition ends', () => {
    mount();
    altDown();
    act(() => {
      target.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    });
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(altDown().defaultPrevented).toBe(false);
    altUp();
    expect(onEnter).not.toHaveBeenCalled();
    act(() => {
      target.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
    });
    expect(altDown().defaultPrevented).toBe(true);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(true);
  });

  it.each(['manager', 'prop'])('does not consume activation or enter while disallowed by %s', source => {
    if (source === 'manager') {
      manager.shouldEnterKeytipMode = false;
    }
    mount({ enabled: source !== 'prop' });
    expect(altDown().defaultPrevented).toBe(false);
    expect(altUp().defaultPrevented).toBe(false);
    act(() => {
      manager.enterKeytipMode();
    });
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it.each([false, true])('clears pending or active gestures when disabled: active=%s', active => {
    const { rerender } = mount();
    altDown();
    if (active) {
      altUp();
    }
    rerender(<KeytipLayerBase {...props} enabled={false} />);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expect(altDown().defaultPrevented).toBe(false);
    rerender(<KeytipLayerBase {...props} enabled />);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    altTap();
    expectMode(true);
  });

  it('rechecks manager permission on keyup without flashing keytips', () => {
    mount();
    altDown();
    manager.shouldEnterKeytipMode = false;
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
  });

  it('rechecks the configured start sequence on keyup', () => {
    const { rerender } = mount();
    altDown();
    rerender(<KeytipLayerBase {...props} keytipStartSequences={[{ key: '.', modifierKeys: [KeyCodes.alt] }]} />);
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it.each([false, true])('removes pending or active behavior when the policy is removed: active=%s', active => {
    const { rerender } = mount();
    altDown();
    if (active) {
      altUp();
    }
    rerender(
      <KeytipLayerBase
        {...props}
        keytipActivationBehavior={undefined}
        keytipStartSequences={[{ key: '.', modifierKeys: [KeyCodes.alt] }]}
      />,
    );
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    keyboard('keydown', '.', { altKey: true });
    expectMode(true);
  });

  it('clears composition state and restores right Alt handling when the policy is reenabled', () => {
    const { rerender } = mount();
    act(() => {
      target.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    });
    rerender(<KeytipLayerBase {...props} keytipActivationBehavior={undefined} />);
    rerender(<KeytipLayerBase {...props} />);
    rerender(<KeytipLayerBase {...props} content="Updated instructions" />);
    expect(altDown({ code: 'AltRight', location: 2 }).defaultPrevented).toBe(true);
    expectMode(false);
    expect(altUp({ code: 'AltRight', location: 2 }).defaultPrevented).toBe(true);
    expectMode(true);
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it('does not claim input after the manager disallows active keytips', () => {
    mount();
    altTap();
    manager.shouldEnterKeytipMode = false;
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(false);
    expectMode(false);
    expect(onHome).not.toHaveBeenCalled();
  });

  it.each([false, true])('resets pending or active gestures on blur: active=%s', active => {
    mount();
    altDown();
    if (active) {
      altUp();
    }
    act(() => {
      win.dispatchEvent(new Event('blur'));
    });
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    altTap();
    expectMode(true);
  });

  it('does not enter on an orphaned keyup or a lost-keyup recovery path', () => {
    mount();
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    altDown();
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(false);
    expect(onHome).not.toHaveBeenCalled();
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    altTap();
    expectMode(true);
  });

  it('does not enter if another keyup intervened without an observed keydown', () => {
    mount();
    altDown();
    keyboard('keyup', 'h', { altKey: true });
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('does not enter if release was already default-prevented', () => {
    const prevent = (event: KeyboardEvent) => event.preventDefault();
    win.addEventListener('keyup', prevent, true);
    try {
      mount();
      altTap();
      expectMode(false);
      expect(onEnter).not.toHaveBeenCalled();
    } finally {
      win.removeEventListener('keyup', prevent, true);
    }
  });

  it('does not arm activation if keydown was already default-prevented', () => {
    const prevent = (event: KeyboardEvent) => event.preventDefault();
    win.addEventListener('keydown', prevent, true);
    try {
      mount();
      altTap();
      expectMode(false);
      expect(onEnter).not.toHaveBeenCalled();
    } finally {
      win.removeEventListener('keydown', prevent, true);
    }
  });

  it.each([{ isComposing: true }, { ctrlKey: true }, { shiftKey: true }, { metaKey: true }, { altKey: true }])(
    'does not enter when release no longer represents a standalone modifier tap: %j',
    init => {
      mount();
      altDown();
      altUp(init);
      expectMode(false);
      expect(onEnter).not.toHaveBeenCalled();
    },
  );

  it.each([false, true])('removes listeners and pending work on disposal: active=%s', active => {
    const { unmount } = mount();
    altDown();
    if (active) {
      altUp();
      target.addEventListener('keydown', event => event.stopPropagation());
      keyboard('keydown', 'h');
    }
    unmount();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(manager.inKeytipMode).toBe(false);
    expect(onHome).not.toHaveBeenCalled();
    expect(altUp().defaultPrevented).toBe(false);
    expect(altDown().defaultPrevented).toBe(false);
    mount();
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
    altTap();
    expectMode(true);
  });

  it.each([{ altKey: true }, { ctrlKey: true }, { metaKey: true }])(
    'does not execute modified input after programmatic entry: %j',
    init => {
      mount();
      act(() => {
        manager.enterKeytipMode();
      });
      expect(keyboard('keydown', 'h', init).defaultPrevented).toBe(false);
      expect(onHome).not.toHaveBeenCalled();
      expectMode(false);
    },
  );

  it('cancels pending activation when the manager enters and exits mode', () => {
    mount();
    altDown();
    act(() => {
      manager.enterKeytipMode();
      manager.exitKeytipMode();
    });
    expect(altUp().defaultPrevented).toBe(true);
    expectMode(false);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith(undefined);
  });

  it('preserves programmatic entry and exit, and escape return navigation', () => {
    mount();
    act(() => {
      manager.enterKeytipMode();
    });
    keyboard('keydown', 'h');
    expect(onHome).toHaveBeenCalledTimes(1);
    expect(keyboard('keydown', 'Escape').defaultPrevented).toBe(true);
    expect(layerRef.current!.getKeytipTree().currentKeytip).toBe(layerRef.current!.getKeytipTree().root);
    expect(keyboard('keydown', 'Escape').defaultPrevented).toBe(true);
    expectMode(false);
  });

  it.each(['Tab', 'Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])(
    'exits and passes through navigation input: %s',
    key => {
      mount();
      altTap();
      expect(keyboard('keydown', key).defaultPrevented).toBe(false);
      expectMode(false);
    },
  );

  it('supports release-only activation for modifiers other than Alt', () => {
    mount({ keytipStartSequences: [{ key: 'Control' }], keytipExitSequences: [{ key: 'Control' }] });
    expect(keyboard('keydown', 'Control', { ctrlKey: true }).defaultPrevented).toBe(true);
    expectMode(false);
    expect(keyboard('keyup', 'Control').defaultPrevented).toBe(true);
    expectMode(true);
    expect(keyboard('keydown', 'h').defaultPrevented).toBe(true);
    expect(onHome).toHaveBeenCalledTimes(1);
    expect(keyboard('keydown', 'Control', { ctrlKey: true }).defaultPrevented).toBe(true);
    expectMode(false);
    expect(keyboard('keyup', 'Control').defaultPrevented).toBe(true);
    expectMode(false);
  });

  it('can opt in without consuming activation, passing consecutive activations, or exiting on unmatched input', () => {
    mount({ keytipActivationBehavior: {} });
    expect(altDown().defaultPrevented).toBe(false);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(true);
    expect(keyboard('keydown', 'x').defaultPrevented).toBe(false);
    expectMode(true);
    expect(altDown().defaultPrevented).toBe(false);
    expectMode(false);
    expect(altUp().defaultPrevented).toBe(false);
    expectMode(false);
  });

  it('returns deliberate input matching results', () => {
    mount();
    let result: ReturnType<KeytipLayerBase['processInput']>;
    act(() => {
      result = layerRef.current!.processInput('h');
    });
    expect(result!).toBe('unmatched');
    altTap();
    act(() => {
      result = layerRef.current!.processInput('e');
    });
    expect(result!).toBe('partial');
    act(() => {
      result = layerRef.current!.processInput('1');
    });
    expect(result!).toBe('handled');
  });

  describe('without an activation policy', () => {
    const legacyProps: Partial<Omit<IKeytipLayerProps, 'ref'>> = {
      keytipActivationBehavior: undefined,
      keytipStartSequences: [{ key: '.', modifierKeys: [KeyCodes.alt] }],
      keytipExitSequences: [{ key: '.', modifierKeys: [KeyCodes.alt] }],
    };

    it('only attaches activation listeners while opted in, including when the policy changes', () => {
      manager.keytips = {};
      const addListener = jest.spyOn(win, 'addEventListener');
      const removeListener = jest.spyOn(win, 'removeEventListener');
      const events = ['keyup', 'blur', 'compositionstart', 'compositionend'];
      try {
        const { rerender } = mount(legacyProps);
        expect(addListener.mock.calls.filter(([type]) => events.includes(type))).toHaveLength(0);
        expect(
          addListener.mock.calls.filter(([type, , options]) => type === 'keydown' && options !== true),
        ).toHaveLength(0);
        addListener.mockClear();
        rerender(<KeytipLayerBase {...props} />);
        expect(addListener.mock.calls.filter(([type]) => events.includes(type)).map(([type]) => type)).toEqual(events);
        expect(
          addListener.mock.calls.filter(([type, , options]) => type === 'keydown' && options !== true),
        ).toHaveLength(1);
        removeListener.mockClear();
        rerender(<KeytipLayerBase {...props} {...legacyProps} />);
        expect(removeListener.mock.calls.filter(([type]) => events.includes(type)).map(([type]) => type)).toEqual(
          events,
        );
        expect(
          removeListener.mock.calls.filter(([type, , options]) => type === 'keydown' && options !== true),
        ).toHaveLength(1);
      } finally {
        addListener.mockRestore();
        removeListener.mockRestore();
      }
    });

    it('ignores the new enabled prop for legacy keyboard and programmatic entry', () => {
      const { rerender } = mount(legacyProps);
      rerender(<KeytipLayerBase {...props} {...legacyProps} enabled={false} />);
      expect(keyboard('keydown', '.', { altKey: true }).defaultPrevented).toBe(false);
      expectMode(true);
      rerender(<KeytipLayerBase {...props} {...legacyProps} enabled={false} content="Legacy" />);
      expectMode(true);
      act(() => {
        manager.exitKeytipMode();
        manager.enterKeytipMode();
      });
      expectMode(true);
      expect(onEnter).toHaveBeenCalledTimes(2);
    });

    it('preserves legacy keypress handling and does not dismiss on blur or composition', () => {
      mount(legacyProps);
      expect(altDown().defaultPrevented).toBe(false);
      expect(altUp().defaultPrevented).toBe(false);
      expectMode(false);
      keyboard('keydown', '.', { altKey: true });
      expectMode(true);
      act(() => {
        win.dispatchEvent(new Event('blur'));
        target.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
        target.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
      });
      expectMode(true);
      expect(altUp({ code: 'AltRight', location: 2 }).defaultPrevented).toBe(false);
      expect(keyboard('keydown', 'h').defaultPrevented).toBe(false);
      expect(onHome).not.toHaveBeenCalled();
      expect(keyboard('keypress', 'h').defaultPrevented).toBe(true);
      expect(onHome).toHaveBeenCalledTimes(1);
      expect(keyboard('keypress', 'x').defaultPrevented).toBe(true);
      expectMode(true);
    });

    it('retains legacy keydown activation even for a plain Alt start sequence', () => {
      mount({ keytipActivationBehavior: undefined });
      expect(altDown().defaultPrevented).toBe(false);
      expectMode(true);
      expect(altUp().defaultPrevented).toBe(false);
      expectMode(true);
    });

    it('retains legacy manager visibility on unmount', () => {
      const { unmount } = mount(legacyProps);
      keyboard('keydown', '.', { altKey: true });
      expectMode(true);
      const visible = manager.getKeytips().map(keytip => keytip.visible);
      unmount();
      expect(manager.inKeytipMode).toBe(true);
      expect(manager.getKeytips().map(keytip => keytip.visible)).toEqual(visible);
    });

    it('preserves the undefined return value of legacy input processing', () => {
      mount(legacyProps);
      let result: ReturnType<KeytipLayerBase['processInput']>;
      act(() => {
        result = layerRef.current!.processInput('x');
      });
      expect(result!).toBeUndefined();
      keyboard('keydown', '.', { altKey: true });
      act(() => {
        result = layerRef.current!.processInput('e');
      });
      expect(result!).toBeUndefined();
      expect(layerRef.current!.getCurrentSequence()).toBe('e');
      act(() => {
        result = layerRef.current!.processInput('1');
      });
      expect(result!).toBeUndefined();
      expect(onLeaf).toHaveBeenCalledTimes(1);
      expectMode(false);
    });

    it('still warns for duplicate keytips when a legacy activation is disallowed', () => {
      mount(legacyProps);
      const tree = layerRef.current!.getKeytipTree();
      const children = jest.spyOn(tree, 'getChildren');
      manager.shouldEnterKeytipMode = false;
      keyboard('keydown', '.', { altKey: true });
      expectMode(false);
      expect(children).toHaveBeenCalledTimes(1);
    });
  });
});
