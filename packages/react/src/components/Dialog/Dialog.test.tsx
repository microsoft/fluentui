import * as React from 'react';
import { render, act } from '@testing-library/react';

import { Dialog } from './Dialog';
import { DialogBase } from './Dialog.base';
import { DialogContent } from './DialogContent';
import { DialogType } from './DialogContent.types'; // for express fluent assertions
import { resetIds, setWarningCallback } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';
import { expectNoHiddenParents } from '../../common/testUtilities';

describe('Dialog', () => {
  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    resetIds();
  });

  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('renders DialogContent correctly', () => {
    const { container } = render(<DialogContent />);
    expect(container).toMatchSnapshot();
  });

  it('respects a jsx title', () => {
    const { queryByText } = render(
      <DialogContent
        type={DialogType.normal}
        title={
          <div>
            <span>I am span 1</span>
            <span>I am span 2</span>
          </div>
        }
      />,
    );

    expect(queryByText('I am span 1')).toBeTruthy();
    expect(queryByText('I am span 2')).toBeTruthy();
  });

  it('respects titleProps', () => {
    const { getByTitle } = render(
      <DialogContent
        type={DialogType.normal}
        title="sample title"
        subText="Sample subtext"
        titleProps={{
          className: 'title_class',
          'aria-level': 3,
          title: 'tooltip',
        }}
      />,
    );

    const title = getByTitle('tooltip');
    expect(title.getAttribute('aria-level')).toBe('3');
    expect(title.className).toMatch(/\btitle_class\b/);
  });

  it('Fires dismissed after closing', () => {
    jest.useFakeTimers();
    const onDismissed = jest.fn();

    const { queryByRole, rerender } = render(<DialogBase hidden={false} modalProps={{ onDismissed }} />);

    expect(queryByRole('dialog')).toBeTruthy();

    rerender(<DialogBase hidden modalProps={{ onDismissed }} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByRole('dialog')).toBeFalsy();
    expect(onDismissed).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('deprecated isOpen controls open state of the dialog', () => {
    // suppress deprecation warning as error
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setWarningCallback(() => {});
    jest.useFakeTimers();
    const onDismissed = jest.fn();

    const { queryByRole, rerender } = render(<DialogBase isOpen modalProps={{ onDismissed }} />);

    expect(queryByRole('dialog')).toBeTruthy();

    rerender(<DialogBase isOpen={false} modalProps={{ onDismissed }} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByRole('dialog')).toBeFalsy();
    expect(onDismissed).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
    setWarningCallback();
  });

  it('Properly attaches auto-generated aria attributes IDs', () => {
    const { getByRole } = render(
      <DialogBase
        hidden={false}
        dialogContentProps={{
          title: 'sample title',
          subText: 'Sample subtext',
        }}
      />,
    );

    const dialogHTML = getByRole('dialog');

    const labelledby = dialogHTML.getAttribute('aria-labelledby')!;
    expect(labelledby).toMatch(/Dialog\d+-title/);
    expect(document.getElementById(labelledby)).not.toBeNull();

    expect(dialogHTML.getAttribute('aria-describedby')).toMatch(/Dialog\d+-subText/);
  });

  it('Properly attaches IDs when aria-describedby is passed', () => {
    const subTextAriaId = 'subtextariaid';
    const { getByRole } = render(
      <DialogBase
        hidden={false}
        modalProps={{
          subtitleAriaId: subTextAriaId,
        }}
        dialogContentProps={{
          title: 'sample title',
          subText: 'Sample subtext',
        }}
      />,
    );

    const dialogHTML = getByRole('dialog');
    expect(dialogHTML.getAttribute('aria-labelledby')).toMatch(/Dialog\d+-title/);
    expect(dialogHTML.getAttribute('aria-describedby')).toEqual(subTextAriaId);
  });

  it('Properly attaches IDs when aria-labelledby is passed', () => {
    const titleAriaId = 'titleariaid';
    const { getByRole } = render(
      <DialogBase
        hidden={false}
        modalProps={{
          titleAriaId,
        }}
        dialogContentProps={{
          title: 'sample title',
          subText: 'Sample subtext',
        }}
      />,
    );

    const dialogHTML = getByRole('dialog');
    expect(dialogHTML.getAttribute('aria-labelledby')).toEqual(titleAriaId);
    expect(dialogHTML.getAttribute('aria-describedby')).toMatch(/Dialog\d+-subText/);
  });

  it('deprecated titleId prop should be used if titleProps.id is not passed', () => {
    // Prevent warn deprecations from failing test
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setWarningCallback(() => {});

    const titleId = 'title_id';
    render(
      <DialogBase
        hidden={false}
        dialogContentProps={{
          titleId,
          title: 'sample title',
        }}
      />,
    );

    const dialogTitle = document.getElementById(titleId);
    expect(dialogTitle).toBeTruthy();

    setWarningCallback();
  });

  it('deprecated titleId prop should not be used if titleProps.id is undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setWarningCallback(() => {});

    const titleId = 'title_id';
    render(
      <DialogBase
        hidden={false}
        dialogContentProps={{
          titleId,
          title: 'sample title',
          titleProps: { id: undefined },
        }}
      />,
    );

    const dialogTitle = document.getElementById(titleId);
    expect(dialogTitle).toBeFalsy();

    setWarningCallback();
  });

  it('titleProps.id should be used if deprecated titleId is also passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setWarningCallback(() => {});

    const titleId = 'title_id';
    render(
      <DialogBase
        hidden={false}
        dialogContentProps={{
          titleId: `${titleId}_deprecated`,
          title: 'sample title',
          titleProps: { id: titleId },
        }}
      />,
    );

    const dialogTitle = document.getElementById(titleId);
    expect(dialogTitle).toBeTruthy();

    setWarningCallback();
  });

  describe('enableAriaHiddenSiblings', () => {
    // These tests cover functionality inherited from Modal: when the dialog is open, all siblings
    // outside the *content's* DOM tree should be hidden. The content is rendered in a portal
    // (not under the same div as the rest of the React-rendered elements), so to test that a
    // sibling element gets properly hidden, the sibling must be attached directly to document.body.
    let sibling: HTMLElement;

    beforeEach(() => {
      sibling = document.createElement('div');
      sibling.textContent = 'sibling';
      document.body.appendChild(sibling);
    });

    afterEach(() => {
      sibling.remove();
    });

    it('hides siblings when open', () => {
      const { getByText } = render(<Dialog hidden={false}>content</Dialog>);

      expectNoHiddenParents(getByText('content'));

      expect(getByText('sibling').getAttribute('aria-hidden')).toBe('true');
    });

    it('does not hide siblings when closed', () => {
      const { queryByText } = render(<Dialog hidden>content</Dialog>);

      expect(queryByText('content')).toBeFalsy(); // verify it's closed

      expectNoHiddenParents(queryByText('sibling')!);
    });
  });
});
