import * as React from 'react';
import { Check } from './Check';
import { safeCreate } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  beforeEach(() => {
    resetIds();
  });

  // Conformance Tests:
  isConformant({
    Component: Check,
    displayName: 'Check',
  });

  // Snapshot Tests:
  it('renders Check (correctly)', () => {
    safeCreate(<Check checked={true} className={'test-className'} />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
