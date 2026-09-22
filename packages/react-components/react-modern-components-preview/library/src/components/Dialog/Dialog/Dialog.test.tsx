import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Dialog } from './Dialog';
import { DialogActions } from '../DialogActions/DialogActions';
import { DialogBody } from '../DialogBody/DialogBody';
import { DialogHeader } from '../DialogHeader/DialogHeader';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import { DialogTitle } from '../DialogTitle/DialogTitle';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';

const DialogSurfaceWrapper = ({ children }: React.PropsWithChildren): React.ReactElement => (
  <Dialog defaultOpen>{children as React.ReactElement}</Dialog>
);

describe('Dialog', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
    };
  });

  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
    requiredProps: {
      defaultOpen: true,
      children: <DialogSurface aria-label="Dialog" />,
    },
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
  });

  isConformant({
    Component: DialogTrigger,
    displayName: 'DialogTrigger',
    requiredProps: { children: <button>Open dialog</button> },
    componentPath: require.resolve('../DialogTrigger/DialogTrigger'),
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'has-top-level-file',
      'has-top-level-file-extra',
      'make-styles-overrides-win',
    ],
  });

  isConformant({
    Component: DialogSurface,
    displayName: 'DialogSurface',
    requiredProps: { 'aria-label': 'Dialog' },
    componentPath: require.resolve('../DialogSurface/DialogSurface'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
    renderOptions: { wrapper: DialogSurfaceWrapper },
  });

  isConformant({
    Component: DialogHeader,
    displayName: 'DialogHeader',
    componentPath: require.resolve('../DialogHeader/DialogHeader'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DialogTitle,
    displayName: 'DialogTitle',
    requiredProps: { children: 'Title' },
    componentPath: require.resolve('../DialogTitle/DialogTitle'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DialogBody,
    displayName: 'DialogBody',
    componentPath: require.resolve('../DialogBody/DialogBody'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });
  isConformant({
    Component: DialogActions,
    displayName: 'DialogActions',
    componentPath: require.resolve('../DialogActions/DialogActions'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders the styled family while preserving semantic elements and consumer classes', () => {
    const surfaceRef = React.createRef<HTMLDialogElement>();
    const { getByRole, getByText } = render(
      <Dialog defaultOpen>
        <DialogSurface ref={surfaceRef} className="surface-consumer">
          <DialogHeader className="header-consumer">
            <DialogTitle className="title-consumer">Dialog title</DialogTitle>
          </DialogHeader>
          <DialogBody className="body-consumer">Dialog body</DialogBody>
          <DialogActions className="actions-consumer" fluid position="start">
            <button>Save</button>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );

    const surface = getByRole('dialog', { name: 'Dialog title' });
    const title = getByRole('heading', { name: 'Dialog title' });
    const header = title.closest('header');
    const body = getByText('Dialog body');
    const actions = getByRole('button', { name: 'Save' }).parentElement;

    expect(surfaceRef.current).toBe(surface);
    expect(surface).toHaveClass('fui-DialogSurface', 'surface-consumer');
    expect(header).toHaveClass('fui-DialogHeader', 'header-consumer');
    expect(title).toHaveClass('fui-DialogTitle', 'title-consumer');
    expect(body).toHaveClass('fui-DialogBody', 'body-consumer');
    expect(actions).toHaveClass('fui-DialogActions', 'actions-consumer');
    expect(actions).toHaveAttribute('data-position', 'start');
    expect(actions).toHaveAttribute('data-fluid', '');
    expect(surface).toHaveAttribute('aria-labelledby', title.getAttribute('id'));
  });

  it('composes headless trigger behavior through the styled surface', () => {
    const { getByRole, queryByRole } = render(
      <Dialog>
        <DialogTrigger>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Triggered dialog</DialogTitle>
          <DialogActions>
            <DialogTrigger>
              <button>Close dialog</button>
            </DialogTrigger>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );

    expect(queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Open dialog' }));
    expect(getByRole('dialog', { name: 'Triggered dialog' })).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Close dialog' }));
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders custom surface motion', () => {
    const { getByTestId } = render(
      <Dialog
        defaultOpen
        surfaceMotion={{
          children: (_, motionProps) => <div data-testid="custom-motion">{motionProps.children}</div>,
        }}
      >
        <DialogSurface aria-label="Dialog">Dialog content</DialogSurface>
      </Dialog>,
    );

    expect(getByTestId('custom-motion')).toHaveTextContent('Dialog content');
  });

  it('applies default DialogActions visual state', () => {
    const { getByText } = render(<DialogActions>Actions</DialogActions>);
    const actions = getByText('Actions');

    expect(actions).toHaveAttribute('data-position', 'end');
    expect(actions).not.toHaveAttribute('data-fluid');
  });
});
