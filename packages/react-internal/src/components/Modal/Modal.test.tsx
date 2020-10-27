import * as React from 'react';
import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { safeCreate } from '@fluentui/test-utilities';

describe('Modal', () => {
  isConformant({
    Component: Modal,
    displayName: 'Modal',
    requiredProps: { isOpen: true },
    componentPath: path.join(__dirname, 'Modal.ts'),
    //Problem: Doesn’t currently handle a ref.
    // Solution: Add a ref.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
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
});
