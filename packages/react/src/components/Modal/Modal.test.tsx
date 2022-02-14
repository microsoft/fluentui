import * as React from 'react';
import { render, act } from '@testing-library/react';
import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { expectNoHiddenParents } from '../../common/testUtilities';
import { resetIds } from '../../Utilities';

describe('Modal', () => {
  beforeEach(() => {
    resetIds();
  });
  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });
  afterAll(() => {
    resetIds();
  });

  isConformant({
    Component: Modal,
    displayName: 'Modal',
    requiredProps: { isOpen: true },
    componentPath: path.join(__dirname, 'Modal.ts'),
    disabledTests: ['component-handles-classname'],
  });

  it('renders Modal correctly', () => {
    const { queryByText } = render(
      <Modal isOpen className="test-className" containerClassName="test-containerClassName">
        Test Content
      </Modal>,
    );

    expect(queryByText('Test Content')).toBeTruthy();

    expect(document.body).toMatchSnapshot();
  });

  it('renders Modeless Modal correctly', () => {
    const { queryByText } = render(
      <Modal isOpen isModeless className="test-className" containerClassName="test-containerClassName">
        Test Content
      </Modal>,
    );

    expect(queryByText('Test Content')).toBeTruthy();

    expect(document.body).toMatchSnapshot();
  });

  it('renders Draggable Modal correctly', () => {
    render(
      <Modal
        isOpen
        isModeless
        className="test-className"
        containerClassName="test-containerClassName"
        dragOptions={{
          moveMenuItemText: 'Move',
          closeMenuItemText: 'Close',
          menu: ContextualMenu,
        }}
      >
        Test Content
      </Modal>,
    );
    expect(document.body).toMatchSnapshot();
  });

  it('uses ARIA role alertdialog when isAlert is true ', () => {
    const { queryByRole } = render(
      <Modal isOpen isAlert>
        Test Content
      </Modal>,
    );
    expect(queryByRole('alertdialog')).toBeTruthy();
  });

  it('uses ARIA role dialog when isModeless and isBlocking are true', () => {
    const { queryByRole } = render(
      <Modal isOpen isAlert={false} isModeless isBlocking>
        Test Content
      </Modal>,
    );
    expect(queryByRole('dialog')).toBeTruthy();
  });

  it('uses ARIA role dialog when isAlert is false', () => {
    const { queryByRole } = render(
      <Modal isOpen isAlert={false} isBlocking>
        Test Content
      </Modal>,
    );
    expect(queryByRole('dialog')).toBeTruthy();
  });

  it('uses ARIA role alertdialog when isBlocking is true', () => {
    const { queryByRole } = render(
      <Modal isOpen isBlocking>
        Test Content
      </Modal>,
    );
    expect(queryByRole('alertdialog')).toBeTruthy();
  });

  describe('enableAriaHiddenSiblings', () => {
    // When the modal is open, all siblings outside the *content's* DOM tree should be hidden.
    // The content is rendered in a portal (not under the same div as the rest of the React-rendered
    // elements), so to test that a sibling element gets properly hidden, the sibling must be
    // attached directly to document.body.
    let sibling: HTMLElement;

    beforeEach(() => {
      sibling = document.createElement('div');
      sibling.textContent = 'sibling';
      document.body.appendChild(sibling);
    });

    afterEach(() => {
      sibling.remove();
    });

    it('defaults to enableAriaHiddenSiblings=true when isModeless is unspecified', () => {
      const { getByText } = render(<Modal isOpen>content</Modal>);

      expectNoHiddenParents(getByText('content'));

      expect(getByText('sibling').getAttribute('aria-hidden')).toBe('true');
    });

    it('respects enableAriaHiddenSiblings=false', () => {
      const { getByText } = render(
        <Modal isOpen enableAriaHiddenSiblings={false}>
          content
        </Modal>,
      );

      expectNoHiddenParents(getByText('content'));

      expectNoHiddenParents(getByText('sibling'));
    });

    it('does not hide siblings when isModeless=true', () => {
      const { getByText } = render(
        <Modal isOpen isModeless>
          content
        </Modal>,
      );

      expectNoHiddenParents(getByText('content'));

      expectNoHiddenParents(getByText('sibling'));
    });

    it('does not hide siblings when closed', () => {
      const { queryByText } = render(<Modal isOpen={false}>content</Modal>);

      expect(queryByText('content')).toBeFalsy(); // verify it's closed

      expectNoHiddenParents(queryByText('sibling')!);
    });

    it('un-hides siblings after closing', () => {
      jest.useFakeTimers();

      const { queryByText, rerender } = render(<Modal isOpen>content</Modal>);
      expect(queryByText('sibling')!.getAttribute('aria-hidden')).toBe('true');

      // close the modal and verify siblings get un-hidden
      rerender(<Modal isOpen={false}>content</Modal>);
      act(() => {
        jest.runAllTimers();
      });
      expect(queryByText('content')).toBeFalsy();

      expectNoHiddenParents(queryByText('sibling')!);
    });
  });
});
