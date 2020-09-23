import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

const Scenario = () => (
  <Modal isOpen={true} className={'test-className'} containerClassName={'test-containerClassName'}>
    Test Content
  </Modal>
);

export default Scenario;
