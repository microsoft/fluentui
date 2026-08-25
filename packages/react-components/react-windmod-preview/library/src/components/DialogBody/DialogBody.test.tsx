import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { DialogBody } from './DialogBody';
import { dialogBodyClassNames } from './useDialogBodyStyles';

import styles from './DialogBody.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialogBody: (...args: Parameters<typeof actual.useDialogBody>) => deepFreezeState(actual.useDialogBody(...args)),
  };
});

describe('DialogBody', () => {
  isConformant({
    Component: DialogBody,
    displayName: 'DialogBody',
    subpath: 'dialog',
  });

  it('carries the marker pair first, in the fixed order, then its own class', () => {
    const { container } = render(<DialogBody>Body</DialogBody>);
    const body = container.firstElementChild!;

    expect(body.classList[0]).toBe('fui-dialog-body');
    expect(body.classList[1]).toBe('group/fui-dialog-body');
    expect(body).toHaveClass(styles.root);
    expect(dialogBodyClassNames.root).toBe('fui-dialog-body group/fui-dialog-body');
  });

  it('keeps a consumer className', () => {
    const { container } = render(<DialogBody className="given">Body</DialogBody>);
    const body = container.firstElementChild!;

    expect(body).toHaveClass('given');
    expect(body).toHaveClass(styles.root);
  });

  it('renders through a frozen headless state', () => {
    expect(() => render(<DialogBody>Body</DialogBody>)).not.toThrow();
  });
});
