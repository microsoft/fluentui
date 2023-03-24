import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dialog } from './Dialog';
import { DialogProps } from './Dialog.types';
import { isConformant } from '../../testing/isConformant';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { DialogSurface } from '../DialogSurface/DialogSurface';

describe('Dialog', () => {
  isConformant<DialogProps>({
    Component: Dialog,
    displayName: 'Dialog',
    disabledTests: [
      // Dialog does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // TODO:
      // onOpenChange: A second (data) argument cannot be a union
      'consistent-callback-args',
      // Dialog does not have own styles
      'make-styles-overrides-win',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <Dialog>
        <div>Default Dialog</div>
      </Dialog>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('should focus on first element', () => {
    const result = render(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <button data-testid="btn-open-dialog">Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <button data-testid="btn-inside-dialog">focusable element inside dialog</button>
        </DialogSurface>
      </Dialog>,
    );
    expect(result.queryByTestId('btn-inside-dialog')).not.toBeInTheDocument();

    fireEvent.click(result.getByTestId('btn-open-dialog'));

    expect(result.getByTestId('btn-inside-dialog')).toBeInTheDocument();
    expect(result.getByTestId('btn-inside-dialog')).toHaveFocus();
  });
});
