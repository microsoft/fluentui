import * as React from 'react';
import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { safeCreate } from '@fluentui/test-utilities';
import { render, act } from '@testing-library/react';
import { resetIds } from '../../Utilities';
import { Popup } from '../Popup/Popup';

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

  it('defaults to enableAriaHiddenSiblings=true when isModeless is unspecified', () => {
    const { getByText } = render(
      <div>
        <div>sibling</div>
        <Modal isOpen>content</Modal>
      </div>,
    );

    const bodyChildren = Array.from(document.body.children) as HTMLElement[];

    const content = getByText('content');
    const contentParent = bodyChildren.find(el => el.contains(content));
    expect(contentParent).toBeTruthy();
    expect(contentParent!.getAttribute('aria-hidden')).toBeNull();

    for (const node of bodyChildren) {
      if (node !== contentParent) {
        expect(node.getAttribute('aria-hidden')).toBe('true');
      }
    }
  });

  it('respects enableAriaHiddenSiblings=false', () => {
    const { queryByText } = render(
      <div>
        <div>sibling</div>
        <Modal isOpen enableAriaHiddenSiblings={false}>
          content
        </Modal>
      </div>,
    );

    expect(queryByText('content')).toBeTruthy(); // verify it's open

    const bodyChildren = Array.from(document.body.children) as HTMLElement[];
    for (const node of bodyChildren) {
      expect(node.getAttribute('aria-hidden')).toBeNull();
    }
  });

  it('defaults to enableAriaHiddenSiblings=false when isModeless=true', () => {
    const { queryByText } = render(
      <div>
        <div>sibling</div>
        <Modal isOpen isModeless>
          content
        </Modal>
      </div>,
    );

    expect(queryByText('content')).toBeTruthy(); // verify it's open

    const bodyChildren = Array.from(document.body.children) as HTMLElement[];
    for (const node of bodyChildren) {
      expect(node.getAttribute('aria-hidden')).toBeNull();
    }
  });

  it('does not hide siblings when closed', () => {
    const { queryByText } = render(
      <div>
        <div>sibling</div>
        <Modal isOpen={false}>content</Modal>
      </div>,
    );

    expect(queryByText('content')).toBeFalsy(); // verify it's closed

    const bodyChildren = Array.from(document.body.children) as HTMLElement[];
    for (const node of bodyChildren) {
      expect(node.getAttribute('aria-hidden')).toBeNull();
    }
  });

  it('un-hides siblings after closing', () => {
    jest.useFakeTimers();
    const Wrapper = (props: { isOpen: boolean }) => (
      <div>
        <div>sibling</div>
        <Modal isOpen={props.isOpen}>content</Modal>
      </div>
    );

    const { queryByText, rerender } = render(<Wrapper isOpen />);
    // already tested that siblings are hidden, so we probably don't need to check it again here

    // close the modal and verify siblings get un-hidden
    rerender(<Wrapper isOpen={false} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByText('content')).toBeFalsy();

    const bodyChildren = Array.from(document.body.children) as HTMLElement[];
    for (const node of bodyChildren) {
      expect(node.getAttribute('aria-hidden')).toBeNull();
    }
  });
});
