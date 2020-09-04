import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Modal } from './Modal';
import { ContextualMenu } from '../../ContextualMenu';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

describe('Modal', () => {
  isConformant({
    Component: Modal,
    displayName: 'Modal',
    componentPath: path.join(__dirname, 'Modal.ts'),
  });
  it('renders Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal.mockClear();
  });
  it('renders Modeless Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Modal
        isOpen={true}
        isModeless={true}
        className={'test-className'}
        containerClassName={'test-containerClassName'}
      >
        Test Content
      </Modal>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal.mockClear();
  });
  it('renders Draggable Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
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
    );
    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal.mockClear();
  });
});
