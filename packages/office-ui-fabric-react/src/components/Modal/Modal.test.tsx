import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Modal } from './Modal';

describe('Modal', () => {
  it('renders Modal correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>
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
      <Modal isOpen={true} isModeless={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>
    );
    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal.mockClear();
  });
});
