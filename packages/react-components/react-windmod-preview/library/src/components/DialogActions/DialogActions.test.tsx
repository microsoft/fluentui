import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import type { DialogActionsProps } from './DialogActions.types';
import { DialogActions } from './DialogActions';
import { dialogActionsClassNames } from './useDialogActionsStyles';

import styles from './DialogActions.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialogActions: (...args: Parameters<typeof actual.useDialogActions>) =>
      deepFreezeState(actual.useDialogActions(...args)),
  };
});

const renderActions = (props: Partial<DialogActionsProps> = {}) => {
  const result = render(<DialogActions {...props}>Actions</DialogActions>);

  return { ...result, actions: result.container.querySelector<HTMLDivElement>('[data-position]')! };
};

describe('DialogActions', () => {
  isConformant({
    Component: DialogActions,
    displayName: 'DialogActions',
  });

  it('carries the marker pair first, in the fixed order, then its own class', () => {
    const { actions } = renderActions();

    expect(actions.classList[0]).toBe('fui-dialog-actions');
    expect(actions.classList[1]).toBe('group/fui-dialog-actions');
    expect(actions).toHaveClass(styles.root);
    expect(dialogActionsClassNames.root).toBe('fui-dialog-actions group/fui-dialog-actions');
  });

  it('defaults to the end position', () => {
    const { actions } = renderActions();

    expect(actions).toHaveAttribute('data-position', 'end');
    expect(actions).toHaveClass(styles.positionEnd);
    expect(actions).not.toHaveClass(styles.positionStart);
  });

  it('takes the start position when asked', () => {
    const { actions } = renderActions({ position: 'start' });

    expect(actions).toHaveAttribute('data-position', 'start');
    expect(actions).toHaveClass(styles.positionStart);
    expect(actions).not.toHaveClass(styles.positionEnd);
  });

  it('stamps data-position as a value, never as a presence flag', () => {
    expect(renderActions({ position: 'start' }).actions.getAttribute('data-position')).toBe('start');
    expect(renderActions({ position: 'end' }).actions.getAttribute('data-position')).toBe('end');
  });

  it('covers the fluid × position matrix', () => {
    const cases = [
      { position: 'end', fluid: false, fluidClass: false },
      { position: 'end', fluid: true, fluidClass: true },
      { position: 'start', fluid: false, fluidClass: false },
      { position: 'start', fluid: true, fluidClass: true },
    ] as const;

    for (const { position, fluid, fluidClass } of cases) {
      const { actions } = renderActions({ position, fluid });

      expect(actions).toHaveClass(position === 'start' ? styles.positionStart : styles.positionEnd);
      expect(actions.classList.contains(styles.fluid)).toBe(fluidClass);
    }
  });

  it('stamps data-fluid as true or not at all', () => {
    expect(renderActions({ fluid: true }).actions).toHaveAttribute('data-fluid', 'true');
    expect(renderActions({ fluid: false }).actions).not.toHaveAttribute('data-fluid');
    expect(renderActions().actions).not.toHaveAttribute('data-fluid');
  });

  it('keeps a consumer className and passes the look props no further', () => {
    const { actions } = renderActions({ className: 'given' });

    expect(actions).toHaveClass('given');
    expect(actions).toHaveClass(styles.root);
    expect(actions).not.toHaveAttribute('position');
    expect(actions).not.toHaveAttribute('fluid');
  });

  it('renders through a frozen headless state', () => {
    expect(() => renderActions({ position: 'start', fluid: true })).not.toThrow();
  });
});
