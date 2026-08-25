import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Dialog } from '../Dialog/Dialog';
import { DialogSurface } from '../DialogSurface/DialogSurface';
import type { DialogTriggerState } from './DialogTrigger.types';
import { DialogTrigger } from './DialogTrigger';
import { dialogTriggerClassNames, useDialogTriggerStyles } from './useDialogTriggerStyles';

describe('DialogTrigger', () => {
  isConformant({
    Component: DialogTrigger,
    displayName: 'DialogTrigger',
    subpath: 'dialog',
    requiredProps: { children: <button>Open</button> } as never,
    // The trigger renders the consumer's own element, so there is no root of its own to take a
    // ref, a className or native props.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('stamps the marker pair on the cloned child', () => {
    const { getByRole } = render(
      <Dialog>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogSurface>Content</DialogSurface>
      </Dialog>,
    );
    const trigger = getByRole('button');

    expect(trigger.classList[0]).toBe('fui-dialog-trigger');
    expect(trigger.classList[1]).toBe('group/fui-dialog-trigger');
    expect(dialogTriggerClassNames.root).toBe('fui-dialog-trigger group/fui-dialog-trigger');
  });

  it('preserves a className the consumer put on the child', () => {
    const { getByRole } = render(
      <Dialog>
        <DialogTrigger>
          <button className="given">Open</button>
        </DialogTrigger>
        <DialogSurface>Content</DialogSurface>
      </Dialog>,
    );
    const trigger = getByRole('button');

    expect(trigger).toHaveClass('given');
    expect(trigger).toHaveClass('fui-dialog-trigger');
  });

  it('defaults to opening outside the surface and closing inside it', () => {
    const { getByText } = render(
      <Dialog open>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTrigger>
            <button>Close</button>
          </DialogTrigger>
        </DialogSurface>
      </Dialog>,
    );

    // aria-haspopup is the headless hook's own signal of which action the trigger resolved to.
    expect(getByText('Open')).toHaveAttribute('aria-haspopup', 'dialog');
    expect(getByText('Close')).not.toHaveAttribute('aria-haspopup');
  });

  it('honours an explicit action and still requests the change', () => {
    const onOpenChange = jest.fn();
    const { getByRole } = render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger action="open">
          <button>Open</button>
        </DialogTrigger>
        <DialogSurface>Content</DialogSurface>
      </Dialog>,
    );

    fireEvent.click(getByRole('button'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('leaves an empty trigger alone', () => {
    // applyTriggerPropsToChildren returns null for a childless trigger, so the styles hook is handed
    // a null child to clone; the guard is what keeps cloneElement from throwing on it.
    const state = Object.freeze({ children: null }) as unknown as DialogTriggerState;

    expect(useDialogTriggerStyles(state)).toBe(state);
  });
});
