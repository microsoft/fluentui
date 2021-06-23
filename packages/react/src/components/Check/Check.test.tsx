import * as React from 'react';
import { Check } from './Check';
import { safeCreate } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';

const ReactDOM = require('react-dom');

describe('Check', () => {
  const createPortal = ReactDOM.createPortal;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    ReactDOM.createPortal = createPortal;
  });

  // Conformance Tests:
  isConformant({
    Component: Check,
    displayName: 'Check',
  });

  // Snapshot Tests:
  it('renders Check (correctly)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Check checked={true} className={'test-className'} />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
