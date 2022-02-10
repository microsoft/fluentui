import * as React from 'react';
import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { safeCreate } from '@fluentui/test-utilities';
import { render, act } from '@testing-library/react';
import { resetIds } from '../../Utilities';
import { Popup } from '../Popup/Popup';
import { expectNoHiddenParents } from '../../common/testUtilities';

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
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>,
      component => {
        expect(component.toJSON()).toMatchSnapshot();
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders Modeless Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });
    safeCreate(
      <Modal
        isOpen={true}
        isModeless={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
      >
        Test Content
      </Modal>,
      component => {
        expect(component!.toJSON()).toMatchSnapshot();
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders Draggable Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal
        isOpen={true}
        isModeless={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
        dragOptions={{
          moveMenuItemText: 'Move',
          closeMenuItemText: 'Close',
          menu: ContextualMenu,
        }}
      >
        Test Content
      </Modal>,
      component => {
        expect(component!.toJSON()).toMatchSnapshot();
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders a Modal with ARIA role alertDialog when isAlert is true ', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal isOpen={true} isAlert={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>,
      component => {
        const componentInstance = component.root;
        expect(componentInstance.findByType(Popup).props.role).toBe('alertdialog');
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders Modal with ARIA role dialog when isModeless and isBlocking are set to true', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal
        isOpen={true}
        isAlert={false}
        isModeless={true}
        isBlocking={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
      >
        Test Content
      </Modal>,
      component => {
        const componentInstance = component.root;
        expect(componentInstance.findByType(Popup).props.role).toBe('dialog');
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders Modal with ARIA role dialog when isAlert is false', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal
        isOpen={true}
        isAlert={false}
        isBlocking={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
      >
        Test Content
      </Modal>,
      component => {
        const componentInstance = component.root;
        expect(componentInstance.findByType(Popup).props.role).toBe('dialog');
        ReactDOM.createPortal.mockClear();
      },
    );
  });

  it('renders Modal with ARIA role alertdialog when isBlocking is true', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    safeCreate(
      <Modal
        isOpen={true}
        isBlocking={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
      >
        Test Content
      </Modal>,
      component => {
        const componentInstance = component.root;
        expect(componentInstance.findByType(Popup).props.role).toBe('alertdialog');
        ReactDOM.createPortal.mockClear();
      },
    );
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
