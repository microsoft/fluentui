import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Dialog } from '../Dialog/Dialog';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import { DialogTitle } from './DialogTitle';
import { dialogTitleClassNames } from './useDialogTitleStyles';

import styles from './DialogTitle.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialogTitle: (...args: Parameters<typeof actual.useDialogTitle>) =>
      deepFreezeState(actual.useDialogTitle(...args)),
  };
});

describe('DialogTitle', () => {
  isConformant({
    Component: DialogTitle,
    displayName: 'DialogTitle',
    subpath: 'dialog',
  });

  it('carries the marker pair first, in the fixed order, then its own class', () => {
    const { container } = render(<DialogTitle>Title</DialogTitle>);
    const title = container.querySelector('h2')!;

    expect(title.classList[0]).toBe('fui-dialog-title');
    expect(title.classList[1]).toBe('group/fui-dialog-title');
    expect(title).toHaveClass(styles.root);
    expect(dialogTitleClassNames.root).toBe('fui-dialog-title group/fui-dialog-title');
  });

  it('keeps a consumer className', () => {
    const { container } = render(<DialogTitle className="given">Title</DialogTitle>);
    const title = container.querySelector('h2')!;

    expect(title).toHaveClass('given');
    expect(title).toHaveClass(styles.root);
  });

  it('reaches the DOM with the id the surface labels itself by', () => {
    const { container } = render(
      <Dialog open>
        <DialogSurface>
          <DialogTitle>Title</DialogTitle>
        </DialogSurface>
      </Dialog>,
    );

    const id = container.querySelector('h2')!.getAttribute('id');

    expect(id).toBeTruthy();
    expect(container.querySelector('dialog')).toHaveAttribute('aria-labelledby', id!);
  });

  it('renders through a frozen headless state', () => {
    expect(() => render(<DialogTitle>Title</DialogTitle>)).not.toThrow();
  });
});
