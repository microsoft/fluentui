import * as React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createTabster, disposeTabster } from 'tabster';
import type { Types } from 'tabster';
import { getParent } from '@fluentui/react-utilities';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Dialog } from './Dialog';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import { DialogBody } from '../DialogBody/DialogBody';
import { DialogTitle } from '../DialogTitle/DialogTitle';
import { DialogActions } from '../DialogActions/DialogActions';

const Example = ({ open, children }: { open: boolean; children?: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>
    <Dialog open={open}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogActions>{children ?? <button>Cancel</button>}</DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </FluentProvider>
);

describe('Dialog with the local Tabster non-layout policy', () => {
  let tabster: Types.Tabster | undefined;

  const initialize = () => {
    const { container } = render(<div />);
    const view: (Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }) | null = container.ownerDocument.defaultView;
    if (!view) {
      throw new Error('The focus test requires a DOM window.');
    }
    tabster = createTabster(view, {
      autoRoot: {},
      controlTab: false,
      getParent,
      checkUncontrolledCompletely: element =>
        element.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper') === true || undefined,
      DOMAPI: view.__tabsterShadowDOMAPI,
      visibilityMode: 'non-layout',
    });
  };

  afterEach(() => {
    cleanup();
    if (tabster) {
      disposeTabster(tabster);
      tabster = undefined;
    }
  });

  it('preserves the default layout policy without opting in', () => {
    const result = render(<Example open />);
    expect(result.getByRole('dialog')).toHaveFocus();
    expect(result.getByRole('button', { name: 'Cancel' })).not.toHaveFocus();
  });

  it('focuses the first action when a controlled Dialog is initially open', async () => {
    initialize();
    const result = render(<Example open />);
    await waitFor(() => expect(result.getByRole('button', { name: 'Cancel' })).toHaveFocus());
  });

  it('focuses the first action when a controlled Dialog opens after mounting', async () => {
    initialize();
    const result = render(<Example open={false} />);
    expect(result.queryByRole('dialog')).toBeNull();
    result.rerender(<Example open />);
    await waitFor(() => expect(result.getByRole('button', { name: 'Cancel' })).toHaveFocus());
  });

  it('skips disabled and hidden actions without bypassing accessibility checks', async () => {
    initialize();
    const result = render(
      <Example open>
        <button disabled>Disabled</button>
        <button aria-hidden="true">ARIA hidden</button>
        <button hidden>HTML hidden</button>
        <span style={{ display: 'none' }}>
          <button>Hidden ancestor</button>
        </span>
        <button style={{ visibility: 'hidden' }}>CSS hidden</button>
        <button>Cancel</button>
      </Example>,
    );
    await waitFor(() => expect(result.getByRole('button', { name: 'Cancel' })).toHaveFocus());
  });

  it('retains the surface fallback when there is no eligible action', async () => {
    initialize();
    const result = render(
      <Example open>
        <button disabled>Disabled</button>
        <button hidden>Hidden</button>
      </Example>,
    );
    await waitFor(() => expect(result.getByRole('dialog')).toHaveFocus());
  });
});
