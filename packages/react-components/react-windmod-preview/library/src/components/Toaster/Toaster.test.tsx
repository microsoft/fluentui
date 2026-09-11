import * as React from 'react';
import { render } from '@testing-library/react';
import { useToastController } from '@fluentui/react-headless-components-preview/toast';
import type { ToastPosition } from '@fluentui/react-headless-components-preview/toast';

import { isConformant } from '../../testing/isConformant';
import { Toaster } from './Toaster';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { toasterOffset } from './toasterOffset';
import { toasterClassNames, useToasterStyles } from './useToasterStyles';

import styles from './Toaster.module.css';

const positions: ToastPosition[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'top', 'bottom'];

/**
 * The Toaster subscribes to the state machine in a passive effect, and passive effects flush
 * children before parents — so the dispatch has to come from a LATER SIBLING, never a descendant,
 * or it lands before the subscription exists and is dropped.
 */
const Dispatcher = ({ toasterId, dispatchTo }: { toasterId: string; dispatchTo: ToastPosition[] }) => {
  const { dispatchToast } = useToastController(toasterId);

  React.useEffect(() => {
    dispatchTo.forEach(position => dispatchToast(<span>toast</span>, { position, timeout: -1 }));
  }, [dispatchToast, dispatchTo]);

  return null;
};

let toasterCount = 0;

const renderToaster = (props: Partial<ToasterProps> = {}, dispatchTo: ToastPosition[] = positions) => {
  const toasterId = `toaster-${(toasterCount += 1)}`;
  const { container } = render(
    <>
      <Toaster toasterId={toasterId} {...props} />
      <Dispatcher toasterId={toasterId} dispatchTo={dispatchTo} />
    </>,
  );

  return {
    container,
    containers: Array.from(container.querySelectorAll<HTMLElement>('[data-toaster-position]')),
    at: (position: ToastPosition) => container.querySelector<HTMLElement>(`[data-toaster-position="${position}"]`)!,
  };
};

/** A minimal state shaped like the headless hook's, for the pure-function assertions. */
const stateWith = (slot: Record<string, unknown> | undefined, offset?: ToasterState['offset']) =>
  ({
    components: {},
    root: { className: 'root-slot' },
    bottomStart: undefined,
    bottomEnd: slot,
    topStart: undefined,
    topEnd: undefined,
    top: undefined,
    bottom: undefined,
    offset,
  }) as never as ToasterState;

describe('Toaster', () => {
  isConformant({
    Component: Toaster,
    displayName: 'Toaster',
    // The Toaster renders no element of its own — renderToaster emits only the announcer and the
    // position containers, and with no toasts dispatched it emits nothing at all.
    disabledTests: [
      'component-has-root-ref',
      'component-handles-ref',
      'component-handles-classname',
      'make-styles-overrides-win',
    ],
  });

  it('classes all six position containers, and only them', () => {
    const { containers } = renderToaster();

    expect(containers).toHaveLength(positions.length);
    positions.forEach(position => {
      const element = containers.find(node => node.dataset.toasterPosition === position)!;

      expect(element).toHaveClass('fui-toaster');
      expect(element).toHaveClass('group/fui-toaster');
      expect(element.classList[0]).toBe('fui-toaster');
      expect(element).toHaveClass(styles.position);
      expect(element.className).not.toContain('undefined');
    });
    expect(toasterClassNames.root).toBe('fui-toaster group/fui-toaster');
  });

  it('leaves the headless stamps alone', () => {
    const container = renderToaster({}, ['top-end']).at('top-end');

    expect(container.getAttribute('role')).toBe('list');
    expect(container.getAttribute('popover')).toBe('manual');
    expect(container.querySelectorAll('[role="listitem"]')).toHaveLength(1);
  });

  it('does not style the unrendered root slot', () => {
    const state = stateWith({ className: 'given' });
    const next = useToasterStyles(state);

    expect(next.root).toBe(state.root);
    expect(next.root.className).toBe('root-slot');
  });

  it('writes no inline style by default', () => {
    expect(renderToaster({}, ['bottom-end']).at('bottom-end').getAttribute('style')).toBeNull();
    expect(useToasterStyles(stateWith({})).bottomEnd!.style).toBeUndefined();
  });

  it('writes the two custom properties for a supplied offset', () => {
    const element = renderToaster({ offset: { horizontal: 40, vertical: 60 } }, ['bottom-end']).at('bottom-end');

    expect(element.style.getPropertyValue('--fui-toaster-offset-inline')).toBe('40px');
    expect(element.style.getPropertyValue('--fui-toaster-offset-block')).toBe('60px');
  });

  it('lets a consumer style win over the offset properties', () => {
    const slot = { style: { '--fui-toaster-offset-inline': '1px', opacity: 0.5 } };
    const next = useToasterStyles(stateWith(slot, { horizontal: 40, vertical: 60 }));

    expect(next.bottomEnd!.style).toEqual({
      '--fui-toaster-offset-inline': '1px',
      '--fui-toaster-offset-block': '60px',
      opacity: 0.5,
    });
  });

  it('returns new state without mutating what it was given', () => {
    const slot = Object.freeze({ className: 'given' });
    const state = Object.freeze(stateWith(slot));

    const next = useToasterStyles(state);

    expect(next).not.toBe(state);
    expect(next.bottomEnd).not.toBe(slot);
    expect(slot.className).toBe('given');
  });

  describe('toasterOffset', () => {
    it('returns nothing without an offset, so the CSS defaults stand', () => {
      expect(toasterOffset('bottom-end', undefined)).toBeUndefined();
    });

    it('defaults the horizontal offset to 20 on the corners and 0 on the centred pair', () => {
      expect(toasterOffset('bottom-end', { vertical: 8 })).toEqual({
        '--fui-toaster-offset-inline': '20px',
        '--fui-toaster-offset-block': '8px',
      });
      expect(toasterOffset('top', { vertical: 8 })).toEqual({
        '--fui-toaster-offset-inline': '0px',
        '--fui-toaster-offset-block': '8px',
      });
      expect(toasterOffset('bottom', { vertical: 8 })).toEqual({
        '--fui-toaster-offset-inline': '0px',
        '--fui-toaster-offset-block': '8px',
      });
    });

    it('defaults the vertical offset to 16', () => {
      expect(toasterOffset('top-start', { horizontal: 4 })!['--fui-toaster-offset-block']).toBe('16px');
    });

    it('reads the entry for this position out of a per-position record', () => {
      const offset = { 'top-start': { horizontal: 4, vertical: 5 }, 'top-end': { horizontal: 6, vertical: 7 } };

      expect(toasterOffset('top-start', offset)).toEqual({
        '--fui-toaster-offset-inline': '4px',
        '--fui-toaster-offset-block': '5px',
      });
      expect(toasterOffset('top-end', offset)).toEqual({
        '--fui-toaster-offset-inline': '6px',
        '--fui-toaster-offset-block': '7px',
      });
      // A position the record omits falls back to the same defaults as an empty offset.
      expect(toasterOffset('bottom', offset)).toEqual({
        '--fui-toaster-offset-inline': '0px',
        '--fui-toaster-offset-block': '16px',
      });
    });
  });
});
