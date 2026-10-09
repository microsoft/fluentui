import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { DialogHeader } from './DialogHeader';
import { dialogHeaderClassNames } from './useDialogHeaderStyles';

import styles from './DialogHeader.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialogHeader: (...args: Parameters<typeof actual.useDialogHeader>) =>
      deepFreezeState(actual.useDialogHeader(...args)),
  };
});

describe('DialogHeader', () => {
  isConformant({
    Component: DialogHeader,
    displayName: 'DialogHeader',
  });

  it('carries the marker pair first, in the fixed order, then its own class', () => {
    const { container } = render(<DialogHeader>Header</DialogHeader>);
    const header = container.querySelector('header')!;

    expect(header.classList[0]).toBe('fui-dialog-header');
    expect(header.classList[1]).toBe('group/fui-dialog-header');
    expect(header).toHaveClass(styles.root);
    expect(dialogHeaderClassNames.root).toBe('fui-dialog-header group/fui-dialog-header');
  });

  it('keeps a consumer className', () => {
    const { container } = render(<DialogHeader className="given">Header</DialogHeader>);
    const header = container.querySelector('header')!;

    expect(header).toHaveClass('given');
    expect(header).toHaveClass(styles.root);
  });

  it('renders through a frozen headless state', () => {
    expect(() => render(<DialogHeader>Header</DialogHeader>)).not.toThrow();
  });
});
