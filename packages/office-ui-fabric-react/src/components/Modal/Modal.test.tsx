import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Modal } from './Modal';

// Mock Layer since it otherwise shows nothing in snapshot tests
jest.mock('../../Layer', () => {
  return {
    Layer: jest.fn().mockImplementation(props => {
      return props.children;
    })
  };
});

describe('Modal', () => {
  it('renders Modal correctly', () => {
    const component = renderer.create(
      <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
        Test Content
      </Modal>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
