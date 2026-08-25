import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Dialog } from '../Dialog/Dialog';
import { DialogTitle } from '../DialogTitle/DialogTitle';
import type { DialogSurfaceState } from './DialogSurface.types';
import { DialogSurface } from './DialogSurface';
import { dialogSurfaceClassNames, useDialogSurfaceStyles } from './useDialogSurfaceStyles';

import styles from './DialogSurface.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialogSurface: (...args: Parameters<typeof actual.useDialogSurface>) =>
      deepFreezeState(actual.useDialogSurface(...args)),
  };
});

const Open = ({ children }: { children: React.ReactNode }) => <Dialog open>{children as never}</Dialog>;

const renderSurface = (ui: React.ReactElement) => {
  const result = render(<Open>{ui}</Open>);

  return { ...result, surface: result.container.querySelector<HTMLDialogElement>('dialog')! };
};

describe('DialogSurface', () => {
  isConformant({
    Component: DialogSurface,
    displayName: 'DialogSurface',
    subpath: 'dialog',
    // The surface only renders inside an open Dialog: closed and unmountOnClose (the default) it
    // deliberately returns null.
    renderOptions: { wrapper: Open },
  });

  it('carries the marker pair first, in the fixed order, then its own class', () => {
    const { surface } = renderSurface(<DialogSurface>Content</DialogSurface>);

    expect(surface.classList[0]).toBe('fui-dialog-surface');
    expect(surface.classList[1]).toBe('group/fui-dialog-surface');
    expect(surface).toHaveClass(styles.root);
    expect(dialogSurfaceClassNames.root).toBe('fui-dialog-surface group/fui-dialog-surface');
  });

  it('keeps a consumer className and style', () => {
    const { surface } = renderSurface(
      <DialogSurface className="given" style={{ zIndex: 3 }}>
        Content
      </DialogSurface>,
    );

    expect(surface).toHaveClass('given');
    expect(surface).toHaveClass(styles.root);
    expect(surface.style.zIndex).toBe('3');
  });

  it('leaves the headless attributes in place and adds none of its own', () => {
    const { surface } = renderSurface(
      <DialogSurface>
        <DialogTitle>Title</DialogTitle>
      </DialogSurface>,
    );

    expect(surface).toHaveAttribute('data-open', '');
    expect(surface).toHaveAttribute('data-modal-type', 'modal');
    expect(surface).toHaveAttribute('aria-modal', 'true');
    expect(surface).toHaveAttribute('tabindex', '-1');
    expect(surface.getAttribute('aria-labelledby')).toBe(surface.querySelector('h2')!.getAttribute('id'));
  });

  it('stamps only data-nested and className on top of the headless state', () => {
    const state = {
      components: { root: 'dialog' },
      root: { 'data-open': '', 'data-modal-type': 'modal' },
      nested: false,
    } as unknown as DialogSurfaceState;

    const added = Object.keys(useDialogSurfaceStyles(state).root).filter(key => !(key in state.root));

    // Duplicating a headless stamp is the mutation this guards: data-open and data-modal-type are
    // the headless hook's to own.
    expect(added.sort()).toEqual(['className', 'data-nested']);
  });

  it('marks a nested surface, reading the flag from the dialog context', () => {
    const { container } = render(
      <Dialog open>
        <DialogSurface>
          <Dialog open>
            <DialogSurface>Inner</DialogSurface>
          </Dialog>
        </DialogSurface>
      </Dialog>,
    );

    const [outer, inner] = Array.from(container.querySelectorAll('dialog'));

    expect(outer).not.toHaveAttribute('data-nested');
    expect(inner).toHaveAttribute('data-nested', 'true');
  });

  it('renders each modalType the headless hook supports', () => {
    // `alert` differs from `modal` in exactly two stamps and neither package asserted the role, so
    // a regression to a plain dialog would be silent. No style distinguishes the two — the only
    // selector on data-modal-type is the non-modal backdrop override — which is precisely why the
    // role needs a test: nothing else here would notice it going missing.
    const modalTypes = [
      ['modal', 'modal', null],
      ['alert', 'alert', 'alertdialog'],
      ['non-modal', 'non-modal', null],
    ] as const;

    for (const [modalType, expected, role] of modalTypes) {
      const { container } = render(
        <Dialog open modalType={modalType}>
          <DialogSurface>Content</DialogSurface>
        </Dialog>,
      );
      const surface = container.querySelector('dialog')!;

      expect(surface).toHaveAttribute('data-modal-type', expected);
      expect(surface).toHaveClass(styles.root);

      if (role) {
        expect(surface).toHaveAttribute('role', role);
      } else {
        expect(surface).not.toHaveAttribute('role');
      }
    }
  });

  it('renders through a frozen headless state', () => {
    expect(() => renderSurface(<DialogSurface>Content</DialogSurface>)).not.toThrow();
  });
});
