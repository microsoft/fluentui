import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import type { DialogProps } from './Dialog.types';
import { Dialog } from './Dialog';

// Frozen-state guard — see testing/freezeState.ts.
// The same mock also records what Dialog hands the headless hook, which is where a look prop would leak.
jest.mock('@fluentui/react-headless-components-preview/dialog', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dialog');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDialog: (...args: Parameters<typeof actual.useDialog>) => {
      hookProps.push(args[0] as DialogProps);

      return deepFreezeState(actual.useDialog(...args));
    },
  };
});

const hookProps: DialogProps[] = [];

beforeEach(() => {
  hookProps.length = 0;
});

const renderDialog = (props: Partial<DialogProps> = {}) => {
  const result = render(
    <Dialog open {...props}>
      <DialogSurface>Content</DialogSurface>
    </Dialog>,
  );

  return { ...result, surface: result.container.querySelector<HTMLDialogElement>('dialog')! };
};

/** What Dialog handed the headless hook on its first render. */
const handedOver = () => hookProps[0];

describe('Dialog', () => {
  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
    requiredProps: { children: <DialogSurface>Content</DialogSurface> } as never,
    // Dialog renders no element of its own, so there is no root to take a ref, a className or
    // native props.
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
  });

  it('renders the surface and no element of its own', () => {
    const { container, surface } = renderDialog();

    expect(surface).toHaveTextContent('Content');
    expect(container.children).toHaveLength(1);
  });

  it('defaults to the modal type', () => {
    expect(renderDialog().surface).toHaveAttribute('data-modal-type', 'modal');
  });

  it('passes everything through to the headless hook untouched', () => {
    const onOpenChange = jest.fn();
    renderDialog({ onOpenChange, modalType: 'alert', inertTrapFocus: true, unmountOnClose: false });

    expect(handedOver()).toMatchObject({
      onOpenChange,
      modalType: 'alert',
      inertTrapFocus: true,
      unmountOnClose: false,
      open: true,
    });
  });

  it('renders through a frozen headless state', () => {
    expect(() => renderDialog()).not.toThrow();
  });
});
