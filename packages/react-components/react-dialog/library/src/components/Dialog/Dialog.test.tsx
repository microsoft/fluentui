import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Dialog } from './Dialog';
import type { DialogProps } from './Dialog.types';
import { isConformant } from '../../testing/isConformant';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { clsx } from 'clsx';
import type { DialogSurfaceProps } from '../../DialogSurface';
import { DialogSurface } from '../../DialogSurface';

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
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // Dialog owns no element and no styles hook, so it stamps no named-group marker and
      // there is nothing for `component-has-group-marker` (a default test since
      // DECISIONS.md D16.6) to target. Its child components carry the markers —
      // `group/fui-dialog-surface`, `group/fui-dialog-body`, and so on.
      'component-has-group-marker',
      // TODO:
      // onOpenChange: A second (data) argument cannot be a union
      'consistent-callback-args',
      // Dialog does not have own styles
    ],
  });

  it('renders a default state', () => {
    const result = render(
      <Dialog>
        <div>Default Dialog</div>
      </Dialog>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('Testing DialogSurface with toBeVisible works as expected', () => {
    // Was a Griffel makeStyles rule (`left: 2px`); a plain class + <style> tag keeps the
    // fixture identical without Griffel (Griffel → Tailwind + CSS Modules migration, S-H).
    const customSurfaceClassName = 'dialog-test-custom-surface';
    const CustomDialogSurface = React.forwardRef<HTMLDivElement, DialogSurfaceProps>((props, ref) => {
      return (
        <>
          <style>{`.${customSurfaceClassName} { left: 2px; }`}</style>
          <DialogSurface ref={ref} className={clsx(customSurfaceClassName, props.className)} {...props} />
        </>
      );
    });

    const result = render(
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <button data-testid="trigger">Open dialog</button>
        </DialogTrigger>
        <CustomDialogSurface>
          <div data-testid="surface-content">content in surface</div>

          <DialogTrigger>
            <button data-testid="trigger-close">Close dialog</button>
          </DialogTrigger>
        </CustomDialogSurface>
      </Dialog>,
    );

    fireEvent.click(result.getByTestId('trigger'));

    expect(result.getByTestId('surface-content')).toBeInTheDocument();
    expect(result.getByTestId('surface-content')).toBeVisible();

    fireEvent.click(result.getByTestId('trigger-close'));
    expect(result.queryByTestId('surface-content')).toBeNull();
  });
});
