import * as React from 'react';
import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { safeCreate } from '@fluentui/test-utilities';
import { resetIds } from '../../Utilities';
import { Popup } from '../Popup/Popup';

describe('Modal', () => {
  beforeEach(() => {
    resetIds();
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
});
