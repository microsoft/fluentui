import * as React from 'react';
import { Modal } from '@fluentui/react-next';

const Scenario = () => (
  <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
    Test Content
  </Modal>
);

export default Scenario;
