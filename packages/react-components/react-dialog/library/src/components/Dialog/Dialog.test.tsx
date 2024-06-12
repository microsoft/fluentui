import * as React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from './Dialog';
import { DialogProps } from './Dialog.types';
import { isConformant } from '../../testing/isConformant';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { makeStyles, mergeClasses } from '@griffel/react';
import { DialogSurface, DialogSurfaceProps } from '../../DialogSurface';

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

  it('renders a default state', () => {
    const result = render(
      <Dialog>
        <div>Default Dialog</div>
      </Dialog>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('Testing DialogSurface with toBeVisible works as expected', () => {
    // eslint-disable-next-line @griffel/styles-file
    const useStyles = makeStyles({
      root: {
        left: '2px',
      },
    });
    const CustomDialogSurface = React.forwardRef<HTMLDivElement, DialogSurfaceProps>((props, ref) => {
      const styles = useStyles();
      return <DialogSurface ref={ref} className={mergeClasses(styles.root, props.className)} {...props} />;
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

    result.getByTestId('trigger').click();

    expect(result.getByTestId('surface-content')).toBeInTheDocument();
    expect(result.getByTestId('surface-content')).toBeVisible();

    result.getByTestId('trigger-close').click();
    expect(result.queryByTestId('surface-content')).toBeNull();
  });
});
